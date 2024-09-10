import { isMoveItemType, isSelectItemType, ItemMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { CardId } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class NemesioGreyOrderActionRule extends CardActionRule {
  canPlay(): boolean {
    return this.cardsToSacrifice.length > 0 && this.otherCreatures.length > 1
  }

  get cardsToSacrifice() {
    const nemesio = this.cardIndex
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(this.player)
      .index(index => {
        const cardRule = getCardRule(this.game, index)
        return index !== nemesio && cardRule.isCreature && cardRule.value >= 3
      })
  }

  get otherCreatures() {
    const nemesio = this.cardIndex
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .index(index => index !== nemesio && getCardRule(this.game, index).isCreature)
  }

  getPlayerMoves() {
    if (this.remind(Memory.TargetCard) === undefined) {
      return this.cardsToSacrifice.moveItems((_, index) => ({ type: LocationType.PlayerDiscard, player: getCardRule(this.game, index).originalOwner }))
    } else {
      return this.otherCreatures.selectItems()
    }
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.PlayerDiscard) {
      return getCardRule(this.game, move.itemIndex).removeMaterialFromCard()
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    const nemesio = this.cardIndex
    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      this.memorize(Memory.TargetCard, move.itemIndex)
    } else if (isSelectItemType(MaterialType.FactionCard)(move)) {
      this.forget(Memory.TargetCard)
      const card = this.material(MaterialType.FactionCard).getItem<CardId>(move.itemIndex)!
      delete card.selected
      const target = card.id!.front
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [...effects,
        { targets: [nemesio], effect: { type: EffectType.Mimic, target } }
      ])
      return [this.startRule(RuleId.ActivationRule)]
    }
    return []
  }
}
