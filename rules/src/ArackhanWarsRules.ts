import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { HidingStrategy, MaterialItem, MaterialRulesPartCreator, SecretMaterialRules } from '@gamepark/rules-api'
import { RuleId } from './rules/RuleId'
import { StartRule } from './rules/StartRule'
import { locationsStrategies } from './material/LocationStrategies'
import { PlacementRule } from './rules/PlacementRule'
import { RevealRule } from './rules/RevealRule'
import { InitiativeActivationRule } from './rules/InitiativeActivationRule'
import { PlayerId } from './ArackhanWarsOptions'
import { ActivationRule } from './rules/ActivationRule'
import { EndPhaseRules } from './rules/EndPhaseRules'
import { DrawRules } from './rules/DrawRules'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {
  rules = rules
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies

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

const rules: Record<RuleId, MaterialRulesPartCreator<PlayerId, MaterialType, LocationType>> = {
  [RuleId.StartRule]: StartRule,
  [RuleId.DrawRule]: DrawRules,
  [RuleId.PlacementRule]: PlacementRule,
  [RuleId.RevealRule]: RevealRule,
  [RuleId.InitiativeActivationRule]: InitiativeActivationRule,
  [RuleId.ActivationRule]: ActivationRule,
  [RuleId.EndPhaseRule]: EndPhaseRules
}

const hidingStrategies: Partial<Record<MaterialType, Partial<Record<LocationType, HidingStrategy>>>> = {
  [MaterialType.FactionCard]: {
    [LocationType.PlayerDeck]: hideCardFront,
    [LocationType.Hand]: hideCardFrontToOthers,
    [LocationType.Battlefield]: hideCardWhenRotated,
    [LocationType.AstralPlane]: hideCardWhenRotated
  }
}
