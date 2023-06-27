import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class MountedBanshee extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
