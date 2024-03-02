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
import max from 'lodash/max'
import sumBy from 'lodash/sumBy'
import uniqBy from 'lodash/uniqBy'
import { ArackhanWarsRules } from '../ArackhanWarsRules'
import { battlefieldCoordinates, onBattlefieldAndAstralPlane } from '../material/Board'
import { Ability } from '../material/cards/Ability'
import { getAttackConstraint } from '../material/cards/AttackLimitation'
import { Attribute, AttributeType, isMovement, isRangedAttack } from '../material/cards/Attribute'
import { Creature, isCreature } from '../material/cards/Creature'
import {
  AttackerConstraint,
  DefenderConstraint,
  Effect,
  EffectType,
  EndOfTurn,
  EndOfTurnAction,
  ExtraScoreType,
  GainAttributes,
  isAttackerConstraint,
  isDefenderConstraint,
  isGainAttributes,
  isIgnoreFellowGroupAttackerConstraint,
  isLoseSkills,
  isMimic,
  isSetAttackDefense,
  isSwapSkills,
  ModifyAttackCondition,
  ModifyDefenseCondition,
  ModifyMovementCondition,
  Trigger,
  TriggerAction,
  TriggerCondition
} from '../material/cards/Effect'
import { FactionCardCharacteristics } from '../material/cards/FactionCardCharacteristics'
import { Land } from '../material/cards/Land'
import { isSpell, Spell } from '../material/cards/Spell'
import { CardId, FactionCard, FactionCardsCharacteristics } from '../material/FactionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { TargetingEffect } from './action/TargetingEffect'
import { Attack } from './AttackRule'
import { Memory } from './Memory'

export class CardRule extends MaterialRulesPart {
  private effectsCache: Effect[] | undefined = undefined
  private immuneToEnemySpellsCache: boolean | undefined = undefined
  private loseSkillsCache: boolean | undefined = undefined

  constructor(game: MaterialGame, public index: number) {
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

  get characteristics(): FactionCardCharacteristics | undefined {
    const mimic = this.targetingEffects.find(isMimic)
    return FactionCardsCharacteristics[mimic?.target ?? this.card]
  }

  get value(): number {
    return this.characteristics?.value ?? 0
  }

  get score(): number {
    return this.isSpell ? 0 : this.value + sumBy(FactionCardsCharacteristics[this.card].getAbilities(), ability =>
      sumBy(ability.effects, effect => {
        if (effect.type === EffectType.ExtraScore) {
          switch (effect.score) {
            case ExtraScoreType.ValueOfCardsUnder:
              return sumBy(this.material(MaterialType.FactionCard).location(LocationType.UnderCard).parent(this.index).getIndexes(), index =>
                getCardRule(this.game, index).value
              )
            case ExtraScoreType.MastersOfAracKhan:
              const creatures = this.material(MaterialType.FactionCard).id<CardId>(id => id.front && isCreature(FactionCardsCharacteristics[id.front]))
              const adjacentAlliedCreatures = creatures.player(this.owner).location(l => areAdjacentSquares(this.item.location, l))
              const scoredEnemies = creatures.player(p => p !== this.owner).location(l => areAdjacentSquares(this.item.location, l)
                || adjacentAlliedCreatures.location(allyLocation => areAdjacentSquares(l, allyLocation)).length > 0)
              return sumBy(scoredEnemies.getItems(), item => FactionCardsCharacteristics[item.id.front].value)
          }
        }
        return 0
      })
    )
  }

  get isCreature() {
    return isCreature(this.characteristics)
  }

  get isSpell() {
    return isSpell(this.characteristics)
  }

  private get loseSkills() {
    if (this.loseSkillsCache === undefined) {
      this.loseSkillsCache = this.battleFieldCardsRules.some(card =>
          !this.isImmuneTo(card) && card.characteristics?.getAbilities().some(ability =>
            ability.effects.some(isLoseSkills) && ability.isApplicable(this.game, card.cardMaterial, this.cardMaterial)
          )
      )
    }
    return this.loseSkillsCache
  }

  get abilities(): Ability[] {
    const characteristics = this.characteristics
    const swapSkills = this.targetingEffects.find(isSwapSkills)
    if (isCreature(characteristics)) {
      if (this.loseSkills) {
        return characteristics.getWeaknesses()
      } else if (swapSkills) {
        const otherCreatureIndex = swapSkills.creatures.find(index => index !== this.index)!
        const otherCreature = FactionCardsCharacteristics[this.material(MaterialType.FactionCard).getItem<CardId>(otherCreatureIndex)!.id!.front]
        return (otherCreature as Creature).getSkills().concat(characteristics.getWeaknesses())
      }
    }
    return characteristics?.getAbilities() ?? []
  }

  isImmuneTo(rule: CardRule) {
    return this.isImmuneToEnemySpells && rule.isSpell && rule.item.location.player !== this.item.location.player
  }

  get isImmuneToEnemySpells() {
    if (this.immuneToEnemySpellsCache === undefined) {
      this.immuneToEnemySpellsCache = this.battleFieldCardsRules.some(rule =>
        rule.characteristics?.getAbilities().some(ability =>
          ability.effects.some(effect => effect.type === EffectType.ImmuneToEnemySpells)
          && ability.isApplicable(this.game, rule.cardMaterial, this.cardMaterial)
        )
      ) || this.targetingEffects.some(effect => effect.type === EffectType.ImmuneToEnemySpells)
    }
    return this.immuneToEnemySpellsCache
  }

  get battleFieldCardsRules() {
    return this.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane).getIndexes()
      .map(index => getCardRule(this.game, index))
  }

