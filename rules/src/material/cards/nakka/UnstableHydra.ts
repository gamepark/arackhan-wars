import { Faction } from '../../Faction'
import { movement, omnistrike } from '../Attribute'
import { Creature } from '../Creature'

export class UnstableHydra extends Creature {
  faction = Faction.Nakka
  value = 8
  deckBuildingValue = 13
  holo = true

  attack = 2
  defense = 1

  attributes = [movement(2), omnistrike]
  // TODO skills
}
