import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { GameProvider, MaterialGameAnimations } from '@gamepark/react-game'
import { materialI18n } from '../material/Material'
import { theme } from '../theme'
import DeckbuildingApp from './DeckbuildingApp'
import { DeckbuildingHelp } from './DeckbuildingHelp'
import { DeckbuildingLocators } from './DeckbuildingLocators'
import { DeckbuildingMaterial } from './DeckbuildingMaterial'
import { DeckbuildingRules, DeckBuildingSetup } from './DeckbuildingRules'

export const DeckbuildingProvider = () => {
  return <GameProvider game="arackhan-wars" storage="arackhan-wars-deckbuilding" GameSetup={DeckBuildingSetup} Rules={DeckbuildingRules}
                       material={DeckbuildingMaterial} locators={DeckbuildingLocators} materialI18n={materialI18n} animations={new MaterialGameAnimations()}
                       theme={theme} rulesHelp={{[RuleId.Deckbuilding]: DeckbuildingHelp}}>
    <DeckbuildingApp/>
  </GameProvider>
}
