import { MaterialRulesPart, MaterialGame } from '@gamepark/rules-api'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'

export enum AttributeKind {
  Attack,
  Move,
}

export abstract class Attribute<T extends AttributeRule> {
  kind?: AttributeKind
  abstract type: CardAttributeType

  abstract getAttributeRule(_game: MaterialGame): T
}


export class AttributeRule extends MaterialRulesPart {

}
