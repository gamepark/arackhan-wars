import { Faction } from '../../Faction'
import { cannotBePlayed, defense, extraScore } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { ExtraScoreType, RoundLimitation } from '../Effect'
import { Land } from '../Land'

export class MastersOfAracKhan extends Land {
  faction = Faction.GreyOrder
  value = 10
  holo = true

  defense = 4

  benefits = [
    defense(+1).to(adjacent, allied, creature),
    extraScore(ExtraScoreType.MastersOfAracKhan)
  ]
  weakness = cannotBePlayed(RoundLimitation.LastRound)
}
