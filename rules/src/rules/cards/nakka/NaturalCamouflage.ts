import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class NaturalCamouflage extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Spell
}
