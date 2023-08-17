import { Location, Material, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { FactionCard, FactionCardsCharacteristics } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { Creature, isCreature } from '../../descriptions/base/Creature'
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
} from '../../descriptions/base/Effect'
import { Ability } from '../../descriptions/base/Ability'
import { FactionCardCharacteristics } from '../../descriptions/base/FactionCardCharacteristics'
import { TurnEffect } from '../action/TurnEffect'
import { Memory } from '../../../Memory'
import { isFlipped } from '../../../../utils/activation.utils'
import { areAdjacent, areAdjacentCards } from '../../../../utils/adjacent.utils'
import { getAttackConstraint } from '../../descriptions/base/AttackLimitation'
import { isSpell, Spell } from '../../descriptions/base/Spell'
import sumBy from 'lodash/sumBy'
import { Land } from '../../descriptions/base/Land'
import { battlefieldSpaceCoordinates } from '../../../../material/spaces'
import { Attack } from './AttackRule'
import { Attribute, AttributeType, isMovement } from '../../descriptions/base/Attribute'

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
    return !isFlipped(this.token) && !this.effects.some(effect => effect.type === EffectType.Deactivated)
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
    return this.canBeActivated && this.characteristics.canAttack() // TODO canAttack can be a getter
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
    const opponentRule = getCardRule(this.game, opponent)
    return areAdjacentCards(this.cardMaterial, opponentRule.cardMaterial)
      || this.attributes.some(attribute =>
        attribute.type === AttributeType.RangedAttack && getDistance(this.item.location, opponentRule.item.location) <= attribute.distance
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
    const effectsModifier = sumBy(this.effects, effect => effect.type === EffectType.Attack ? effect.modifier : 0)
    return Math.max(0, baseAttack + effectsModifier)
  }

  get defense() {
    const baseDefense = (this.characteristics as Creature | Land).defense ?? 0
    const effectsModifier = sumBy(this.effects, effect => effect.type === EffectType.Defense ? effect.modifier : 0)
    return Math.max(0, baseDefense + effectsModifier)
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
      return battlefieldSpaceCoordinates.filter(coordinates => this.canEndMovementAt(coordinates))
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
      paths[itemLocation.x][itemLocation.y] = Path.Blocked
      this.buildMovementPaths(paths, itemLocation)
      const legalDestinations: XYCoordinates[] = []
      for (let x = 0; x < paths.length; x++) {
        for (let y = 0; y < paths[x].length; y++) {
          if (paths[x][y] === Path.CanStop) {
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
      if (x >= 0 && x < paths.length && y >= 0 && y < paths[x].length && paths[x][y] === Path.Unknown) {
        paths[x][y] = this.getPath({ x, y }, distance)
        if (paths[x][y] !== Path.Blocked && distance < this.movement) {
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

  private thereIsAnotherCardAdjacentTo(location: XYCoordinates) {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).filter((_, index) => index !== this.index).getItems()
      .some(card => areAdjacent(card.location as XYCoordinates, location))
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

function getDistance(location1: Location, location2: Location) {
  if (location1.type !== LocationType.Battlefield || location2.type !== LocationType.Battlefield) {
    return 0 // Consider Astral plan as distance 0 from everything on the battlefield
  }
  return Math.abs(location1.x! - location2.x!) + Math.abs(location1.y! - location2.y!)
}

enum Path {
  Unknown, Blocked, CanStop, CanGoThrough
}

const X = Path.Blocked
const _ = Path.Unknown