  get effects(): Effect[] {
    if (!this.effectsCache) {
      this.effectsCache = this.battleFieldCardsRules.flatMap(card =>
        this.isImmuneTo(card) ? []
          : card.abilities.filter(ability => ability.isApplicable(this.game, card.cardMaterial, this.cardMaterial))
            .flatMap(ability => {
              const effects: Effect[] = []
              const multiplier = ability.getMultiplierFor(this.cardMaterial, this.game)
              for (let i = 0; i < multiplier; i++) {
                effects.push(...ability.effects)
              }
              return effects
            })
      ).concat(...this.targetingEffects)
      if (this.effectsCache.some(effect => effect.type === EffectType.IgnoreAttackDefenseModifiers)) {
        this.effectsCache = this.effectsCache.filter(effect => effect.type !== EffectType.Attack && effect.type !== EffectType.Defense)
      }
    }
    return this.effectsCache
  }

  private getAttributeEffects(): Effect[] {
    return this.battleFieldCardsRules.flatMap(card =>
      this.isImmuneTo(card) ? []
        : card.abilities.filter(ability =>
          ability.effects.some(effect => effect.type === EffectType.LoseAttributes || effect.type === EffectType.GainAttributes)
          && ability.isApplicable(this.game, card.cardMaterial, this.cardMaterial)
        ).flatMap(ability => ability.effects)
    ).concat(...this.targetingEffects)
  }

  get targetingEffects(): Effect[] {
    const turnEffects = this.remind<TargetingEffect[]>(Memory.TurnEffects) ?? []
    const roundEffects = this.remind<TargetingEffect[]>(Memory.RoundEffects) ?? []
    return turnEffects.concat(roundEffects)
      .filter(targetingEffect => targetingEffect.targets.includes(this.index))
      .map(targetingEffect => targetingEffect.effect)
  }

  get attributes(): Attribute[] {
    const effects = this.getAttributeEffects()
    if (effects.some(effect => effect.type === EffectType.LoseAttributes && !effect.attributes)) {
      return []
    }
    const attributes = this.characteristics?.getAttributes() ?? []
    return uniqBy(attributes
      .concat(...effects.filter(isGainAttributes)
        .flatMap((effect: GainAttributes) => effect.attributes)
      ).filter(attribute => !effects.some(effect =>
        effect.type === EffectType.LoseAttributes && effect.attributes?.includes(attribute.type))
      ), attribute => attribute.type)
  }

