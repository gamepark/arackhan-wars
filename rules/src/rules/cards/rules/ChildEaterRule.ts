import { FactionCardRule } from './base/FactionCardRule'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { LocationType } from '../../../material/LocationType'

export class ChildEaterRule extends FactionCardRule {
  afterAttack = (opponents: number[], destroyedOpponents: number): MaterialMove[] => {
    if (destroyedOpponents < opponents.length) {
      this.item.moveItems({
        location: {
          type: LocationType.PlayerDiscard,
          player: this.item.getItem()!.location.player
        }
      })
    }

    return []
  }
}
