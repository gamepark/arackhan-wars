import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { CardActionRule } from './CardActionRule'

export class TheGreyOrderRisesActionRule extends CardActionRule {
  onRuleStart() {
    return [
      ...this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).location(l => l.rotation)
        .parent(parent => {
          if (parent === undefined) return false
          const cardRule = getCardRule(this.game, parent)
          return cardRule.owner === this.player && cardRule.isCreature
        })
        .rotateItems(false),
      ...this.afterCardAction()
    ]
  }
}