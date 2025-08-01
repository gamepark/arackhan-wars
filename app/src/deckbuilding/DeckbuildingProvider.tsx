import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { GameProvider } from '@gamepark/react-game'
import { isDeleteItemTypeAtOnce, isMoveItemType } from '@gamepark/rules-api'
import { useEffect } from 'react'
import { arackhanWarsAnimations } from '../animations/ArackhanWarsAnimations'
import { materialI18n } from '../material/Material'
import { theme } from '../theme'
import DeckbuildingApp from './DeckbuildingApp'
import { DeckbuildingHelp } from './DeckbuildingHelp'
import { DeckbuildingLocators } from './DeckbuildingLocators'
import { DeckbuildingMaterial } from './DeckbuildingMaterial'
import { DeckbuildingRules, DeckBuildingSetup } from './DeckbuildingRules'

export const DeckbuildingProvider = () => {
  useEffect(() => {
    arackhanWarsAnimations.when().move((move) => isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.PlayerDeck).duration(0.2)
    arackhanWarsAnimations.when().move((move) => isDeleteItemTypeAtOnce(MaterialType.FactionCard)(move)).duration(0)
  }, [])
  return <GameProvider game="arackhan-wars" storage="arackhan-wars-deckbuilding" GameSetup={DeckBuildingSetup} Rules={DeckbuildingRules}
                       material={DeckbuildingMaterial} locators={DeckbuildingLocators} materialI18n={materialI18n} animations={arackhanWarsAnimations}
                       theme={theme} rulesHelp={{[RuleId.Deckbuilding]: DeckbuildingHelp}}>
    <DeckbuildingApp/>
  </GameProvider>
}
