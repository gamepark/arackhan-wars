import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import {
  Competitive,
  HidingStrategy,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  MaterialRulesPartCreator,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { RuleId } from './rules/RuleId'
import { MulliganRule } from './rules/MulliganRule'
import { locationsStrategies } from './material/LocationStrategies'
import { PlacementRule } from './rules/PlacementRule'
import { RevealRule } from './rules/RevealRule'
import { InitiativeActivationRule } from './rules/InitiativeActivationRule'
import { PlayerId } from './ArackhanWarsOptions'
import { ActivationRule } from './rules/ActivationRule'
import { EndPhaseRules } from './rules/EndPhaseRules'
import { DrawRules } from './rules/DrawRules'
import { ForcedExileActionRule } from './rules/cards/rules/action/ForcedExileActionRule'
import { HorseOfAvalonActionRule } from './rules/cards/rules/action/HorseOfAvalonActionRule'
import { TeleportationActionRule } from './rules/cards/rules/action/TeleportationActionRule'
import { ChooseStartPlayerRule } from './rules/ChooseStartPlayerRule'
import sumBy from 'lodash/sumBy'
import { FactionCardsCharacteristics } from './material/FactionCard'
import { MimicryActionRule } from './rules/cards/rules/action/MimicryActionRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> implements Competitive<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
  TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = rules
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies

  giveTime(): number {
    return 30
  }

  rankPlayers(playerA: PlayerId, playerB: PlayerId): number {
    const scoreA = this.getScore(playerA)
    const scoreB = this.getScore(playerB)
    return scoreB - scoreA
  }

  getScore(playerId: PlayerId): number {
    const cardsOnBattlefield = this
      .material(MaterialType.FactionCard)
      .location(LocationType.Battlefield)
      .player(playerId)
      .getItems()

    return sumBy(cardsOnBattlefield, card => FactionCardsCharacteristics[card.id.front].value)
  }
}

export const hideCardFront: HidingStrategy = () => ['id.front']
export const hideCardFrontToOthers: HidingStrategy = (
  item: MaterialItem<PlayerId, LocationType>, player?: PlayerId
) => item.location.player === player ? [] : ['id.front']

export const hideCardWhenRotated: HidingStrategy = (
  item: MaterialItem<PlayerId, LocationType>, player?: PlayerId
) => {
  if (item.rotation?.y) {
    return item.location.player === player ? [] : ['id.front']
  }

  return []
}

export const rules: Record<RuleId, MaterialRulesPartCreator<PlayerId, MaterialType, LocationType>> = {
  [RuleId.ChooseStartPlayer]: ChooseStartPlayerRule,
  [RuleId.Mulligan]: MulliganRule,
  [RuleId.DrawRule]: DrawRules,
  [RuleId.PlacementRule]: PlacementRule,
  [RuleId.RevealRule]: RevealRule,
  [RuleId.InitiativeActivationRule]: InitiativeActivationRule,
  [RuleId.ActivationRule]: ActivationRule,
  [RuleId.EndPhaseRule]: EndPhaseRules,
  [RuleId.ForcedExileActionRule]: ForcedExileActionRule,
  [RuleId.HorseOfAvalonActionRule]: HorseOfAvalonActionRule,
  [RuleId.TeleportationActionRule]: TeleportationActionRule,
  [RuleId.MimicryActionRule]: MimicryActionRule
}

export const hidingStrategies: Partial<Record<MaterialType, Partial<Record<LocationType, HidingStrategy>>>> = {
  [MaterialType.FactionCard]: {
    [LocationType.PlayerDeck]: hideCardFront,
    [LocationType.Hand]: hideCardFrontToOthers,
    [LocationType.Battlefield]: hideCardWhenRotated,
    [LocationType.AstralPlane]: hideCardWhenRotated
  }
}
