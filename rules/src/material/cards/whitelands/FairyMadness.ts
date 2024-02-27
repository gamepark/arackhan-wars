import { Faction } from '../../Faction'
import { attack, gainAttribute, trigger } from '../Ability'
import { allied, creature, family } from '../AbilityTargetFilter'
import { perforation } from '../Attribute'
import { TriggerAction, TriggerCondition } from '../Effect'
import { Family } from '../Family'
import { Spell } from '../Spell'

export class FairyMadness extends Spell {
  faction = Faction.Whitelands
  value = 5

  astral = true

  effects = [
    attack(+3).to(allied, family(Family.IceFairy), creature),
    gainAttribute(perforation).to(allied, family(Family.IceFairy), creature),
    trigger(TriggerAction.SelfDestroy).when(TriggerCondition.Attack).to(allied, family(Family.IceFairy), creature)
  ]
}
