import { Faction } from '../../Faction'
import { canOnlyBeAttacked, gainAttribute } from '../Ability'
import { adjacent, allied, creature, maxValue } from '../AbilityTargetFilter'
import { AttackCondition } from '../AttackLimitation'
import { stealth } from '../Attribute'
import { Land } from '../Land'

export class DarkTunnel extends Land {
  faction = Faction.Blight
  legendary = false
  value = 7
  deckBuildingValue = 13

  defense = 3

  benefits = [
    gainAttribute(stealth).to(adjacent, allied, creature, maxValue(7)),
    canOnlyBeAttacked(AttackCondition.CreaturesIfAdjacent)
  ]
}
