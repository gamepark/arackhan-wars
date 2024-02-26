import { Material } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class ForcedExileActionRule extends MoveCardsActionRule {
  moves = 1

  getCardsAllowedToMove(): Material {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    return battlefield.player(player => player !== this.player).filter((_, index) => {
      const cardRule = getCardRule(this.game, index)
      return cardRule.isCreature && !cardRule.isImmuneToEnemySpells
    })
  }
}
