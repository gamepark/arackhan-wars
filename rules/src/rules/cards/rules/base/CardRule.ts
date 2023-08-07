import { Location, Material, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { FactionCard, FactionCardsCharacteristics } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { Creature, isCreature } from '../../descriptions/base/Creature'
import { CannotAttack, CannotBeAttacked, Effect, EffectType, GainAttributes, isGainAttributes, isLoseSkills, isMimic } from '../../descriptions/base/Effect'
import { Ability } from '../../descriptions/base/Ability'
import { CardAttribute, CardAttributeType, FactionCardCharacteristics } from '../../descriptions/base/FactionCardCharacteristics'
import { TurnEffect } from '../action/TurnEffect'
import { Memory } from '../../../Memory'
import { isFlipped } from '../../../../utils/activation.utils'
import { areAdjacentCards } from '../../../../utils/adjacent.utils'
import { AttackLimitationRule, AttackLimitationRules } from '../../descriptions/base/AttackLimitation'
import { isSpell, Spell } from '../../descriptions/base/Spell'
import sumBy from 'lodash/sumBy'
import { Land } from '../../descriptions/base/Land'

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

  get characteristics(): FactionCardCharacteristics {
    const mimic = this.turnEffects.find(isMimic)
    return FactionCardsCharacteristics[mimic?.target ?? this.card]
  }

  get isCreature() {
    return isCreature(this.characteristics)
  }

  private get loseSkills() {
    return this.battleFieldCardsRules.some(card =>
      card.characteristics.getAbilities().some(ability =>
        ability.getEffects().some(isLoseSkills) && ability.isApplicable(this.game, card.cardMaterial, this.cardMaterial)
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
      this.effectsCache = this.battleFieldCardsRules.flatMap(rule => rule.abilities
        .filter(ability => ability.isApplicable(this.game, rule.cardMaterial, this.cardMaterial))
        .flatMap(ability => ability.getEffects())
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

  get attributes(): CardAttribute[] {
    if (this.effects.some(effect => effect.type === EffectType.LoseAttributes && !effect.attributes)) {
      return []
    }
    return this.characteristics.getAttributes()
      .map(attribute => attribute.cardAttribute) // TODO: simplify characteristics to remove this line
      .concat(...this.effects.filter(isGainAttributes)
        .flatMap((effect: GainAttributes) =>
          effect.attributes.map(type => ({ type })) // TODO: fix GainAttributes.attributes
        )
      ).filter(attribute => !this.effects.some(effect =>
        effect.type === EffectType.LoseAttributes && effect.attributes?.some(type => attribute.type === type)) // TODO: fix LoseAttributes.attributes
      )
  }

  get token() {
    return this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(this.index)
  }

  get isActive() {
    return !isFlipped(this.token) && !this.effects.some(effect => effect.type === EffectType.Deactivated)
  }

  get hasInitiative() {
    return this.attributes.some(attribute => attribute.type === CardAttributeType.Initiative)
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
      && !this.effects.some(effect => effect.type === EffectType.CannotAttack && this.isPreventingAttack(effect, opponent))
      && !getCardRule(this.game, opponent).effects.some(effect => effect.type === EffectType.CannotBeAttacked && this.isPreventingAttack(effect, opponent))
  }

  private isPreventingAttack(effect: CannotAttack | CannotBeAttacked, opponent: number) {
    return !effect.except || new AttackLimitationRules[effect.except](this.game).preventAttack(this.index, opponent)
  }

  private isInRange(opponent: number) {
    const opponentRule = getCardRule(this.game, opponent)
    return areAdjacentCards(this.cardMaterial, opponentRule.cardMaterial)
      || this.attributes.some(attribute =>
        attribute.type === CardAttributeType.RangedAttack && getDistance(this.item.location, opponentRule.item.location) <= attribute.strength! // TODO: attribute.distance
      )
  }

  get canMove() {
    return this.canBeActivated && this.attributes.some(attribute => attribute.type === CardAttributeType.Movement || attribute.type === CardAttributeType.Flight)
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
      effect.type === EffectType.CannotBeAttacked && this.isEffectInvalidAttackGroup(effect, attackers)
    ) || attackers.some(attacker =>
      getCardRule(this.game, attacker).effects.some(effect =>
        effect.type === EffectType.CannotAttack && this.isEffectInvalidAttackGroup(effect, attackers)
      )
    )
  }

  private isEffectInvalidAttackGroup(effect: CannotAttack | CannotBeAttacked, attackers: number[]) {
    return !effect.except || new AttackLimitationRule[effect.except](this.game).isInvalidAttackGroup(attackers, this.index)
  }

  get attack() {
    const baseAttack = (this.characteristics as Creature | Spell).attack ?? 0
    const effectsModifier = sumBy(this.effects, effect => effect.type === EffectType.AddAttack ? effect.value : 0)
    return Math.max(0, baseAttack + effectsModifier)
  }

  get defense() {
    const baseDefense = (this.characteristics as Creature | Land).defense ?? 0
    const effectsModifier = sumBy(this.effects, effect => effect.type === EffectType.AddDefense ? effect.value : 0)
    return Math.max(0, baseDefense + effectsModifier)
  }

  get hasPerforation() {
    return this.attributes.some(attribute => attribute.type === CardAttributeType.Perforation)
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

function getDistance(location1: Location, location2: Location) {
  if (location1.type !== LocationType.Battlefield || location2.type !== LocationType.Battlefield) {
    return 0 // Consider Astral plan as distance 0 from everything on the battlefield
  }
  return Math.abs(location1.x! - location2.x!) + Math.abs(location1.y! - location2.y!)
}
