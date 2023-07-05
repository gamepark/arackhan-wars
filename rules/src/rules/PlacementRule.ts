import { LocationType } from '../material/LocationType'
import { Material, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { battlefieldSpaceCoordinates, startingSpaces } from '../material/spaces'
import { RuleId } from './RuleId'
import { FactionCards } from '../material/FactionCardType'
import { PlayerId } from '../ArackhanWarsOptions'
import { isAdjacentToFactionCard } from '../utils/IsAdjacent'

const PLACED_CARD_PER_TURN = 2

export class PlacementRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []
    const nextStep = this.nextStep()
    if (nextStep) {
      moves.push(nextStep)
      return moves
    }

    const factionCards = this.material(MaterialType.FactionCard)
    const playerHand = factionCards.location(LocationType.Hand).player(this.player)
    const astralCards = playerHand.filter((item) => FactionCards[item.id.front].astral)
    const otherCards = playerHand.filter((item) => !FactionCards[item.id.front].astral)

    moves.push(...this.moveToAstralPlane(astralCards))

    const cardsInBattlefield = factionCards.location(LocationType.Battlefield)
    if (!cardsInBattlefield.rotation((rotation) => !rotation).length && !cardsInBattlefield.player(player => player !== this.player).length) {
      moves.push(
        ...startingSpaces
          .flatMap((index) => this.moveToBattlefieldSpace(otherCards, battlefieldSpaceCoordinates[index]))
      )

      return moves
    }

    const cardsOnBattlefield = factionCards.location(LocationType.Battlefield).getItems()

    moves.push(
      ...battlefieldSpaceCoordinates
        .filter((space) => !cardsOnBattlefield.some((card) => card.location.x === space.x && card.location.y === space.y))
        .filter((space) => isAdjacentToFactionCard(cardsOnBattlefield, space))
        .flatMap((space) => this.moveToBattlefieldSpace(otherCards, space))
    )

    return moves
  }

  moveToAstralPlane(cards: Material<PlayerId, MaterialType, LocationType>) {
    return [
      ...cards.moveItems({
          location: {
            type: LocationType.AstralPlane,
            x: 0,
            player: this.player
          },
          rotation: { y: 1 }
        }
      ),
      ...cards.moveItems({
          location: {
            type: LocationType.AstralPlane,
            x: 1,
            player: this.player
          },
          rotation: { y: 1 }
        }
      )]
  }

  nextStep = () => {
    const hiddenCardsOnBattlefield = this.material(MaterialType.FactionCard)
      .location((location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane)
      .rotation((rotation) => !!rotation?.y)


    if (hiddenCardsOnBattlefield.length === (this.game.players.length * PLACED_CARD_PER_TURN)) {
      return this.rules().startRule(RuleId.RevealRule)
    }

    const playerHiddenCards = hiddenCardsOnBattlefield.player(this.player)
    if (playerHiddenCards.length === 2) {
      return this.rules().startPlayerTurn(RuleId.PlacementRule, this.nextPlayer)
    }

    return
  }

  moveToBattlefieldSpace(cards: Material<PlayerId, MaterialType, LocationType>, space: XYCoordinates) {
    return cards.moveItems({
      location: {
        type: LocationType.Battlefield,
        x: space.x,
        y: space.y,
        player: this.player
      },
      rotation: { y: 1 }
    })
  }
}
