import { CardAttributeType } from '../base/FactionCardCharacteristics'
import { adjacent, allied, creature } from '../base/AbilityTargetFilter'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'
import { gainAttributes } from '../base/Ability'

export class TreeOfLife extends Land {
  faction = Faction.Nakka
  value = 12

  defense = 4

  benefit = gainAttributes(CardAttributeType.Regeneration).to(adjacent, allied, creature)
}
