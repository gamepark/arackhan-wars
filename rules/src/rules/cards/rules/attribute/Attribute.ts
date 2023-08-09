import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'

export enum AttributeKind {
  Attack,
  Move,
}

export abstract class Attribute<T extends AttributeRule = any> {
  kind?: AttributeKind
  abstract type: CardAttributeType

  abstract get cardAttribute(): CardAttribute

  abstract getAttributeRule(_game: MaterialGame): T
}


export class AttributeRule extends MaterialRulesPart {
}
