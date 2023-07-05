import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { RuleId } from './RuleId'
import { getFactionCard } from '../material/FactionCardType'

export class EndPhaseRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const playedCards = this
      .material(MaterialType.FactionCard)
      .location((location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane)

    const discardCards: MaterialMove[] = []
    const indexes: number[] = []
    for (const index of playedCards.indexes) {
      const item = playedCards.getItem(index)!
      const discards = getFactionCard(item.id.front).onRoundEnd(this)
      discardCards.push(...discards)

      if (discards.length) {
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
      ...discardCards,
      ...unflipTokens,
      this.rules().startRule(RuleId.DrawRule)
    ]
  }
}
