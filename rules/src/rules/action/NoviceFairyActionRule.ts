import { FactionCardsCharacteristics } from '../../material/FactionCard'
import { ReplaceWithCreatureActionRule } from './ReplaceWithCreatureActionRule'

export class NoviceFairyActionRule extends ReplaceWithCreatureActionRule {
  getEligibleCards() {
    return super.getEligibleCards().filter(item => FactionCardsCharacteristics[item.id.front].value <= 5)
  }
}
