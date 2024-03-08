import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { PreBuildDecks } from '@gamepark/arackhan-wars/material/cards/PreBuildDecks'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { FactionToken } from '@gamepark/arackhan-wars/material/FactionToken'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { START_HAND } from '@gamepark/arackhan-wars/rules/MulliganRule'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'

export class TutorialSetup extends ArackhanWarsSetup {
  requiredCards = {
    [Faction.Whitelands]: [FactionCard.LunarWendigo, FactionCard.NihilistPenguin, FactionCard.ShieldOfDawn, FactionCard.IceMeteor, FactionCard.FortressOfMyjir],
    [Faction.Blight]: [FactionCard.ScuttleJaw, FactionCard.SwampOgre, FactionCard.ForgePatriarch, FactionCard.SwampTroll]
  }

  setupMaterial() {
    this.setupPlayer(1, Faction.Whitelands)
    this.setupPlayer(2, Faction.Blight)
    this.placeRoundTracker()
  }

  setupPlayer(player: number, faction: Faction) {
    this.memorize(Memory.PlayerFactionToken, faction, player)
    this.createPlayerDeck(player, faction)
    const requiredCards = this.requiredCards[faction]
    const playerDeck = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player)
    for (const requiredCard of requiredCards) {
      playerDeck.filter(item => item.id.front === requiredCard).moveItem({ type: LocationType.PlayerHand, player })
    }
    this.shufflePlayerDeck(player)
    this.draw(player, START_HAND - requiredCards.length)
  }

  createPlayerDeck(player: number, faction: Faction) {
    this.material(MaterialType.FactionCard).createItems(
      PreBuildDecks[faction].map(card => ({ id: { front: card, back: faction }, location: { type: LocationType.PlayerDeck, player } }))
    )
  }

  shufflePlayerDeck(player: number) {
    this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player).shuffle()
  }

  draw(player: number, quantity = START_HAND) {
    this.material(MaterialType.FactionCard)
      .location(LocationType.PlayerDeck)
      .player(player)
      .deck()
      .deal({ type: LocationType.PlayerHand, player }, quantity)
  }

  placeRoundTracker() {
    this.material(MaterialType.RoundTrackerToken)
      .createItem({ id: { front: FactionToken.Whitelands, back: FactionToken.Blight }, location: { type: LocationType.RoundTracker, x: 1 } })
  }

  start() {
    this.memorize(Memory.RoundEffects, [])
    this.memorize(Memory.OncePerRound, [])
    this.memorize(Memory.StartPlayer, this.players[0])
    this.startPlayerTurn(RuleId.PlacementRule, this.game.players[0])
  }
}