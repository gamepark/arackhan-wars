import { LocationType } from '../material/LocationType'
import { areAdjacentSquares, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { battlefieldCoordinates, onBattlefieldAndAstralPlane } from '../material/Board'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'
import { isSpell } from '../material/cards/Spell'
import { FactionCardsCharacteristics } from '../material/FactionCard'
import { Memory } from './Memory'

export class PlacementRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const placedCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .rotation(rotation => rotation?.y === 1)
    if (placedCards.length === 2) {
      return [this.validationMove]
    }

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
    if (!battlefield.length) {
      return startingCoordinates
    }
    const battlefieldCards = battlefield.getItems()
    const potentialArea = battlefieldCards.every(card => this.isPlacedThisTurnByMe(card)) ? startingCoordinates : battlefieldCoordinates
    return potentialArea.filter(space => {
      let adjacentCardFound = false
      for (const card of battlefieldCards) {
        if (card.location.x === space.x && card.location.y === space.y) return false
        adjacentCardFound = adjacentCardFound || areAdjacentSquares(card.location, space)
      }
      return adjacentCardFound
    })
  }

  isPlacedThisTurnByMe(card: MaterialItem) {
    return card.rotation && card.location.player === this.player
  }

  get validationMove() {
    if (this.nextPlayer !== this.remind(Memory.StartPlayer)) {
      return this.rules().startPlayerTurn(RuleId.PlacementRule, this.nextPlayer)
    } else {
      return this.rules().startRule(RuleId.RevealRule)
    }
  }
}

export const startingCoordinates = [{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 3 }]

