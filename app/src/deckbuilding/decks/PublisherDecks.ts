import { BlightPreBuildDeck } from '@gamepark/arackhan-wars/material/cards/blight/BlightPreBuildDeck'
import { GreyOrderPreBuildDeck } from '@gamepark/arackhan-wars/material/cards/greyorder/GreyOrderPreBuildDeck'
import { NakkaPreBuildDeck } from '@gamepark/arackhan-wars/material/cards/nakka/NakkaPreBuildDeck'
import { WhitelandsPreBuildDeck } from '@gamepark/arackhan-wars/material/cards/whitelands/WhitelandsPreBuildDeck'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { listingToList } from '@gamepark/rules-api'
import { LightningStrike } from './LightningStrike'
import { RiseOfTheTitan } from './RiseOfTheTitan'
import { ThePowerOfIce } from './ThePowerOfIce'
import { UnstableMayhem } from './UnstableMayhem'

export const publisherDecks: FactionCard[][] = [
  listingToList(WhitelandsPreBuildDeck),
  listingToList(NakkaPreBuildDeck),
  listingToList(GreyOrderPreBuildDeck),
  listingToList(BlightPreBuildDeck),
  listingToList(ThePowerOfIce),
  listingToList(LightningStrike),
  listingToList(RiseOfTheTitan),
  listingToList(UnstableMayhem)
]
