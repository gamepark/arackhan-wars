import {
  CompetitiveScore,
  hideFront,
  hideFrontToOthers,
  HidingStrategy,
  isCustomMove,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  MaterialMoveRandomized,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { isCreature } from './material/cards/Creature'
import { isSpell } from './material/cards/Spell'
import { CustomMoveType } from './material/CustomMoveType'
import { Faction } from './material/Faction'
import { FactionCard, FactionCardsCharacteristics } from './material/FactionCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ForcedExileActionRule } from './rules/action/ForcedExileActionRule'
import { HorseOfAvalonActionRule } from './rules/action/HorseOfAvalonActionRule'
import { MimicryActionRule } from './rules/action/MimicryActionRule'
import { TeleportationActionRule } from './rules/action/TeleportationActionRule'
import { ActivationRule } from './rules/ActivationRule'
import { getCardRule, resetCardsRulesCache } from './rules/CardRule'
import { ChooseDeckRule } from './rules/ChooseDeckRule'
import { ChooseFactionRule } from './rules/ChooseFactionRule'
import { ChooseStartPlayerRule } from './rules/ChooseStartPlayerRule'
import { DrawRules } from './rules/DrawRules'
import { EndPhaseRules } from './rules/EndPhaseRules'
import { Memory } from './rules/Memory'
import { MulliganRule } from './rules/MulliganRule'
import { PlacementRule } from './rules/PlacementRule'
import { RevealRule } from './rules/RevealRule'
import { RuleId } from './rules/RuleId'
import { SolvePerforationsRule } from './rules/SolvePerforationsRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsRules extends SecretMaterialRules<number, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number>,
    TimeLimit<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number> {

  rules = {
    [RuleId.ChooseFaction]: ChooseFactionRule,
    [RuleId.ChooseDeck]: ChooseDeckRule,
    [RuleId.ChooseStartPlayer]: ChooseStartPlayerRule,
    [RuleId.Mulligan]: MulliganRule,
    [RuleId.DrawRule]: DrawRules,
    [RuleId.PlacementRule]: PlacementRule,
    [RuleId.RevealRule]: RevealRule,
    [RuleId.ActivationRule]: ActivationRule,
    [RuleId.SolvePerforations]: SolvePerforationsRule,
    [RuleId.EndPhaseRule]: EndPhaseRules,
    [RuleId.ForcedExileActionRule]: ForcedExileActionRule,
    [RuleId.HorseOfAvalonActionRule]: HorseOfAvalonActionRule,
    [RuleId.TeleportationActionRule]: TeleportationActionRule,
    [RuleId.MimicryActionRule]: MimicryActionRule
  }

  locationsStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.PlayerDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerDiscard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.PlayerDeck]: hideFront,
      [LocationType.PlayerHand]: hideFrontToOthers,
      [LocationType.Battlefield]: hideRotatedCardToOthers,
      [LocationType.AstralPlane]: hideRotatedCardToOthers
    }
  }

  giveTime() {
    return 60
  }

  play(move: any) {
    resetCardsRulesCache()
    return super.play(move)
  }

  getView(player?: number): MaterialGame {
    const view = super.getView(player)
    if (this.game.rule?.id === RuleId.ChooseFaction && Memory.PlayerFaction in view.memory) {
      const { [Memory.PlayerFaction]: playerFactionMemory, ...memory } = view.memory
      if (player !== undefined && player in playerFactionMemory) {
        const factionMemory = { [player]: view.memory[Memory.PlayerFaction][player] }
        return { ...view, memory: { ...memory, [Memory.PlayerFaction]: factionMemory } }
      } else {
        return { ...view, memory }
      }
    }
    return view
  }

  getScore(player: number) {
    const cardsOnBattlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .player(player).id<{ front?: FactionCard, back: Faction }>(id => id?.front !== undefined).getItems()
    return sumBy(cardsOnBattlefield, card => {
      const characteristics = FactionCardsCharacteristics[card.id.front as FactionCard]
      return isSpell(characteristics) ? 0 : characteristics.value
    })
  }

  getTieBreaker(tieBreaker: number, player: number) {
    if (tieBreaker === 1) {
      return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(player).length
    } else if (tieBreaker === 2) {
      return -this.material(MaterialType.FactionCard).location(LocationType.PlayerDiscard).player(player)
        .filter((_, index) => isCreature(getCardRule(this.game, index).characteristics)).length
    }
    return
  }

  get round() {
    return this.material(MaterialType.RoundTrackerToken).getItem()?.location.x ?? 0
  }

  getMoveView(move: MaterialMoveRandomized, player?: number) {
    if (isCustomMove(move) && move.type === CustomMoveType.ChooseFaction && move.data.player !== player) {
      return { ...move, data: { player: move.data.player } } // Hide chosen faction
    } else {
      return super.getMoveView(move, player)
    }
  }

  keepMoveSecret() {
    return false // TODO: keep choose deck secret during ChooseDeckRule
  }
}

export const hideRotatedCardToOthers: HidingStrategy = (item: MaterialItem<number, LocationType>, player?: number) =>
  item.location.rotation && item.location.player !== player ? ['id.front'] : []



