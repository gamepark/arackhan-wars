import { Faction } from '../Faction'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class InitiativeActivationRule extends PlayerTurnRule<Faction, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove<Faction, MaterialType, LocationType>[] {
    return []
  }
}
