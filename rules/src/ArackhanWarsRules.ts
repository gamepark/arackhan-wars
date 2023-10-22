import {
  CompetitiveScore,
  HidingStrategy,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { PlayerId } from './ArackhanWarsOptions'
import { isCreature } from './material/cards/Creature'
import { isSpell } from './material/cards/Spell'
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
import { ChooseStartPlayerRule } from './rules/ChooseStartPlayerRule'
import { DrawRules } from './rules/DrawRules'
import { EndPhaseRules } from './rules/EndPhaseRules'
import { MulliganRule } from './rules/MulliganRule'
import { SolvePerforationsRule } from './rules/SolvePerforationsRule'
import { PlacementRule } from './rules/PlacementRule'
import { RevealRule } from './rules/RevealRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {

  rules = {
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
      [LocationType.Hand]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.PlayerDeck]: hideCardFront,
      [LocationType.Hand]: hideCardFrontToOthers,
      [LocationType.Battlefield]: hideCardWhenRotated,
      [LocationType.AstralPlane]: hideCardWhenRotated
    }
  }

  giveTime(): number {
    return 60
  }

  play(move: any) {
    resetCardsRulesCache()
    return super.play(move)
  }

  getScore(playerId: PlayerId) {
    const cardsOnBattlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .player(playerId).id<{ front?: FactionCard, back: Faction }>(id => id?.front !== undefined).getItems()
    return sumBy(cardsOnBattlefield, card => {
      const characteristics = FactionCardsCharacteristics[card.id.front as FactionCard]
      return isSpell(characteristics) ? 0 : characteristics.value
    })
  }

  getTieBreaker(tieBreaker: number, playerId: PlayerId) {
    if (tieBreaker === 1) {
      return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(playerId).length
    } else if (tieBreaker === 2) {
      return -this.material(MaterialType.FactionCard).location(LocationType.PlayerDiscard).player(playerId)
        .filter((_, index) => isCreature(getCardRule(this.game, index).characteristics)).length
    }
    return
  }

  get round() {
    return this.material(MaterialType.RoundTrackerToken).getItem()!.location.x!
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



