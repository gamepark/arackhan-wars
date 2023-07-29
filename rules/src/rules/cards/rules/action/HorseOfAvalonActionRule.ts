import { isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getCharacteristics } from '../../../../material/FactionCard'
import { GamePlayerMemory } from '../../../../ArackhanWarsSetup'
import { CardActionRule } from './CardActionRule'
import { ActionRuleMemory } from './ActionMemory'
import { isCreature } from '../../descriptions/base/Creature'


export class HorseOfAvalonActionRule extends CardActionRule {

  getPlayerMoves() {
    const { location } = this.getMemory<ActionRuleMemory>()

    return this
      .material(MaterialType.FactionCard)
      .location(LocationType.Hand)
      .player(this.player)
      .filter((_, index) => isCreature(getCharacteristics(index, this.game)))
      .moveItems({ location })
  }

  afterItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
    if (!isMoveItem(move) || move.itemType !== MaterialType.FactionCard) return []
    return [
      this.material(MaterialType.FactionToken)
        .player(this.player)
        .createItem({
          // Must be the faction instead of the player
          id: this.getGameMemory<GamePlayerMemory>(this.player)!.faction,
          location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: this.player }
        }),
      ...super.afterCardAction()
    ]
  }
}
