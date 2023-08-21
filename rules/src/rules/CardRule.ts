import {
  areAdjacentSquares,
  getDistanceBetweenSquares,
  isXYCoordinates,
  Material,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  MaterialRulesPart,
  XYCoordinates
} from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { FactionCard, FactionCardsCharacteristics } from '../material/FactionCard'
import { Creature, isCreature } from '../material/cards/Creature'
import {
  AttackerConstraint,
  DefenderConstraint,
  Effect,
  EffectType,
  GainAttributes,
  isAttackerConstraint,
  isDefenderConstraint,
  isGainAttributes,
  isLoseSkills,
  isMimic,
  Trigger,
  TriggerAction,
  TriggerCondition
} from '../material/cards/Effect'
import { Ability } from '../material/cards/Ability'
import { FactionCardCharacteristics } from '../material/cards/FactionCardCharacteristics'
import { TurnEffect } from './action/TurnEffect'
import { Memory } from './Memory'
import { getAttackConstraint } from '../material/cards/AttackLimitation'
import { isSpell, Spell } from '../material/cards/Spell'
import sumBy from 'lodash/sumBy'
import { Land } from '../material/cards/Land'
import { battlefieldCoordinates, onBattlefieldAndAstralPlane } from '../material/Board'
import { Attack } from './AttackRule'
import { Attribute, AttributeType, isMovement } from '../material/cards/Attribute'

export class CardRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {
  private effectsCache: Effect[] | undefined = undefined

  constructor(game: MaterialGame<PlayerId, MaterialType, LocationType>, public index: number) {
    super(game)
  }

  get cardMaterial(): Material {
    return this.material(MaterialType.FactionCard).index(this.index)
  }

  get item(): MaterialItem {
    return this.game.items[MaterialType.FactionCard]![this.index]
  }

  get card(): FactionCard {
    return this.item.id.front as FactionCard
  }

  get owner() {
    return this.item.location.player!
  }

  get characteristics(): FactionCardCharacteristics {
    const mimic = this.turnEffects.find(isMimic)
    return FactionCardsCharacteristics[mimic?.target ?? this.card]
  }

  get isCreature() {
    return isCreature(this.characteristics)
  }

  get isSpell() {
    return isSpell(this.characteristics)
  }

  private get loseSkills() {
    return this.battleFieldCardsRules.some(card =>
      card.characteristics.getAbilities().some(ability =>
        ability.effects.some(isLoseSkills) && ability.isApplicable(this.game, card.cardMaterial, this.cardMaterial)
      )
    )
  }

  get abilities(): Ability[] {
    const characteristics = this.characteristics
    if (isCreature(characteristics) && this.loseSkills) {
      return characteristics.getWeaknesses()
    }
    return characteristics.getAbilities()
  }

