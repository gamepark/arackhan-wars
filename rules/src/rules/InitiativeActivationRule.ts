import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { FactionCards } from '../material/FactionCardType'
import { CardAttribute, CardAttributeType } from './cards/FactionCardRule'

export class InitiativeActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    return this
      .material(MaterialType.FactionCard)
      .location((location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane)
      .player(this.player)
      .filter((item) => {
          console.log('Item', item, FactionCards[item.id.front])
          return FactionCards[item.id.front].attributes?.some((a: CardAttribute) => a.type === CardAttributeType.Initiative)
        }
      )
      .indexes
      .map((card: number) =>
        this.rules().customMove(CustomMoveType.ActivateCard, { card })
      )
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
