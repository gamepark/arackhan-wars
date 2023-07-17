import { LocationType } from '../material/LocationType'
import { isMoveItem, ItemMove, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { battlefieldSpaceCoordinates, startingSpaces } from '../material/spaces'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'
import { getFactionCardDescription, getFactionCardRule } from '../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { getAvailableCardPlacement, moveToBattlefieldSpace } from '../utils/move.utils'

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
    const astralCards = playerHand.filter((item) => getFactionCardDescription(item.id.front).astral as boolean)
    const otherCards = playerHand.filter((item) => !getFactionCardDescription(item.id.front).astral)

    moves.push(...this.moveToAstralPlane(astralCards))

    const cardsInBattlefield = factionCards.location(LocationType.Battlefield)
    if (!cardsInBattlefield.rotation((rotation) => !rotation).length && !cardsInBattlefield.player(player => player !== this.player).length) {
      moves.push(
        ...startingSpaces
          .flatMap((index) => moveToBattlefieldSpace(otherCards, battlefieldSpaceCoordinates[index], this.player))
      )

      return moves
    }

    const cardsOnBattlefield = factionCards.location(LocationType.Battlefield).getItems()

    moves.push(
      ...getAvailableCardPlacement(cardsOnBattlefield, otherCards, this.player)
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
      .location(onBattlefieldAndAstralPlane)
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

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move, MaterialType.FactionCard) && (move.position.location?.type === LocationType.Battlefield || move.position.location?.type === LocationType.AstralPlane)) {
      const rules = getFactionCardRule(this.game, move.itemIndex)
      if (rules) {
        return rules.onPlaceCard()
      }
    }

    return []
  }
}
