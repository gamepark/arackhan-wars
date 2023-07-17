import { AttackRule } from '../base/AttackRule'
import { LocationType } from '../../../../material/LocationType'
import { MaterialMove } from '@gamepark/rules-api'

export class ChildEaterAttackRule extends AttackRule {
  afterAttack = (opponents: number[], destroyedOpponents: number): MaterialMove[] => {
    if (destroyedOpponents < opponents.length) {
      return this.item.moveItems({
        location: {
          type: LocationType.PlayerDiscard,
          player: this.item.getItem()!.location.player
        }
      })
    }

    return []
  }
}
