import { areAdjacentSquares, CustomMove, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { isCreature } from '../../material/cards/Creature'
import { Family } from '../../material/cards/Family'
import { CustomMoveType } from '../../material/CustomMoveType'
import { CardId, FactionCardsCharacteristics } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'

export class BackupActionRule extends CardActionRule {

  onRuleStart() {
    this.memorize(Memory.Count, 2)
    return []
  }

  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const myLegion6 = battlefield.player(this.player).id<CardId>(id => {
      const characteristics = FactionCardsCharacteristics[id.front]
      return isCreature(characteristics) && characteristics.family === Family.Legion6
    }).getItems()
    if (!myLegion6.length) return []
    const eligibleCards = this.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(this.player).id<CardId>(id => {
      const characteristics = FactionCardsCharacteristics[id.front]
      return isCreature(characteristics) && characteristics.family === Family.Legion6 && characteristics.value <= 8
    })
    if (!eligibleCards.length) return []
    const enemyCreatures = battlefield.player(player => player !== this.player).id<CardId>(id => isCreature(FactionCardsCharacteristics[id.front])).getItems()
    const eligibleSpots = battlefieldCoordinates.filter(coordinates =>
      myLegion6.some(legion => areAdjacentSquares(coordinates, legion.location))
      && !enemyCreatures.some(enemy => areAdjacentSquares(coordinates, enemy.location))
    )
    const moves: MaterialMove[] = eligibleSpots.flatMap(spot =>
      eligibleCards.moveItems({ type: LocationType.Battlefield, ...spot, player: this.player })
    )
    if (this.remind(Memory.Count) < 2) {
      moves.push(this.rules().customMove(CustomMoveType.Pass))
    }
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.Battlefield) {
      const moves: MaterialMove[] = [this.material(MaterialType.FactionToken)
        .player(this.player)
        .createItem({
          id: this.remind(Memory.PlayerFactionToken, this.player),
          location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: this.player }
        })]
      if (this.remind(Memory.Count) > 1) {
        this.memorize(Memory.Count, count => count - 1)
      } else {
        moves.push(...this.afterCardAction())
      }
      return moves
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return this.afterCardAction()
    }
    return []
  }

  afterCardAction() {
    this.forget(Memory.Count)
    return super.afterCardAction()
  }
}
