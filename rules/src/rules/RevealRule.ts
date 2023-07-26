import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { ItemMove, ItemMoveType, MaterialMove, MaterialRulesPart, MoveKind, RuleMove } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { getFactionCardDescription } from '../material/FactionCard'
import { PlayerId } from '../ArackhanWarsOptions'
import { GamePlayerMemory } from '../ArackhanWarsSetup'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { isSpell } from './cards/descriptions/base/Spell'
import { FactionCardInspector } from './cards/rules/helper/FactionCardInspector'

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
      const revealedCard = this.material(move.itemType).getItem(move.itemIndex)!
      if (isSpell(getFactionCardDescription(revealedCard.id.front))) return []

      return [
        this.material(MaterialType.FactionToken)
          .player(revealedCard.location.player)
          .createItem({
            id: this.getGameMemory<GamePlayerMemory>(revealedCard.location.player)!.faction,
            location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: revealedCard.location.player }
          })
      ]
    }

    return []
  }

  onRuleEnd(_move: RuleMove): MaterialMove[] {
    const battlefield = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const indexes = battlefield.getIndexes()
    const moves = []
    const cardInspector = new FactionCardInspector(this.game)
    // Not optimal, but run once
    for (const source of indexes) {
      for (const target of indexes) {
        moves.push(...cardInspector.onCasterMoveTo(source, target))
      }

    }

    return moves
  }
}
