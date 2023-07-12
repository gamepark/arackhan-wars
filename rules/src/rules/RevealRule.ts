import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { ItemMove, ItemMoveType, MaterialMove, MaterialRulesPart, MoveKind } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { getFactionCardDescription } from '../material/FactionCard'
import { PlayerId } from '../ArackhanWarsOptions'
import { GamePlayerMemory } from '../ArackhanWarsSetup'
import { FactionCardKind } from './cards/descriptions/FactionCardDetail'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'

export class RevealRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const revealCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .filter((item) => !!item.rotation?.y)
      .moveItems({ rotation: {} })

    return [
      ...revealCards,
      // TODO: Go the the next player that has initiative cards on board, if any go to the ActivationRule
      this.rules().startPlayerTurn(RuleId.InitiativeActivationRule, this.game.players[0])
    ]
  }

  afterItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.ItemMove && move.type === ItemMoveType.Move) {
      const revealedCard = this.material(move.itemType).getItems()[move.itemIndex]
      if (getFactionCardDescription(revealedCard.id.front).kind !== FactionCardKind.Spell) {
        return [
          this.material(MaterialType.FactionToken)
            .player(revealedCard.location.player)
            .createItem({
              // Must be the faction instead of the player
              id: this.getGameMemory<GamePlayerMemory>(revealedCard.location.player)!.faction,
              location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: revealedCard.location.player }
            })
        ]
      }
    }

    return []
  }
}
