import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { omnistrike, perforation } from '../../rules/attribute'

export class WrathOfTheForest extends Creature {
  id = FactionCard.WrathOfTheForest
  faction = Faction.Nakka

  value = 13
  attack = 3
  defense = 3

  attributes = [
    omnistrike,
    perforation
  ]
}
