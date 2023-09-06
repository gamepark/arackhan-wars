import { Faction } from '../Faction'
import { BlightPreBuildDeck } from './blight/BlightPreBuildDeck'
import { GreyOrderPreBuildDeck } from './greyorder/GreyOrderPreBuildDeck'
import { NakkaPreBuildDeck } from './nakka/NakkaPreBuildDeck'
import { WhitelandsPreBuildDeck } from './whitelands/WhitelandsPreBuildDeck'
import { FactionCard } from '../FactionCard'

export type DeckListing = Partial<Record<FactionCard, number>>

const arrayFromListing = (listing: DeckListing): FactionCard[] => {
  return Object.entries(listing).reduce<FactionCard[]>((array, [key, quantity]) => {
    const id = parseInt(key)
    for (let i = 0; i < quantity; i++) {
      array.push(id)
    }
    return array
  }, [])
}

export const PreBuildDecks: Record<Faction, FactionCard[]> = {
  [Faction.Blight]: arrayFromListing(BlightPreBuildDeck),
  [Faction.GreyOrder]: arrayFromListing(GreyOrderPreBuildDeck),
  [Faction.Nakka]: arrayFromListing(NakkaPreBuildDeck),
  [Faction.Whitelands]: arrayFromListing(WhitelandsPreBuildDeck)
}
