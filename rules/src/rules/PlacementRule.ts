import { LocationType } from '../material/LocationType'
import { areAdjacentSquares, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { battlefieldSpaceCoordinates, startingCoordinates } from '../material/spaces'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { isSpell } from './cards/descriptions/base/Spell'
import { FactionCardsCharacteristics } from '../material/FactionCard'
import { Memory } from './Memory'

export class PlacementRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []

    const factionCards = this.material(MaterialType.FactionCard)
    const playerHand = factionCards.location(LocationType.Hand).player(this.player)
    const astralCards = playerHand.filter(this.isAstral)
    const otherCards = playerHand.filter(item => !this.isAstral(item))

    for (let x = 0; x < 2; x++) {
      moves.push(...astralCards.moveItems({
        location: { type: LocationType.AstralPlane, x, player: this.player },
        rotation: { y: 1 }
      }))
    }

    for (const space of this.battlefieldLegalSpaces) {
      moves.push(...otherCards.moveItems({
        location: { type: LocationType.Battlefield, ...space, player: this.player },
        rotation: { y: 1 }
      }))
    }

    return moves
  }

  isAstral(item: MaterialItem): boolean {
    const card = FactionCardsCharacteristics[item.id.front]
    return isSpell(card) && card.astral
  }

  get battlefieldLegalSpaces() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const battlefieldCards = battlefield.getItems()
    const battlefieldBeforeMyPlacement = battlefield.filter(card => !card.rotation || card.location.player !== this.player)
    if (battlefieldBeforeMyPlacement.length === 0) {
      return startingCoordinates.filter(space => !battlefieldCards.some(card => card.location.x === space.x && card.location.y === space.y))
    } else {
      return battlefieldSpaceCoordinates
        .filter(space =>
          !battlefieldCards.some(card => card.location.x === space.x && card.location.y === space.y)
          && battlefieldCards.some(card => areAdjacentSquares(card.location, space))
        )
    }
  }

  getAutomaticMoves() {
    const placedCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .rotation(rotation => rotation?.y === 1)

    if (placedCards.length === 2) {
      if (this.nextPlayer !== this.remind(Memory.StartPlayer)) {
        return [this.rules().startPlayerTurn(RuleId.PlacementRule, this.nextPlayer)]
      } else {
        return [this.rules().startRule(RuleId.RevealRule)]
      }
    }

    return []
  }
}

