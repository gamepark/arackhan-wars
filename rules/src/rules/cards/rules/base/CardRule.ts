import { Material, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { FactionCard, FactionCardsCharacteristics } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { isCreature } from '../../descriptions/base/Creature'
import { Effect, EffectType, GainAttributes, isGainAttributes, isLoseSkills, isMimic } from '../../descriptions/base/Effect'
import { Ability } from '../../descriptions/base/Ability'
import { CardAttribute, CardAttributeType, FactionCardCharacteristics } from '../../descriptions/base/FactionCardCharacteristics'
import { TurnEffect } from '../action/TurnEffect'
import { Memory } from '../../../Memory'
import { isFlipped } from '../../../../utils/activation.utils'
import { RuleId } from '../../../RuleId'

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

  get canBeActivated() {
    return this.isActive && (this.game.rule?.id !== RuleId.InitiativeActivationRule || this.hasInitiative)
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