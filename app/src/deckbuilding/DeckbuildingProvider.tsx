import { ArackhanWarsOptionsSpec } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { GameProvider, MaterialGameAnimations } from '@gamepark/react-game'
import { materialI18n } from '../material/Material'
import { theme } from '../theme'
import DeckbuildingApp from './DeckbuildingApp'
import { DeckbuildingLocators } from './DeckbuildingLocators'
import { DeckbuildingMaterial } from './DeckbuildingMaterial'

export const DeckbuildingProvider = () => {
  return <GameProvider game="arackhan-wars-deckbuilding" GameSetup={ArackhanWarsSetup} Rules={ArackhanWarsRules} optionsSpec={ArackhanWarsOptionsSpec}
                       material={DeckbuildingMaterial} locators={DeckbuildingLocators} materialI18n={materialI18n} animations={new MaterialGameAnimations()}
                       theme={theme}>
    <DeckbuildingApp/>
  </GameProvider>
}
