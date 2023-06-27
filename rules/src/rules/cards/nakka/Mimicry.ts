import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Mimicry extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Spell
  astral = true
}
