import { MaterialMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class NemesioBlightActionRule extends CardActionRule {
  getPlayerMoves() {
    const selectedCard = this.material(MaterialType.FactionCard).selected()
    if (selectedCard.length === 0) {
      return this.adjacentCreatures.selectItems()
    } else {
      if (getCardRule(this.game, selectedCard.getIndex()).owner === this.player) {
        return this.adjacentCreatures.player(p => p !== this.player).selectItems()
      } else {
        return this.adjacentCreatures.player(this.player).selectItems()
      }
    }
  }

  get adjacentCreatures() {
    return this.cardRule.getOtherCardsAdjacentTo().filter((_, index) => getCardRule(this.game, index).isCreature)
  }

  afterItemMove() {
    const selectedCards = this.material(MaterialType.FactionCard).selected()
    const indexes = selectedCards.getIndexes()
    if (selectedCards.length === 2) {
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [
        ...effects,
        ...indexes.map<TargetingEffect>((index, i) => (
          {
            targets: [index], effect: {
              type: EffectType.Possession,
              originalOwner: getCardRule(this.game, index).owner,
              swapWith: indexes[i === 0 ? 1 : 0]
            }
          }
        ))
      ])
      const moves: MaterialMove[] = []
      const items = selectedCards.getItems()
      moves.push(this.material(MaterialType.FactionToken).parent(indexes[0]).moveItem(item => ({ ...item.location, parent: indexes[1] })))
      moves.push(this.material(MaterialType.FactionToken).parent(indexes[1]).moveItem(item => ({ ...item.location, parent: indexes[0] })))
      delete items[0].selected
      delete items[1].selected
      const player = items[1].location.player
      items[1].location.player = items[0].location.player
      items[0].location.player = player
      moves.push(...this.afterCardAction())
      return moves
    }
    return []
  }
}
