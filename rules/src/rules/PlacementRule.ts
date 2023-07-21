import { LocationType } from '../material/LocationType'
import { Material, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { startingCoordinates } from '../material/spaces'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'
import { getFactionCardDescription } from '../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { getAvailableCardPlacement, moveToBattlefieldSpace } from '../utils/move.utils'
import { isSpell } from './cards/descriptions/base/Spell'

const PLACED_CARD_PER_TURN = 2

export class PlacementRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []

    const factionCards = this.material(MaterialType.FactionCard)
    const playerHand = factionCards.location(LocationType.Hand).player(this.player)
    const astralCards = playerHand.filter(this.isAstral)
    const otherCards = playerHand.filter((item) => !this.isAstral(item))

    moves.push(...this.moveToAstralPlane(astralCards))

    const cardsOnBattlefield = factionCards.location(LocationType.Battlefield).getItems()
    if (cardsOnBattlefield.every(card => card.rotation && card.location.player === this.player)) {
      moves.push(
        ...startingCoordinates
          .filter(space => !cardsOnBattlefield.some((card) => card.location.x === space.x && card.location.y === space.y))
          .flatMap(space => moveToBattlefieldSpace(otherCards, space, this.player))
      )

      return moves
    }

    moves.push(
      ...getAvailableCardPlacement(cardsOnBattlefield, otherCards, this.player)
    )

    return moves
  }

  isAstral(item: MaterialItem): boolean {
    const card = getFactionCardDescription(item.id.front)
    return isSpell(card) && card.astral
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

  getAutomaticMoves() {
    const hiddenCardsOnBattlefield = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .rotation((rotation) => !!rotation?.y)

    if (hiddenCardsOnBattlefield.length === (this.game.players.length * PLACED_CARD_PER_TURN)) {
      return [this.rules().startRule(RuleId.RevealRule)]
    }

    const playerHiddenCards = hiddenCardsOnBattlefield.player(this.player)
    if (playerHiddenCards.length === 2) {
      return [this.rules().startPlayerTurn(RuleId.PlacementRule, this.nextPlayer)]
    }

    return []
  }
}

