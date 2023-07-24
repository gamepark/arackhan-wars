import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { RuleId } from '../../../RuleId'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { FactionCardKind } from '../../descriptions/base/FactionCardDetail'
import { GamePlayerMemory } from '../../../../ArackhanWarsSetup'
import { discardCard } from '../../../../utils/discard.utils'

type HorseOfAvalonActionRuleMemory = {
  location: Location
}

export class HorseOfAvalonActionRule extends PlayerTurnRule {

  getPlayerMoves() {
    // TODO: Where was it placed ?
    const { location } = this.getMemory<HorseOfAvalonActionRuleMemory>()

    return this
      .material(MaterialType.FactionCard)
      .location(LocationType.Hand)
      .player(this.player)
      .filter((item) => getFactionCardDescription(item.id.front).kind === FactionCardKind.Creature)
      .moveItems({ location })
  }

  afterItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
    if (!isMoveItem(move) || move.itemType !== MaterialType.FactionCard) return []
    const card = this.material(MaterialType.FactionCard).index(move.itemIndex)
    return [
      this.material(MaterialType.FactionToken)
        .player(this.player)
        .createItem({
          // Must be the faction instead of the player
          id: this.getGameMemory<GamePlayerMemory>(this.player)!.faction,
          location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: this.player }
        }),
      ...discardCard(card),
      this.rules().startPlayerTurn(RuleId.ActivationRule, this.player)
    ]
  }
}
