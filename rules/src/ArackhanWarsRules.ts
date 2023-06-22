import { Faction } from './Faction'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { HidingStrategy, MaterialItem, MaterialRulesPartCreator, SecretMaterialRules } from '@gamepark/rules-api'
import { RuleId } from './rules/RuleId'
import { PlayerTurn } from './rules/PlayerTurn'
import { locationsStrategies } from './material/LocationStrategies'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsRules extends SecretMaterialRules<Faction, MaterialType, LocationType> {
  rules = rules
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies

}

export const hideCardFront: HidingStrategy = () => ['id.front']
export const hideCardFrontToOthers: HidingStrategy = (
  item: MaterialItem<Faction, LocationType>, player?: Faction
) => item.location.player === player ? [] : ['id.front']

export const hideCardInBattleField: HidingStrategy = (
  item: MaterialItem<Faction, LocationType>, player?: Faction
) => {
  if (item.rotation?.y) {
    return item.location.player === player ? [] : ['id.front']
  }

  return []
}

const rules: Record<number, MaterialRulesPartCreator<Faction, MaterialType, LocationType>> = {
  [RuleId.PlayerTurn]: PlayerTurn
}

const hidingStrategies = {
  [MaterialType.FactionCard]: {
    [LocationType.PlayerDeck]: hideCardFront,
    [LocationType.Hand]: hideCardFrontToOthers,
    [LocationType.Space]: hideCardInBattleField
  }
}
