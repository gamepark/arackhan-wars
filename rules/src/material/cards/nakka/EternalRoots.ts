import { Faction } from '../../Faction'
import { canOnlyBeAttacked } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { AttackCondition } from '../AttackLimitation'
import { Land } from '../Land'

export class EternalRoots extends Land {
  faction = Faction.Nakka
  value = 8
  fullArt = true

  defense = 4

  benefit = canOnlyBeAttacked(AttackCondition.ByCreaturesInGroupOrSpells).to(adjacent, allied, creature)
}