  get battleFieldCardsRules() {
    return this.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane).getIndexes()
      .map(index => getCardRule(this.game, index))
  }

  private get effects(): Effect[] {
    if (!this.effectsCache) {
      this.effectsCache = this.battleFieldCardsRules.flatMap(rule =>
        rule.abilities.filter(ability => ability.isApplicable(this.game, rule.cardMaterial, this.cardMaterial))
          .flatMap(ability => ability.effects)
          .concat(...this.turnEffects)
      )
    }
    return this.effectsCache
  }

  private get turnEffects(): Effect[] {
    return this.remind<TurnEffect[]>(Memory.TurnEffects)
      ?.filter(turnEffect => turnEffect.targets.includes(this.index))
      .map(turnEffect => turnEffect.effect) ?? []
  }

  get attributes(): Attribute[] {
    if (this.effects.some(effect => effect.type === EffectType.LoseAttributes && !effect.attributes)) {
      return []
    }
    return this.characteristics.getAttributes()
      .concat(...this.effects.filter(isGainAttributes)
        .flatMap((effect: GainAttributes) => effect.attributes)
      ).filter(attribute => !this.effects.some(effect =>
        effect.type === EffectType.LoseAttributes && effect.attributes?.includes(attribute.type))
      )
  }

  get token() {
    return this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(this.index)
  }

  get isActive() {
    return !this.isTokenFlipped && !this.effects.some(effect => effect.type === EffectType.Deactivated)
  }

  get isTokenFlipped() {
    return this.token.getItem()?.rotation?.y === 1
  }

  get hasInitiative() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Initiative)
  }

  private get isInitiativeSequence() {
    return this.remind(Memory.IsInitiativeSequence)
  }

  get canBeActivated() {
    return this.isActive && (!this.isInitiativeSequence || this.hasInitiative)
  }

  get canAttack() {
    return this.canBeActivated && this.characteristics.canAttack
  }

  get canBeAttacked() {
    return !isSpell(this.characteristics)
  }

  canAttackTarget(opponent: number) {
    return this.isInRange(opponent)
      && !this.effects.some(effect => isAttackerConstraint(effect) && this.isPreventingAttack(effect, opponent))
      && !getCardRule(this.game, opponent).effects.some(effect => isDefenderConstraint(effect) && this.isPreventingAttack(effect, opponent))
  }

  private isPreventingAttack(effect: AttackerConstraint | DefenderConstraint, opponent: number) {
    return getAttackConstraint(effect, this.game).preventAttack(this.index, opponent)
  }

  private isInRange(opponent: number) {
    const cardLocation = this.item.location
    const opponentLocation = getCardRule(this.game, opponent).item.location
    if (!isXYCoordinates(cardLocation) || !isXYCoordinates(opponentLocation)) return false
    const distance = getDistanceBetweenSquares(cardLocation, opponentLocation)
    return distance === 1 || this.attributes.some(attribute =>
      attribute.type === AttributeType.RangedAttack && distance <= attribute.distance
    )
  }

  get canPerformAction() {
    return this.characteristics.action && this.canBeActivated
  }

  getAttackValue(attackers: number[]): number {
    if (attackers.length === 0) return 0
    if (this.isInvalidAttackGroup(attackers)) {
      // We recursively try all attack groups made of all attackers but one, and keep the best value
      return Math.max(...attackers.map(excludedAttacker => this.getAttackValue(attackers.filter(attacker => attacker !== excludedAttacker))))
    }
    return sumBy(attackers, attacker => getCardRule(this.game, attacker).attack)
  }

  isInvalidAttackGroup(attackers: number[]) {
    return this.effects.some(effect =>
      isAttackerConstraint(effect) && this.isEffectInvalidAttackGroup(effect, attackers)
    ) || attackers.some(attacker =>
      getCardRule(this.game, attacker).effects.some(effect =>
        isDefenderConstraint(effect) && this.isEffectInvalidAttackGroup(effect, attackers)
      )
    )
  }

  private isEffectInvalidAttackGroup(effect: AttackerConstraint | DefenderConstraint, attackers: number[]) {
    return getAttackConstraint(effect, this.game).isInvalidAttackGroup(attackers, this.index)
  }

  get attack() {
    const baseAttack = (this.characteristics as Creature | Spell).attack ?? 0
    return Math.max(0, baseAttack + this.attackModifier)
  }

  get attackModifier() {
    return sumBy(this.effects, effect => effect.type === EffectType.Attack ? effect.modifier : 0) + this.swarmBonus
  }

  get swarmBonus() {
    if (!this.family || this.attributes.some(attribute => attribute.type === AttributeType.Swarm)) return 0
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(this.owner).getIndexes()
      .filter(index => index !== this.index && getCardRule(this.game, index).family === this.family).length
  }

  get family() {
    return (this.characteristics as Creature).family
  }

  get defense() {
    const baseDefense = (this.characteristics as Creature | Land).defense ?? 0
    return Math.max(0, baseDefense + this.defenseModifier)
  }

  get defenseModifier() {
    return sumBy(this.effects, effect => effect.type === EffectType.Defense ? effect.modifier : 0)
  }

  get hasOmnistrike() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Omnistrike)
  }

  get omnistrikeTargets() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .player(player => player !== this.owner)
      .getIndexes().filter(opponent => getCardRule(this.game, opponent).canBeAttacked && this.canAttackTarget(opponent))
  }

  get hasPerforation() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Perforation)
  }

  triggerFailAttackEffects() {
    const moves: MaterialMove[] = []
    for (const effect of this.effects) {
      if (effect.type === EffectType.Trigger && effect.condition === TriggerCondition.FailAttack) {
        if (effect.action === TriggerAction.SelfDestroy) { // We can use a delegation when
          moves.push(...this.getEffectAction(effect))
        }
      }
    }
    return moves
  }

  getEffectAction(effect: Trigger) {
    if (effect.action === TriggerAction.SelfDestroy) {
      return [
        ...this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(this.index).deleteItems(),
        this.cardMaterial.moveItem({ location: { type: LocationType.PlayerDiscard, player: this.owner } })
      ]
    }
    return []
  }

  get canFly() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Flight)
  }

  get movement() {
    return this.attributes.find(isMovement)?.distance ?? 0
  }

  get legalMovements() {
    return this.legalDestinations.map(({ x, y }) =>
      this.cardMaterial.moveItem({ location: { type: LocationType.Battlefield, x, y, player: this.owner } })
    )
  }

  get legalDestinations() {
    if (!this.canBeActivated) return []
    if (this.canFly) {
      return battlefieldCoordinates.filter(coordinates => this.canEndMovementAt(coordinates))
    } else if (this.movement > 0) {
      const paths: Path[][] = [
        [X, X, X, _, _, _, _, X],
        [_, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _],
        [X, _, _, _, _, X, X, X]
      ]
      const itemLocation = this.item.location as XYCoordinates
      paths[itemLocation.y][itemLocation.x] = Path.Blocked
      this.buildMovementPaths(paths, itemLocation)
      const legalDestinations: XYCoordinates[] = []
      for (let y = 0; y < paths.length; y++) {
        for (let x = 0; x < paths[y].length; x++) {
          if (paths[y][x] === Path.CanStop) {
            legalDestinations.push({ x, y })
          }
        }
      }
      return legalDestinations
    } else {
      return []
    }
  }

  private buildMovementPaths(paths: Path[][], { x, y }: XYCoordinates, distance: number = 1) {
    const adjacentLocations = [{ x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 }]
    for (const { x, y } of adjacentLocations) {
      if (y >= 0 && y < paths.length && x >= 0 && x < paths[y].length && paths[y][x] === Path.Unknown) {
        paths[y][x] = this.getPath({ x, y }, distance)
        if (paths[y][x] !== Path.Blocked && distance < this.movement) {
          this.buildMovementPaths(paths, { x, y }, distance + 1)
        }
      }
    }
  }

  private getPath(location: XYCoordinates, distance: number) {
    const card = this.getCardAt(location)
    if (card.length) {
      if (card.getItem()?.location.player !== this.owner) {
        return Path.Blocked
      }
      return getCardRule(this.game, card.getIndex()).canSwap(location, distance) ? Path.CanStop : Path.CanGoThrough
    }
    return this.thereIsAnotherCardAdjacentTo(location) ? Path.CanStop : Path.CanGoThrough
  }

  public thereIsAnotherCardAdjacentTo(location: XYCoordinates) {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).filter((_, index) => index !== this.index).getItems()
      .some(card => areAdjacentSquares(card.location, location))
  }

  getCardAt({ x, y }: XYCoordinates) {
    return this.material(MaterialType.FactionCard)
      .location(location => location.type === LocationType.Battlefield && location.x === x && location.y === y)
  }

  canEndMovementAt(location: XYCoordinates, distance?: number) {
    const cardAtDestination = this.getCardAt(location)
    if (!cardAtDestination.length) {
      return this.thereIsAnotherCardAdjacentTo(location)
    } else if (cardAtDestination.getIndex() === this.index || cardAtDestination.getItem()!.location.player !== this.owner) {
      return false
    } else {
      return getCardRule(this.game, cardAtDestination.getIndex()).canSwap(this.item.location as XYCoordinates, distance)
    }
  }

  canSwap(location: XYCoordinates, distance?: number): boolean {
    if (!this.canBeActivated || this.remind<Attack[]>(Memory.Attacks).some(attack => attack.card === this.index)) return false
    if (this.canFly) return true
    else if (distance) return this.movement >= distance
    else return this.legalDestinations.some(({ x, y }) => location.x === x && location.y === y)
  }

  get canRegenerate(): boolean {
    return this.attributes.some(attribute => attribute.type === AttributeType.Regeneration) && this.isActive
  }
}

let cardsRulesCache: { game: MaterialGame<PlayerId, MaterialType, LocationType>, rules: Record<number, CardRule> } | undefined

export function getCardRule(game: MaterialGame<PlayerId, MaterialType, LocationType>, cardIndex: number) {
  if (cardsRulesCache?.game !== game) {
    cardsRulesCache = { game, rules: {} }
  }
  if (!cardsRulesCache.rules[cardIndex]) {
    cardsRulesCache.rules[cardIndex] = new CardRule(game, cardIndex)
  }
  return cardsRulesCache.rules[cardIndex]
}

export function resetCardsRulesCache() {
  cardsRulesCache = undefined
}

enum Path {
  Unknown, Blocked, CanStop, CanGoThrough
}

const X = Path.Blocked
const _ = Path.Unknown
