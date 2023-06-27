import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Xenodon extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.Movement, strength: 2 }]
  quantity = 3
}
