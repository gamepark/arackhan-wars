import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class PaladinOfTheGuard extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
