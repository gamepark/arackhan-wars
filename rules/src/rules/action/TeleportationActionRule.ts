import { Material } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class TeleportationActionRule extends MoveCardsActionRule {
  moves = 1

  getCardsAllowedToMove(): Material {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    return battlefield.player(this.player).filter((_, index) => getCardRule(this.game, index).isCreature)
  }
}
