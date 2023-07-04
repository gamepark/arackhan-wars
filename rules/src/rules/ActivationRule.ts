import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, Location, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { FactionCards } from '../material/FactionCardType'
import { CardAttribute, CardAttributeType } from './cards/FactionCardRule'
import { RuleId } from './RuleId'

export class ActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  initiative = false

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = this
      .material(MaterialType.FactionCard)
      .location(this.onValidLocation)
      .player(this.player)
      .filter(this.canBePlayed)
      .indexes
      .filter(this.hasActivatedToken)
      .map((card: number) =>
        this.rules().customMove(CustomMoveType.ActivateCard, { card })
      )

    moves.push(this.endTurnMove())

    return moves
  }

  onValidLocation = (location: Location) => {
    return location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane
  }

  canBePlayed = (item: MaterialItem) => {
    if (!this.initiative) return true
    return FactionCards[item.id.front].attributes?.some((a: CardAttribute) => a.type === CardAttributeType.Initiative)
  }

  hasActivatedToken = (card: number) => {
    return this.material(MaterialType.FactionToken).parent(card).rotation((rotation) => !rotation?.y).length
  }

  endTurnMove = (): MaterialMove => {
    if (this.player == this.game.players[1]) {
      return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
    }
    return this.rules().startPlayerTurn(RuleId.InitiativeActivationRule, this.nextPlayer)
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    return [
      this
        .material(MaterialType.FactionToken)
        .parent(move.data.card)
        .moveItem({ rotation: { y: 1 } })
    ]
  }
}
