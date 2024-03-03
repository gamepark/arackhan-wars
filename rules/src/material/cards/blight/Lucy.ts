import { Faction } from '../../Faction'
import { FactionCard } from '../../FactionCard'
import { deactivate, loseSkills } from '../Ability'
import { adjacent, adjacentTo, cardNamed, creature, enemy } from '../AbilityTargetFilter'
import { flight, stealth } from '../Attribute'
import { Creature } from '../Creature'

export class Lucy extends Creature {
  faction = Faction.Blight
  legendary = true
  value = 7

  attack = 0
  defense = 0

  attributes = [stealth, flight]
  skills = [
    loseSkills().to(adjacent, enemy, creature),
    deactivate(enemy, creature, adjacentTo(cardNamed(FactionCard.Lucy), cardNamed(FactionCard.Feyr)))
  ]
}
