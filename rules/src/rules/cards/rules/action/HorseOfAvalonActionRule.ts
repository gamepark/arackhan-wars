import { isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { CardActionRule } from './CardActionRule'
import { isCreature } from '../../descriptions/base/Creature'
import { Memory } from '../../../Memory'
import { FactionCardsCharacteristics } from '../../../../material/FactionCard'


export class HorseOfAvalonActionRule extends CardActionRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(Memory.Location, this.actionCard.location)
    return [this.discardActionCard()]
  }

  getPlayerMoves() {
    const location = this.remind(Memory.Location)
    return this.material(MaterialType.FactionCard)
      .location(LocationType.Hand)
      .player(this.player)
      .filter(item => isCreature(FactionCardsCharacteristics[item.id.front]))
      .moveItems({ location })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.position.location?.type === LocationType.Battlefield) {
      return [
        this.material(MaterialType.FactionToken)
          .player(this.player)
          .createItem({
            id: this.remind(Memory.Token, this.player),
            location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: this.player }
          }),
        ...super.afterCardAction()
      ]
    }
    return []
  }
}
