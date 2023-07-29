import { FactionCard } from '../../../../material/FactionCard'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { omnistrike } from '../../rules/attribute'

export class EarthQuake extends Spell {
  id = FactionCard.EarthQuake
  faction = Faction.Nakka

  value = 2
  attack = 2

  attribute = omnistrike
}
