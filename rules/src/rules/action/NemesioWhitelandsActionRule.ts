import { isSelectItemType, ItemMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class NemesioWhitelandsActionRule extends CardActionRule {
  canPlay(): boolean {
    return this.otherCreatures.length > 0
  }

  get otherCreatures() {
    const nemesio = this.cardIndex
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .index(index => index !== nemesio && getCardRule(this.game, index).isCreature)
  }

  getPlayerMoves() {
    return this.otherCreatures.selectItems()
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.FactionCard)(move)) {
      const nemesio = this.cardIndex
      delete this.material(MaterialType.FactionCard).getItem(move.itemIndex)!.selected
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [...effects,
        { targets: [nemesio, move.itemIndex], effect: { type: EffectType.SwapSkills, creatures: [nemesio, move.itemIndex] } }
      ])
      this.memorize<number[]>(Memory.OncePerRound, cards => [...cards, nemesio])
      return this.afterCardAction()
    }
    return []
  }
}
