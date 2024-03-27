import {
  CompetitiveScore,
  hideFront,
  hideFrontToOthers,
  HidingStrategy,
  isCustomMoveType,
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
import { CustomMoveType } from './material/CustomMoveType'
import { Faction } from './material/Faction'
import { FactionCard } from './material/FactionCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { AncestralLibraryActionRule } from './rules/action/AncestralLibraryActionRule'
import { ArmouredConvoyActionRule } from './rules/action/ArmouredConvoyActionRule'
import { AssassinActionRule } from './rules/action/AssassinActionRule'
import { BackupActionRule } from './rules/action/BackupActionRule'
import { CoriolisWindActionRule } from './rules/action/CoriolisWindActionRule'
import { DiscardEnemySpellActionRule } from './rules/action/DiscardEnemySpellActionRule'
import { EssenceAbsorptionActionRule } from './rules/action/EssenceAbsorptionActionRule'
import { ForcedExileActionRule } from './rules/action/ForcedExileActionRule'
import { IceElementalActionRule } from './rules/action/IceElementalActionRule'
import { IceWingsActionRule } from './rules/action/IceWingsActionRule'
import { MarchingOrderActionRule } from './rules/action/MarchingOrderActionRule'
import { MimicryActionRule } from './rules/action/MimicryActionRule'
import { MusicalTranceActionRule } from './rules/action/MusicalTranceActionRule'
import { NemesioBlightActionRule } from './rules/action/NemesioBlightActionRule'
import { NemesioGreyOrderActionRule } from './rules/action/NemesioGreyOrderActionRule'
import { NemesioNakkaActionRule } from './rules/action/NemesioNakkaActionRule'
import { NemesioWhitelandsActionRule } from './rules/action/NemesioWhitelandsActionRule'
import { NoviceFairyActionRule } from './rules/action/NoviceFairyActionRule'
import { OnLeaveActionRule } from './rules/action/OnLeaveActionRule'
import { PossessionActionRule } from './rules/action/PossessionActionRule'
import { ProtectorActionRule } from './rules/action/ProtectorActionRule'
import { ReplaceWithCreatureActionRule } from './rules/action/ReplaceWithCreatureActionRule'
import { StandardBearerActionRule } from './rules/action/StandardBearerActionRule'
import { TeleportationActionRule } from './rules/action/TeleportationActionRule'
import { TheGreyOrderRisesActionRule } from './rules/action/TheGreyOrderRisesActionRule'
import { TheWhiteGatesActionRule } from './rules/action/TheWhiteGatesActionRule'
import { TomurDiscActionRule } from './rules/action/TomurDiscActionRule'
import { WarpPathActionRule } from './rules/action/WarpPathActionRule'
import { ActivationRule } from './rules/ActivationRule'
import { getCardRule, resetCardsRulesCache } from './rules/CardRule'
import { ChooseDeckRule } from './rules/ChooseDeckRule'
import { ChooseFactionRule } from './rules/ChooseFactionRule'
import { ChooseStartPlayerRule } from './rules/ChooseStartPlayerRule'
import { DrawRules } from './rules/DrawRules'
import { EndOfRoundRules } from './rules/EndOfRoundRules'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
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
    [RuleId.EndOfRoundRule]: EndOfRoundRules,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.ForcedExileActionRule]: ForcedExileActionRule,
    [RuleId.HorseOfAvalonActionRule]: ReplaceWithCreatureActionRule,
    [RuleId.TeleportationActionRule]: TeleportationActionRule,
    [RuleId.MimicryActionRule]: MimicryActionRule,
    [RuleId.AdrielleAction]: ReplaceWithCreatureActionRule,
    [RuleId.IceElementalAction]: IceElementalActionRule,
    [RuleId.NemesioWhitelandsAction]: NemesioWhitelandsActionRule,
    [RuleId.NoviceFairyAction]: NoviceFairyActionRule,
    [RuleId.AncestralLibraryAction]: AncestralLibraryActionRule,
    [RuleId.TheWhiteGatesAction]: TheWhiteGatesActionRule,
    [RuleId.CoriolisWindAction]: CoriolisWindActionRule,
    [RuleId.DiscardEnemySpellAction]: DiscardEnemySpellActionRule,
    [RuleId.IceWingsAction]: IceWingsActionRule,
    [RuleId.NemesioNakkaAction]: NemesioNakkaActionRule,
    [RuleId.ProtectorAction]: ProtectorActionRule,
    [RuleId.MusicalTranceAction]: MusicalTranceActionRule,
    [RuleId.WarpPathAction]: WarpPathActionRule,
    [RuleId.AssassinAction]: AssassinActionRule,
    [RuleId.NemesioGreyOrderAction]: NemesioGreyOrderActionRule,
    [RuleId.StandardBearerAction]: StandardBearerActionRule,
    [RuleId.TomurDiscAction]: TomurDiscActionRule,
    [RuleId.ArmouredConvoyAction]: ArmouredConvoyActionRule,
    [RuleId.BackupAction]: BackupActionRule,
    [RuleId.MarchingOrderAction]: MarchingOrderActionRule,
    [RuleId.OnLeaveAction]: OnLeaveActionRule,
    [RuleId.TheGreyOrderRisesAction]: TheGreyOrderRisesActionRule,
    [RuleId.NemesioBlightAction]: NemesioBlightActionRule,
    [RuleId.EssenceAbsorptionAction]: EssenceAbsorptionActionRule,
    [RuleId.PossessionAction]: PossessionActionRule
  }

  locationsStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.PlayerDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerDiscard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.UnderCard]: new PositiveSequenceStrategy()
    },
    [MaterialType.FactionToken]: {
      [LocationType.FactionCard]: new PositiveSequenceStrategy()
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
    const consequences = super.play(move)
    resetCardsRulesCache()
    return consequences
  }

  getView(player?: number): MaterialGame {
    const view = super.getView(player)
    if ((this.game.rule?.id === RuleId.ChooseFaction || this.game.rule?.id === RuleId.ChooseDeck) && Memory.PlayerDeck in view.memory) {
      const { [Memory.PlayerDeck]: playerDeckMemory, ...memory } = view.memory
      if (player !== undefined && player in playerDeckMemory) {
        const factionMemory = { [player]: view.memory[Memory.PlayerDeck][player] }
        return { ...view, memory: { ...memory, [Memory.PlayerDeck]: factionMemory } }
      } else {
        return { ...view, memory }
      }
    }
    return view
  }

  getScore(player: number) {
    return sumBy(this.material(MaterialType.FactionCard)
        .location(LocationType.Battlefield)
        .player(player)
        .id<{ front?: FactionCard, back: Faction }>(id => id?.front !== undefined)
        .getIndexes(),
      index => getCardRule(this.game, index).score
    )
  }

  getTieBreaker(tieBreaker: number, player: number) {
    if (tieBreaker === 1) {
      return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(player).length
    } else if (tieBreaker === 2) {
      return -this.material(MaterialType.FactionCard).location(LocationType.PlayerDiscard).player(player)
        .index(index => isCreature(getCardRule(this.game, index).characteristics)).length
    }
    return
  }

  get round() {
    return this.material(MaterialType.RoundTrackerToken).getItem()?.location.x ?? 0
  }

  getMoveView(move: MaterialMoveRandomized, player?: number) {
    if (isCustomMoveType(CustomMoveType.ChooseFaction)(move) && move.data.player !== player) {
      return { ...move, data: { player: move.data.player } } // Hide chosen faction
    } else if (isCustomMoveType(CustomMoveType.ChooseDeck)(move) && move.data.player !== player) {
      return { ...move, data: { player: move.data.player } } // Hide chosen deck
    } else {
      return super.getMoveView(move, player)
    }
  }
}

export const hideRotatedCardToOthers: HidingStrategy = (item: MaterialItem<number, LocationType>, player?: number) =>
  item.location.rotation && item.location.player !== player ? ['id.front'] : []



