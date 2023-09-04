import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import {
  CompetitiveScore,
  HidingStrategy,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  MaterialRulesPartCreator,
  rankByScore,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { RuleId } from './rules/RuleId'
import { MulliganRule } from './rules/MulliganRule'
import { locationsStrategies } from './material/LocationStrategies'
import { PlacementRule } from './rules/PlacementRule'
import { RevealRule } from './rules/RevealRule'
import { PlayerId } from './ArackhanWarsOptions'
import { ActivationRule } from './rules/ActivationRule'
import { EndPhaseRules } from './rules/EndPhaseRules'
import { DrawRules } from './rules/DrawRules'
import { ForcedExileActionRule } from './rules/action/ForcedExileActionRule'
import { HorseOfAvalonActionRule } from './rules/action/HorseOfAvalonActionRule'
import { TeleportationActionRule } from './rules/action/TeleportationActionRule'
import { ChooseStartPlayerRule } from './rules/ChooseStartPlayerRule'
import sumBy from 'lodash/sumBy'
import { FactionCard, FactionCardsCharacteristics } from './material/FactionCard'
import { MimicryActionRule } from './rules/action/MimicryActionRule'
import { isCreature } from './material/cards/Creature'
import { getCardRule, resetCardsRulesCache } from './rules/CardRule'
import { Faction } from './material/Faction'
import { isSpell } from './material/cards/Spell'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = rules
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies
  materialLocations = {
    [MaterialType.BattleMat]: [LocationType.PlayerDeck, LocationType.Battlefield, LocationType.AstralPlane, LocationType.PlayerDiscard],
    [MaterialType.RoundTracker]: [LocationType.RoundTracker],
    [MaterialType.FactionCard]: [LocationType.FactionCard, LocationType.FactionTokenSpace]
  }

  giveTime(): number {
    return 60
  }

  play(move: any) {
    resetCardsRulesCache()
    return super.play(move)
  }

  rankPlayers(playerA: PlayerId, playerB: PlayerId): number {
    return rankByScore(playerA, playerB, this.getScore.bind(this))
  }

  getScore(playerId: PlayerId, tieBreaker = 0) {
    switch (tieBreaker) {
      case 0:
        const cardsOnBattlefield = this
          .material(MaterialType.FactionCard)
          .location(LocationType.Battlefield)
          .player(playerId)
          .id<{ front?: FactionCard, back: Faction }>(id => id?.front !== undefined)
          .getItems()
        return sumBy(cardsOnBattlefield, card => {
          const characteristics = FactionCardsCharacteristics[card.id.front as FactionCard]
          return isSpell(characteristics) ? 0 : characteristics.value
        })
      case 1:
        return this
          .material(MaterialType.FactionCard)
          .location(LocationType.Battlefield)
          .player(playerId)
          .length
      case 2:
        return -this
          .material(MaterialType.FactionCard)
          .location(LocationType.PlayerDiscard)
          .player(playerId)
          .filter((_, index) => isCreature(getCardRule(this.game, index).characteristics))
          .length
    }
    return
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
