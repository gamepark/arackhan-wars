import { Material, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { EffectRule } from '../../descriptions/base/Effect'

export enum AttributeKind {
  Attack,
  Move,
}

export abstract class Attribute<T extends AttributeRule = any> {
  kind?: AttributeKind
  abstract type: CardAttributeType

  abstract getAttributeRule(_game: MaterialGame): T
}


export class AttributeRule extends MaterialRulesPart {
  getPassiveEffect?(source: Material, target: Material): EffectRule | undefined
}
