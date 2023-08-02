import { Material, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { EffectRule } from '../../descriptions/base/Ability'

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
  getEffectRule?(source: Material, target: Material): EffectRule | undefined
}
