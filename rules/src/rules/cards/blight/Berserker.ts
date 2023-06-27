import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Berserker extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  quantity = 2
  attributes = [
    { type: CardAttributeType.Initiative },
    { type: CardAttributeType.Omnistrike }
  ]
}
