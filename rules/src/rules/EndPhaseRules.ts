import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { RuleId } from './RuleId'

export class EndPhaseRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const unflipTokens = this
      .material(MaterialType.FactionToken)
      .location(LocationType.FactionTokenSpace)
      .rotation((rotation) => !!rotation?.y)
      .moveItems({ rotation: { y: 0 } })

    return [
      ...unflipTokens,
      this.rules().startRule(RuleId.DrawRule)
    ]
  }
}
