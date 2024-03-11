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

export class EssenceAbsorptionActionRule extends CardActionRule {
  canPlay(): boolean {
    return this.alliedCreatures.length >= 2
  }

  get alliedCreatures() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(this.player)
      .filter((_, index) => getCardRule(this.game, index).isCreature)
  }

  getPlayerMoves() {
    if (this.remind(Memory.TargetCard) === undefined) {
      return this.alliedCreatures.moveItems((_, index) => ({ type: LocationType.PlayerDiscard, player: getCardRule(this.game, index).originalOwner }))
    } else {
      return this.alliedCreatures.selectItems()
    }
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.PlayerDiscard) {
      this.memorize(Memory.TargetCard, this.material(MaterialType.FactionCard).getItem<CardId>(move.itemIndex)!.id!.front)
      return getCardRule(this.game, move.itemIndex).removeMaterialFromCard()
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.FactionCard)(move)) {
      const card = this.material(MaterialType.FactionCard).getItem<CardId>(move.itemIndex)!
      delete card.selected
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [...effects,
        { targets: [move.itemIndex], effect: { type: EffectType.AddCharacteristics, card: this.remind(Memory.TargetCard) } }
      ])
      this.memorize<number[]>(Memory.OncePerRound, cards => [...cards, this.cardIndex])
      this.forget(Memory.TargetCard)
      return [this.rules().startRule(RuleId.ActivationRule)]
    }
    return []
  }
}
