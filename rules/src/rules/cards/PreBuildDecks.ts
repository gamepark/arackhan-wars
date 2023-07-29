import { Faction } from '../../Faction'
import { BlightPreBuildDeck } from './descriptions/blight/BlightPreBuildDeck'
import { GreyOrderPreBuildDeck } from './descriptions/grayorder/GreyOrderPreBuildDeck'
import { NakkaPreBuildDeck } from './descriptions/nakka/NakkaPreBuildDeck'
import { WhitelandsPreBuildDeck } from './descriptions/whitelands/WhitelandsPreBuildDeck'
import { FactionCard } from '../../material/FactionCard'

export type DeckListing = Partial<Record<FactionCard, number>>

export const PreBuildDecks: Record<Faction, DeckListing> = {
  [Faction.Blight]: BlightPreBuildDeck,
  [Faction.GrayOrder]: GreyOrderPreBuildDeck,
  [Faction.Nakka]: NakkaPreBuildDeck,
  [Faction.Whitelands]: WhitelandsPreBuildDeck
}