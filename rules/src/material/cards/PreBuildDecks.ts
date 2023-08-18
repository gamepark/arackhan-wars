import { Faction } from '../Faction'
import { BlightPreBuildDeck } from './blight/BlightPreBuildDeck'
import { GreyOrderPreBuildDeck } from './greyorder/GreyOrderPreBuildDeck'
import { NakkaPreBuildDeck } from './nakka/NakkaPreBuildDeck'
import { WhitelandsPreBuildDeck } from './whitelands/WhitelandsPreBuildDeck'
import { FactionCard } from '../FactionCard'

export type DeckListing = Partial<Record<FactionCard, number>>

export const PreBuildDecks: Record<Faction, DeckListing> = {
  [Faction.Blight]: BlightPreBuildDeck,
  [Faction.GreyOrder]: GreyOrderPreBuildDeck,
  [Faction.Nakka]: NakkaPreBuildDeck,
  [Faction.Whitelands]: WhitelandsPreBuildDeck
}