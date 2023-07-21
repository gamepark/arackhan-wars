import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { RuleId } from './RuleId'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { activateTokens } from '../utils/activation.utils'
import { getFactionCardDescription } from '../material/FactionCard'
import { isSpell } from './cards/descriptions/base/Spell'
import { DiscardTiming } from './cards/descriptions/base/FactionCardDetail'
import { discardCard } from '../utils/discard.utils'

export class EndPhaseRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getAutomaticMoves(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const battlefieldCards = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const moves: MaterialMove[] = []
    const indexes: number[] = []
    for (const index of battlefieldCards.getIndexes()) {
      const cardMaterial = this.material(MaterialType.FactionCard).index(index)!
      const card = getFactionCardDescription(cardMaterial.getItem()!.id.front)

      if (isSpell(card) && card.discardTiming === DiscardTiming.EndOfRound) {
        const token = this.material(MaterialType.FactionToken).parent(index)
        moves.push(...discardCard(cardMaterial, token))
        indexes.push(index)
      }
    }

    const unflipTokens = activateTokens(
      this
        .material(MaterialType.FactionToken)
        .location(LocationType.FactionTokenSpace)
        .parent((parent) => !indexes.includes(parent as number))
        .rotation((rotation) => !!rotation?.y)
    )

    return [
      ...unflipTokens,
      ...moves,
      this.rules().startRule(RuleId.DrawRule)
    ]
  }
}
