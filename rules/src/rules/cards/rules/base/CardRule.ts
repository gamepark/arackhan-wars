import { Material, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { FactionCard, FactionCardsCharacteristics } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { isCreature } from '../../descriptions/base/Creature'
import { Effect, EffectType, isLoseSkills } from '../../descriptions/base/Effect'
import { Ability } from '../../descriptions/base/Ability'
import { FactionCardCharacteristics } from '../../descriptions/base/FactionCardCharacteristics'
import { getTurnEffects, TurnEffectType } from '../action/TurnEffect'

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
    let cardIndex = this.index
    const turnEffects = getTurnEffects(this.game)
    const mimicry = turnEffects.find(effect => effect.type === TurnEffectType.Mimicry && effect.target === cardIndex)
    if (mimicry) cardIndex = mimicry.copied
    const factionCard = this.game.items[MaterialType.FactionCard]![cardIndex].id.front as FactionCard
    return FactionCardsCharacteristics[factionCard]
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
      )
    }
    return this.effectsCache
  }

  private get hasTokenFlipped() {
    return this.material(MaterialType.FactionToken).parent(this.index).getItem()?.rotation?.y === 1
  }

  get isActive() {
    return !this.hasTokenFlipped && !this.effects.some(effect => effect.type === EffectType.Deactivated)
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
