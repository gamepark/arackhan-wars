import { Faction } from '../../Faction'
import { defense, immuneToEnemySpells } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { ModifyDefenseCondition } from '../Effect'
import { Land } from '../Land'

export class GhostMetalMonolith extends Land {
  faction = Faction.GreyOrder
  value = 10

  defense = 4

  benefits = [
    immuneToEnemySpells().to(adjacent, allied, creature),
    defense(+2, ModifyDefenseCondition.AttackedByFlyOrMoves).to(adjacent, allied, creature)
    // TODO destroy adjacent flight creatures
  ]
}
