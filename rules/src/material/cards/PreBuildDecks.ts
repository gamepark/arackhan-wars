import { listingToList } from '@gamepark/rules-api'
import { Faction } from '../Faction'
import { FactionCard } from '../FactionCard'
import { BlightPreBuildDeck } from './blight/BlightPreBuildDeck'
import { GreyOrderPreBuildDeck } from './greyorder/GreyOrderPreBuildDeck'
import { NakkaPreBuildDeck } from './nakka/NakkaPreBuildDeck'
import { WhitelandsPreBuildDeck } from './whitelands/WhitelandsPreBuildDeck'

export type DeckListing = Partial<Record<FactionCard, number>>

export const PreBuildDecks: Record<Faction, FactionCard[]> = {
  [Faction.Blight]: listingToList(BlightPreBuildDeck),
  [Faction.GreyOrder]: listingToList(GreyOrderPreBuildDeck),
  [Faction.Nakka]: listingToList(NakkaPreBuildDeck),
  [Faction.Whitelands]: listingToList(WhitelandsPreBuildDeck)
}
