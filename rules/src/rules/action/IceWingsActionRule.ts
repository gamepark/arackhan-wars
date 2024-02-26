import { Material } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class IceWingsActionRule extends MoveCardsActionRule {
  moves = 2

  getCardsAllowedToMove(): Material {
    const alreadyMoved = this.remind<number[]>(Memory.MovedCards)
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    return battlefield.player(this.player).filter((_, index) => {
      const rule = getCardRule(this.game, index)
      return rule.isCreature && rule.value <= 5 && !alreadyMoved.includes(index)
    })
  }
}
