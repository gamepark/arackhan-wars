import { Faction } from '../../Faction'
import { attack, defense } from '../Ability'
import { allied, creature, maxValue } from '../AbilityTargetFilter'
import { Spell } from '../Spell'

export class SecretIncantation extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 7

  astral = true

  effects = [
    attack(+1).to(allied, creature, maxValue(5)),
    defense(+1).to(allied, creature, maxValue(5))
  ]
}
