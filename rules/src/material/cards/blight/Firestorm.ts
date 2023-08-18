import { Faction } from '../../Faction'
import { Spell } from '../Spell'
import { adjacent, creature, enemy } from '../AbilityTargetFilter'
import { attack } from '../Ability'

export class Firestorm extends Spell {
  faction = Faction.Blight
  limit = 2
  value = 3

  effect = attack(-1).defense(-1).to(adjacent, enemy, creature).loseAttributes().loseSkills()
}
