import { ArackhanWarsSetup, START_HAND } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'

export class TutorialSetup extends ArackhanWarsSetup {
  requiredCards = {
    [Faction.Whitelands]: [FactionCard.LunarWendigo, FactionCard.NihilistPenguin, FactionCard.ShieldOfDawn, FactionCard.IceMeteor, FactionCard.FortressOfMyjir],
    [Faction.Blight]: [FactionCard.ScuttleJaw, FactionCard.SwampOgre, FactionCard.ForgePatriarch, FactionCard.SwampTroll]
  }

  setupPlayer(player: number, faction: Faction) {
    this.createPlayerDeck(player, faction)
    const requiredCards = this.requiredCards[faction]
    const playerDeck = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player)
    for (const requiredCard of requiredCards) {
      playerDeck.filter(item => item.id.front === requiredCard).moveItem({ type: LocationType.Hand, player })
    }
    this.shufflePlayerDeck(player)
    this.draw(player, START_HAND - requiredCards.length)
  }

  start() {
    this.memorize(Memory.StartPlayer, this.players[0])
    this.startPlayerTurn(RuleId.PlacementRule, this.game.players[0])
  }
}