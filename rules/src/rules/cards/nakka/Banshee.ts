import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Banshee extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Creature
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Initiative }]
  quantity = 2
}
