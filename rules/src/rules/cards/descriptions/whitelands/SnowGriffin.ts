import { CardAttributeType } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { looseAttributes } from '../../rules/effect/LooseAttributesEffect'
import { adjacent, creature, enemy } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { flight } from '../../rules/attribute'

export class SnowGriffin extends Creature {
  id = FactionCard.SnowGriffin
  faction = Faction.Whitelands

  value = 7
  attack = 2
  defense = 1

  attribute = flight

  skill = looseAttributes([adjacent, enemy, creature], [CardAttributeType.Swarm])

  quantity = 2
}