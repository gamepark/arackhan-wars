import { ItemMove, ItemMoveType, MaterialRulesPart, MoveKind } from '@gamepark/rules-api'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { isSpell } from '../material/cards/Spell'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RevealRule extends MaterialRulesPart {

  onRuleStart() {
    const startPlayer = this.remind(Memory.StartPlayer)
    return [
      ...this.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane).rotation(true)
        .sort(item => item.location.player === startPlayer ? 0 : 1).rotateItems(false),
      this.startPlayerTurn(RuleId.ActivationRule, startPlayer)
    ]
  }

  afterItemMove(move: ItemMove) {
    if (move.kind === MoveKind.ItemMove && move.type === ItemMoveType.Move) {
      const revealedCard = this.material(move.itemType).getItem(move.itemIndex)!
      if (isSpell(getCardRule(this.game, move.itemIndex).characteristics)) return []

      return [
        this.material(MaterialType.FactionToken)
          .player(revealedCard.location.player)
          .createItem({
            id: this.remind(Memory.PlayerFactionToken, revealedCard.location.player),
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
