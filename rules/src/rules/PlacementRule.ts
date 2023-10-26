import { areAdjacentSquares, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { battlefieldCoordinates, onBattlefieldAndAstralPlane } from '../material/Board'
import { isSpell } from '../material/cards/Spell'
import { FactionCardsCharacteristics } from '../material/FactionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlacementRule extends PlayerTurnRule {
  getPlayerMoves() {
    const placedCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .rotation(true)
    if (placedCards.length === 2) {
      return [this.validationMove]
    }

    const moves: MaterialMove[] = []
    const factionCards = this.material(MaterialType.FactionCard)
    const playerHand = factionCards.location(LocationType.PlayerHand).player(this.player)
    const astralCards = playerHand.filter(this.isAstral)
    const otherCards = playerHand.filter(item => !this.isAstral(item))

    for (let x = 0; x < 2; x++) {
      moves.push(...astralCards.moveItems({ type: LocationType.AstralPlane, x, rotation: true, player: this.player }))
    }

    for (const space of this.battlefieldLegalSpaces) {
      moves.push(...otherCards.moveItems({ type: LocationType.Battlefield, ...space, rotation: true, player: this.player }))
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
    return card.location.rotation && card.location.player === this.player
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

