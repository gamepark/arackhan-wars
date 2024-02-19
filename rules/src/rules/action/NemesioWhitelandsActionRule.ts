import { isSelectItemType, ItemMove } from '@gamepark/rules-api'
import { isCreature } from '../../material/cards/Creature'
import { EffectType } from '../../material/cards/Effect'
import { FactionCardsCharacteristics } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class NemesioWhitelandsActionRule extends CardActionRule {
  getPlayerMoves() {
    const nemesio = this.remind(Memory.ActionCard)
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .filter((item, index) => index !== nemesio && isCreature(FactionCardsCharacteristics[item.id.front]))
      .selectItems()
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.FactionCard)(move)) {
      const nemesio = this.remind(Memory.ActionCard)
      const card = this.material(MaterialType.FactionCard).getItem(move.itemIndex)
      delete card?.selected
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [...effects,
        { targets: [nemesio, move.itemIndex], effect: { type: EffectType.SwapSkills, creatures: [nemesio, move.itemIndex] } }
      ])
      this.memorize<number[]>(Memory.OncePerRound, cards => [...cards, nemesio])
      return this.afterCardAction()
    }
    return []
  }
}
