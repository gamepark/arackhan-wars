import { destroyIfAttackFail } from '../../rules/effect/DestroyWhenAttackFailEffect'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { perforation } from '../../rules/attribute'

export class ChildEater extends Creature {
  faction = Faction.Blight
  value = 13
  deckBuildingValue = 15

  attack = 4
  defense = 2

  attribute = perforation
  weakness = destroyIfAttackFail
}
