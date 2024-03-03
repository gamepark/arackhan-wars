import { Faction } from '../../Faction'
import { FactionCard } from '../../FactionCard'
import { deactivate, loseAttributes } from '../Ability'
import { adjacent, adjacentTo, cardNamed, creature, enemy } from '../AbilityTargetFilter'
import { flight, stealth } from '../Attribute'
import { Creature } from '../Creature'

export class Feyr extends Creature {
  faction = Faction.Blight
  legendary = true
  value = 10
  deckBuildingValue = 12

  attack = 0
  defense = 0

  attributes = [stealth, flight]
  skills = [
    loseAttributes().to(adjacent, enemy, creature),
    deactivate(enemy, creature, adjacentTo(cardNamed(FactionCard.Lucy), cardNamed(FactionCard.Feyr)))
  ]
}
