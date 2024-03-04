import { listingToList } from '@gamepark/rules-api'
import { BlightPreBuildDeck } from '../cards/blight/BlightPreBuildDeck'
import { GreyOrderPreBuildDeck } from '../cards/greyorder/GreyOrderPreBuildDeck'
import { NakkaPreBuildDeck } from '../cards/nakka/NakkaPreBuildDeck'
import { WhitelandsPreBuildDeck } from '../cards/whitelands/WhitelandsPreBuildDeck'
import { FactionCard } from '../FactionCard'
import { BrotherhoodOfDestruction } from './BrotherhoodOfDestruction'
import { ClutchOfDarkness } from './ClutchOfDarkness'
import { EndlessMayhem } from './EndlessMayhem'
import { GuardiansOfTheWhiteGates } from './GuardiansOfTheWhiteGates'
import { IceStorm } from './IceStorm'
import { LightningStrike } from './LightningStrike'
import { NakkaAscension } from './NakkaAscension'
import { OfIceAndFangs } from './OfIceAndFangs'
import { RagingCavalry } from './RagingCavalry'
import { RiseOfTheTitan } from './RiseOfTheTitan'
import { SickBrutality } from './SickBrutality'
import { SkyTerror } from './SkyTerror'
import { StrikeForce } from './StrikeForce'
import { ThePowerOfIce } from './ThePowerOfIce'
import { TheWarPath } from './TheWarPath'
import { UnstableMayhem } from './UnstableMayhem'
import { WesternPacificationForce } from './WesternPacificationForce'

export const publisherDecks: FactionCard[][] = [
  listingToList(WhitelandsPreBuildDeck),
  listingToList(NakkaPreBuildDeck),
  listingToList(GreyOrderPreBuildDeck),
  listingToList(BlightPreBuildDeck),
  listingToList(ThePowerOfIce),
  listingToList(LightningStrike),
  listingToList(RiseOfTheTitan),
  listingToList(UnstableMayhem),
  listingToList(IceStorm),
  listingToList(NakkaAscension),
  listingToList(BrotherhoodOfDestruction),
  listingToList(SickBrutality),
  listingToList(OfIceAndFangs),
  listingToList(TheWarPath),
  listingToList(RagingCavalry),
  listingToList(SkyTerror),
  listingToList(GuardiansOfTheWhiteGates),
  listingToList(EndlessMayhem),
  listingToList(WesternPacificationForce),
  listingToList(StrikeForce),
  listingToList(ClutchOfDarkness)
]
