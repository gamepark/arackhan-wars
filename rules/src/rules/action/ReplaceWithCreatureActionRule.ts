import { isMoveItem, ItemMove } from '@gamepark/rules-api'
import { isCreature } from '../../material/cards/Creature'
import { FactionCardsCharacteristics } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'

export class ReplaceWithCreatureActionRule extends CardActionRule {

  canPlay(): boolean {
    return this.getEligibleCards().length > 0
  }

  onRuleStart() {
    this.memorize(Memory.Location, this.actionCard.location)
    return this.discardActionCard()
  }

  getEligibleCards() {
    return this.material(MaterialType.FactionCard)
      .location(LocationType.PlayerHand)
      .player(this.player)
      .filter(item => isCreature(FactionCardsCharacteristics[item.id.front]))
  }

  getPlayerMoves() {
    return this.getEligibleCards().moveItems(this.remind(Memory.Location))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.location.type === LocationType.Battlefield) {
      return [
        this.material(MaterialType.FactionToken)
          .player(this.player)
          .createItem({
            id: this.remind(Memory.PlayerFactionToken, this.player),
            location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: this.player }
          }),
        ...this.afterCardAction()
      ]
    }
    return []
  }
}
