import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'

export class ProtectorActionRule extends CardActionRule {
  onRuleStart() {
    return [
      this.material(MaterialType.FactionToken).createItem({
        id: this.remind(Memory.PlayerFactionToken, this.player),
        location: { parent: this.cardIndex, type: LocationType.FactionCard, player: this.player }
      }),
      ...this.afterCardAction()
    ]
  }
}