  get token() {
    return this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(this.index)
  }

  get isActive() {
    return this.isSpell ||
      (this.hasActiveToken && !this.effects.some(effect => effect.type === EffectType.Deactivated))
  }

  get hasActiveToken() {
    const token = this.token.getItem()
    return token !== undefined && !token.location.rotation
  }

  get hasFlippedToken() {
    const token = this.token.getItem()
    return token !== undefined && token.location.rotation
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
    return this.canBeActivated && this.characteristics?.canAttack
  }

  get canBeAttacked() {
    return !isSpell(this.characteristics)
  }

  canAttackTarget(opponent: number) {
    return this.isInRange(opponent) && !this.someEffectPreventsAttacking(opponent)
  }

  someEffectPreventsAttacking(opponent: number) {
    const formerAttackers = this.remind<Attack[]>(Memory.Attacks).filter(attack => attack.targets.includes(opponent))
      .map(attack => attack.card)
    const ignoreFellowConstraints = formerAttackers.flatMap(attacker => getCardRule(this.game, attacker).effects.filter(isIgnoreFellowGroupAttackerConstraint))
    ignoreFellowConstraints.push(...this.effects.filter(isIgnoreFellowGroupAttackerConstraint))
    return this.effects.some(effect =>
          isAttackerConstraint(effect)
          && !ignoreFellowConstraints.some(effect => effect.filters.every(filter =>
            filter.filter(this.cardMaterial, this.cardMaterial, this.game)
          ))
          && this.isPreventingAttack(effect, opponent)
      )
      || getCardRule(this.game, opponent).effects.some(effect =>
        (effect.type === EffectType.ImmuneToEnemySpells && this.isSpell)
        || (isDefenderConstraint(effect) && this.isPreventingAttack(effect, opponent))
      )
      || formerAttackers.some(attacker =>
        getCardRule(this.game, attacker).effects.some(effect =>
            isAttackerConstraint(effect)
            && !ignoreFellowConstraints.some(effect => effect.filters.every(filter =>
              filter.filter(this.cardMaterial, this.material(MaterialType.FactionCard).index(attacker), this.game)
            ))
            && getAttackConstraint(effect, this.game).preventAttackerToJoinGroup(this.index)
        )
      )
  }

  private isPreventingAttack(effect: AttackerConstraint | DefenderConstraint, opponent: number) {
    return getAttackConstraint(effect, this.game).preventAttack(this.index, opponent)
  }

  private isInRange(opponent: number) {
    const cardLocation = this.item.location
    const opponentRule = getCardRule(this.game, opponent)
    const opponentLocation = opponentRule.item.location
    if (!isXYCoordinates(cardLocation) || !isXYCoordinates(opponentLocation)) return false
    let distance = getDistanceBetweenSquares(cardLocation, opponentLocation)
    if (distance === 1 && opponentRule.hasStealth && this.isCreature) distance++
    return distance <= this.range
  }

  get range() {
    const rangedAttack = this.attributes.find(isRangedAttack)
    if (!rangedAttack) return 1
    const modifier = sumBy(this.effects, effect => effect.type === EffectType.ModifyRange ? effect.modifier : 0)
    return rangedAttack.distance + modifier
  }

