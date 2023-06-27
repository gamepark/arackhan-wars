import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class NihilistPenguin extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Creature
  attack = 0
  defense = 1
  attributes = [{
    type: CardAttributeType.Movement,
    strength: 2
  }]
  quantity = 4
}
