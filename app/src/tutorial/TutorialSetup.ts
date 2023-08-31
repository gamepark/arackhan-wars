import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'

export class TutorialSetup extends ArackhanWarsSetup {
  requiredCards = {
    [Faction.Whitelands]: [FactionCard.LunarWendigo, FactionCard.NihilistPenguin],
    [Faction.Blight]: [FactionCard.ScuttleJaw, FactionCard.SwampOgre]
  }

  setupPlayer(player: number, faction: Faction) {
    super.setupPlayer(player, faction)
    const playerDeck = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player)
    const playerHand = this.material(MaterialType.FactionCard).location(LocationType.Hand).player(player)
    const handCards = playerHand.getItems()
    const requiredCards = this.requiredCards[faction]
    for (const requiredCard of requiredCards) {
      if (!handCards.some(item => item.id.front === requiredCard)) {
        playerHand.filter(item => !requiredCards.includes(item.id.front)).moveItem({ location: { type: LocationType.PlayerDeck } })
        playerDeck.filter(item => item.id.front === requiredCard).moveItem({ location: { type: LocationType.Hand, player } })
      }
    }
  }

  start() {
    this.memorize(Memory.StartPlayer, this.players[0])
    return { id: RuleId.PlacementRule, player: this.game.players[0] }
  }
}