  get hasStealth() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Stealth)
  }

  get canPerformAction() {
    return this.characteristics?.action && this.canBeActivated
  }

  getDamagesInflicted(attackers: number[]): number | undefined {
    if (attackers.length === 0) return undefined
    if (this.isInvalidAttackersGroup(attackers)) {
      // We recursively try all attack groups made of all attackers but one, and keep the best value
      return max(attackers.map(excludedAttacker => this.getDamagesInflicted(attackers.filter(attacker => attacker !== excludedAttacker))))
    }
    return sumBy(attackers, attacker => getCardRule(this.game, attacker).getAttack(this.index))
  }

  isInvalidAttackersGroup(attackers: number[]) {
    return this.effects.some(effect =>
      isDefenderConstraint(effect) && this.isEffectInvalidAttackGroup(effect, attackers)
    ) || attackers.some(attacker =>
      getCardRule(this.game, attacker).effects.some(effect =>
        isAttackerConstraint(effect) && this.isEffectInvalidAttackGroup(effect, attackers)
      )
    )
  }

  private isEffectInvalidAttackGroup(effect: AttackerConstraint | DefenderConstraint, attackers: number[]) {
    return getAttackConstraint(effect, this.game).isInvalidAttackGroup(attackers, this.index)
  }

  get attackCharacteristic() {
    return (this.characteristics as Creature | Spell)?.attack ?? 0
  }

  get attack() {
    return this.effects.some(effect => effect.type === EffectType.InvertsAttackDefense) ? this.getDefenseBeforeInvert() : this.getAttackBeforeInvert()
  }

  getAttack(target: number) {
    return this.effects.some(effect => effect.type === EffectType.InvertsAttackDefense) ?
      this.getDefenseBeforeInvert() : this.getAttackBeforeInvert(getCardRule(this.game, target))
  }

  private getAttackBeforeInvert(target?: CardRule) {
    const setAttackDefense = this.effects.find(isSetAttackDefense)
    const baseAttack = setAttackDefense?.attack ?? this.attackCharacteristic
    const attackModifier = sumBy(this.effects, effect =>
      effect.type === EffectType.Attack
      && (effect.condition !== ModifyAttackCondition.TargetFlyOrMoves
        || target?.attributes.some(attribute => attribute.type === AttributeType.Flight || attribute.type === AttributeType.Movement)
      ) ? effect.modifier : 0
    ) + this.swarmBonus
    return Math.max(0, baseAttack + attackModifier)
  }

  get swarmBonus() {
    if (!this.family || !this.attributes.some(attribute => attribute.type === AttributeType.Swarm)) return 0
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes()
      .filter(index => index !== this.index && getCardRule(this.game, index).family === this.family).length
  }

  get family() {
    return (this.characteristics as Creature)?.family
  }

  get defenseCharacteristic() {
    return (this.characteristics as Creature | Land)?.defense ?? 0
  }

  get defense() {
    return this.effects.some(effect => effect.type === EffectType.InvertsAttackDefense) ? this.getAttackBeforeInvert() : this.getDefenseBeforeInvert()
  }

  getDefense(attackers: number[]) {
    return this.effects.some(effect => effect.type === EffectType.InvertsAttackDefense) ?
      this.getAttackBeforeInvert() : this.getDefenseBeforeInvert(attackers)
  }

  private getDefenseBeforeInvert(attackers: number[] = []) {
    const setAttackDefense = this.effects.find(isSetAttackDefense)
    const baseDefense = setAttackDefense?.defense ?? this.defenseCharacteristic
    const defenseModifier = sumBy(this.effects, effect =>
      effect.type === EffectType.Defense
      && (effect.condition !== ModifyDefenseCondition.AttackedByFlyOrMoves
        || attackers.some(attacker => getCardRule(this.game, attacker).attributes.some(attribute =>
          attribute.type === AttributeType.Flight || attribute.type === AttributeType.Movement
        ))
      )
        ? effect.modifier : 0)
    return Math.max(0, baseDefense + defenseModifier)
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

  triggerAttackEffects() {
    const moves: MaterialMove[] = []
    for (const effect of this.effects) {
      if (effect.type === EffectType.Trigger && effect.condition === TriggerCondition.Attack) {
        moves.push(...this.getEffectAction(effect))
      }
    }
    return moves
  }

  triggerFailAttackEffects() {
    const moves: MaterialMove[] = []
    for (const effect of this.effects) {
      if (effect.type === EffectType.Trigger && effect.condition === TriggerCondition.FailAttack) {
        moves.push(...this.getEffectAction(effect))
      }
    }
    return moves
  }

  getEffectAction(effect: Trigger) {
    if (effect.action === TriggerAction.Destroy) {
      return [
        ...this.removeMaterialFromCard(),
        this.cardMaterial.moveItem({ type: LocationType.PlayerDiscard, player: this.owner })
      ]
    }
    return []
  }

  get canFly() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Flight)
  }

  get movement() {
    const movement = this.attributes.find(isMovement)
    if (!movement) return 0
    return movement.distance + sumBy(this.effects, effect => effect.type === EffectType.ModifyMovement ? effect.modifier : 0)
  }

  get legalMovements() {
    return this.legalDestinations.map(({ x, y }) =>
      this.cardMaterial.moveItem({ type: LocationType.Battlefield, x, y, player: this.owner })
    )
  }

  get legalDestinations() {
    if (!this.canBeActivated) return []
    if (this.canFly) {
      return battlefieldCoordinates.filter(coordinates => this.canMoveOrSwapPosition(coordinates))
    } else if (this.movement > 0) {
      const paths = this.buildMovementPaths()
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

  private buildMovementPaths(movement = this.movement) {
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
    let previousLocations = [this.item.location as XYCoordinates]
    for (let distance = 1; distance <= movement; distance++) {
      const currentLocations: XYCoordinates[] = []
      for (const { x, y } of previousLocations) {
        const adjacentLocations = [{ x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 }]
        for (const { x, y } of adjacentLocations) {
          if (y >= 0 && y < paths.length && x >= 0 && x < paths[y].length && paths[y][x] === Path.Unknown) {
            paths[y][x] = this.getPath({ x, y }, distance)
            if (paths[y][x] !== Path.Blocked && !this.locationCancelsMovement(x, y)) {
              currentLocations.push({ x, y })
            }
          }
        }
      }
      previousLocations = currentLocations
    }
    return paths
  }

  private getPath(location: XYCoordinates, distance: number) {
    const card = this.getCardAt(location)
    if (card.length) {
      if (card.getItem()?.location.player !== this.owner) {
        return Path.Blocked
      }
      if (distance > 1 && !this.thereIsAnotherCardAdjacentTo(this.item.location as XYCoordinates)) return Path.CanGoThrough
      return getCardRule(this.game, card.getIndex()).canSwap(location, distance) ? Path.CanStop : Path.CanGoThrough
    }
    return this.isValidSpotToEndMovement(location, distance) ? Path.CanStop : Path.CanGoThrough
  }

  private getCardAt({ x, y }: XYCoordinates) {
    return this.material(MaterialType.FactionCard)
      .location(location => location.type === LocationType.Battlefield && location.x === x && location.y === y)
  }

  private isValidSpotToEndMovement(location: XYCoordinates, distance?: number) {
    return this.thereIsAnotherCardAdjacentTo(location)
      && (distance === undefined || this.canMoveAtDistance(location, distance))
  }

  private canMoveAtDistance(location: XYCoordinates, distance: number) {
    let movement = this.attributes.find(isMovement)?.distance ?? 0
    for (const effect of this.effects) {
      if (effect.type === EffectType.ModifyMovement) {
        if (effect.conditions.includes(ModifyMovementCondition.EndMovementAdjacentToEnemyCard)) {
          const enemyAdjacentCard = this.getOtherCardsAdjacentTo(location).player(player => player !== this.owner)
          if (enemyAdjacentCard.length === 0) continue
        }
        movement += effect.modifier
      }
    }
    return movement >= distance
  }

  public thereIsAnotherCardAdjacentTo(location: XYCoordinates) {
    return this.getOtherCardsAdjacentTo(location).length > 0
  }

  public getOtherCardsAdjacentTo(location: XYCoordinates) {
    return this.material(MaterialType.FactionCard).filter((item, index) =>
      index !== this.index
      && item.location.type === LocationType.Battlefield
      && areAdjacentSquares(item.location, location)
    )
  }

  private locationCancelsMovement(x: number, y: number) {
    const gameCopy: MaterialGame = JSON.parse(JSON.stringify(this.game))
    const cardCopy = new ArackhanWarsRules(gameCopy).material(MaterialType.FactionCard).index(this.index)
    cardCopy.getItem()!.location.x = x
    cardCopy.getItem()!.location.y = y
    const effects = this.battleFieldCardsRules.flatMap(card =>
      card.abilities.filter(ability => ability.isApplicable(gameCopy, card.cardMaterial, cardCopy))
        .flatMap(ability => ability.effects)
        .concat(...this.targetingEffects)
    )
    return effects.some(effect =>
      effect.type === EffectType.Deactivated
      || (effect.type === EffectType.LoseAttributes && (!effect.attributes || effect.attributes.includes(AttributeType.Movement)))
    )
  }

  private canMoveOrSwapPosition(location: XYCoordinates, distance?: number) {
    const cardAtDestination = this.getCardAt(location)
    if (!cardAtDestination.length) return this.isValidSpotToEndMovement(location)
    if (cardAtDestination.getIndex() === this.index || cardAtDestination.getItem()!.location.player !== this.owner) {
      return false
    }
    return getCardRule(this.game, cardAtDestination.getIndex()).canSwap(this.item.location as XYCoordinates, distance)
  }

  private canSwap(location: XYCoordinates, distance?: number): boolean {
    if (!this.canBeActivated || this.remind<Attack[]>(Memory.Attacks).some(attack => attack.card === this.index)) return false
    if (this.canFly) return getDistanceBetweenSquares(location, this.item.location as XYCoordinates) === 1 || this.isValidSpotToEndMovement(location)
    else if (distance) {
      return this.canMoveAtDistance(location, distance) && (distance === 1 || this.thereIsAnotherCardAdjacentTo(location))
    } else return this.legalDestinations.some(({ x, y }) => location.x === x && location.y === y)
  }

  get canRegenerate(): boolean {
    return this.attributes.some(attribute => attribute.type === AttributeType.Regeneration) && this.isActive
  }

  get endOfTurnMoves(): MaterialMove[] {
    return this.effects.flatMap(effect =>
      effect.type === EffectType.EndOfTurn ? this.getEndOfTurnEffectMoves(effect) : []
    )
  }

  getEndOfTurnEffectMoves(effect: EndOfTurn): MaterialMove[] {
    if (effect.action === EndOfTurnAction.Move) {
      if (this.remind<number[]>(Memory.MovedCards).includes(this.index)) return []
      return battlefieldCoordinates.filter(coordinates =>
        this.getCardAt(coordinates).length === 0 && this.isValidSpotToEndMovement(coordinates)
      ).map(coordinates =>
        this.cardMaterial.moveItem({ type: LocationType.Battlefield, ...coordinates, player: this.owner })
      )
    }
    return []
  }

  canAttackAfterMovement({ x, y }: XYCoordinates): boolean {
    const movementWithoutAttack = sumBy(this.effects, effect =>
      effect.type === EffectType.ModifyMovement && effect.conditions.includes(ModifyMovementCondition.DoNotAttack) ? effect.modifier : 0
    )
    if (movementWithoutAttack > 0) {
      const paths = this.buildMovementPaths(this.movement - movementWithoutAttack)
      return paths[y][x] === Path.CanStop
    }
    return true
  }

  removeMaterialFromCard(): MaterialMove[] {
    return [
      ...this.material(MaterialType.FactionToken).parent(this.index).deleteItems(),
      ...this.material(MaterialType.FactionCard).parent(this.index).moveItems(item => ({ type: LocationType.PlayerDiscard, player: item.location.player }))
    ]
  }
}

let cardsRulesCache: {
  game: MaterialGame,
  rules: Record<number, CardRule>
} | undefined

export function getCardRule(game: MaterialGame, cardIndex: number) {
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
