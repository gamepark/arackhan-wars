import { RuleId } from '../../rules/RuleId'
import { Faction } from '../Faction'
import { FactionCard } from '../FactionCard'
import { Ability } from './Ability'
import { Attribute } from './Attribute'

export enum FactionCardKind {
  Creature = 1,
  Spell,
  Land,
}

export enum DiscardTiming {
  EndOfRound = 1,
  ActivationOrEndOfTurn
}

export abstract class FactionCardCharacteristics {
  abstract faction: Faction
  abstract kind: FactionCardKind
  abstract value: number
  deckBuildingValue?: number
  limit?: number
  legendary = false
  action?: RuleId
  altOf?: FactionCard
  fullArt = false
  holo = false

  constructor({ fullArtOf, altArtOf, holo }: { fullArtOf?: FactionCard, altArtOf?: FactionCard, holo?: boolean } = {}) {
    this.altOf = fullArtOf ?? altArtOf
    this.fullArt = fullArtOf !== undefined
    this.holo = holo ?? false
  }

  protected attribute?: Attribute
  protected attributes: Attribute[] = []

  getAttributes() {
    return this.attribute ? [this.attribute] : this.attributes
  }

  abstract getAbilities(): Ability[]

  get canAttack() {
    return false
  }

  getLimit() {
    return this.legendary ? 1 : this.limit ?? (this.getDeckBuildingValue() >= 6 ? 6 : Infinity)
  }

  getDeckBuildingValue() {
    return this.deckBuildingValue ?? this.value
  }
}
