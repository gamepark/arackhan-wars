import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { ItemMoveType, MaterialMove, MaterialRulesPart, MoveKind } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { RuleId } from './RuleId'
import { getFactionCardRule } from '../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'

export class EndPhaseRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const playedCards = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const moves: MaterialMove[] = []
    const indexes: number[] = []
    for (const index of playedCards.getIndexes()) {
      const cardMoves = getFactionCardRule(this.game, index).onRoundEnd()
      moves.push(...cardMoves)

      const hasDiscard = cardMoves.some((m) => m.kind === MoveKind.ItemMove && m.type === ItemMoveType.Move && m.position.location?.type === LocationType.PlayerDiscard)
      if (hasDiscard) {
        indexes.push(index)
      }
    }

    // TODO: There will be an issue if there is token on discarded card
    const unflipTokens = this
      .material(MaterialType.FactionToken)
      .location(LocationType.FactionTokenSpace)
      .parent((parent) => !indexes.includes(parent as number))
      .rotation((rotation) => !!rotation?.y)
      .moveItems({ rotation: { y: 0 } })

    return [
      ...unflipTokens,
      ...moves,
      this.rules().startRule(RuleId.DrawRule)
    ]
  }
}
