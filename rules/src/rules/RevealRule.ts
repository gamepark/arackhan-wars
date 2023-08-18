import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { ItemMove, ItemMoveType, MaterialRulesPart, MoveKind } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'
import { isSpell } from './cards/descriptions/base/Spell'
import { Memory } from './Memory'
import { getCardRule } from './cards/rules/base/CardRule'
import { onBattlefieldAndAstralPlane } from '../material/Board'

export class RevealRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves() {
    const revealCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .filter(item => !!item.rotation?.y)
      .moveItems({ rotation: {} })

    return [
      ...revealCards,
      this.rules().startPlayerTurn(RuleId.ActivationRule, this.remind(Memory.StartPlayer))
    ]
  }

  afterItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>) {
    if (move.kind === MoveKind.ItemMove && move.type === ItemMoveType.Move) {
      const revealedCard = this.material(move.itemType).getItem(move.itemIndex)!
      if (isSpell(getCardRule(this.game, move.itemIndex).characteristics)) return []

      return [
        this.material(MaterialType.FactionToken)
          .player(revealedCard.location.player)
          .createItem({
            id: this.remind(Memory.Token, revealedCard.location.player),
            location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: revealedCard.location.player }
          })
      ]
    }

    return []
  }

  onRuleEnd() {
    this.memorize(Memory.IsInitiativeSequence, true)
    return []
  }
}
