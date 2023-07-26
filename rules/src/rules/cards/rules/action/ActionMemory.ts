import { RuleId } from '../../../RuleId'
import { Location } from '@gamepark/rules-api'

export type ActionRuleMemory = {
  card: number
  location: Location
}

export type ActionMemory = {
  previousRule: RuleId
}

export type ExchangedCharacteristics = {
  exchanges?: {
    source: number
    target: number
  }[]
}
