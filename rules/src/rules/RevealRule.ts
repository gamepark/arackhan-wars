import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { ItemMove, ItemMoveType, MaterialMove, MaterialRulesPart, MoveKind } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { getCharacteristics } from '../material/FactionCard'
import { PlayerId } from '../ArackhanWarsOptions'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { isSpell } from './cards/descriptions/base/Spell'
import { Memory } from './Memory'

export class RevealRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const revealCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .filter(item => !!item.rotation?.y)
      .moveItems({ rotation: {} })

    return [
      ...revealCards,
      this.rules().startPlayerTurn(RuleId.InitiativeActivationRule, this.remind(Memory.StartPlayer))
    ]
  }

  afterItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.kind === MoveKind.ItemMove && move.type === ItemMoveType.Move) {
      const revealedCard = this.material(move.itemType).getItem(move.itemIndex)!
      if (isSpell(getCharacteristics(move.itemIndex, this.game))) return []

      return [
        this.material(MaterialType.FactionToken)
          .player(revealedCard.location.player)
          .createItem({
            id: this.remind(Memory.Faction, revealedCard.location.player),
            location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: revealedCard.location.player }
          })
      ]
    }

    return []
  }
}
