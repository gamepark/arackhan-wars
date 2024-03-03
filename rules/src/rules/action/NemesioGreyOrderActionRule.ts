import { isMoveItemType, isSelectItemType, ItemMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { FactionCard } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class NemesioGreyOrderActionRule extends CardActionRule {
  getPlayerMoves() {
    const nemesio = this.remind(Memory.ActionCard)
    if (!this.remind<number[]>(Memory.OncePerRound).includes(nemesio)) {
      return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(this.player)
        .filter((_, index) => {
          const cardRule = getCardRule(this.game, index)
          return index !== nemesio && cardRule.isCreature && cardRule.value >= 3
        })
        .moveItems((_, index) => ({ type: LocationType.PlayerDiscard, player: getCardRule(this.game, index).originalOwner }))
    } else {
      return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
        .filter((_, index) => index !== nemesio && getCardRule(this.game, index).isCreature)
        .selectItems()
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
      this.memorize<number[]>(Memory.OncePerRound, cards => [...cards, nemesio])
    } else if (isSelectItemType(MaterialType.FactionCard)(move)) {
      const target = this.material(MaterialType.FactionCard).getItem(move.itemIndex)?.id.front as FactionCard
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [...effects,
        { targets: [nemesio], effect: { type: EffectType.Mimic, target } }
      ])
      return [this.rules().startRule(RuleId.ActivationRule)]
    }
    return []
  }
}
