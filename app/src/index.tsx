/** @jsxImportSource @emotion/react */
import { ArackhanWarsOptionsSpec } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { addStylesheetUrl, GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { arackhanWarsAnimations } from './animations/ArackhanWarsAnimations'
import App from './App'
import { isDeckbuilding } from './deckbuilding/deckbuilding.util'
import { DeckbuildingProvider } from './deckbuilding/DeckbuildingProvider'
import { ArackhanWarsHistory } from './history/ArackhanWarsHistory'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import { theme } from './theme'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'
import { tutorialAI } from './tutorial/TutorialAI'

setupTranslation(translations, { debug: false })
addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

ReactDOM.render(
  <StrictMode>
    {isDeckbuilding ?
      <DeckbuildingProvider/>
      :
      <GameProvider game="arackhan-wars" GameSetup={ArackhanWarsSetup} Rules={ArackhanWarsRules} optionsSpec={ArackhanWarsOptionsSpec}
                    material={Material} locators={Locators} materialI18n={materialI18n} animations={arackhanWarsAnimations}
                    tutorial={new Tutorial()} ai={window.Worker ? tutorialAI : undefined} version={2}
                    logs={new ArackhanWarsHistory()}
                    theme={theme}>
        <App/>
      </GameProvider>
    }
  </StrictMode>,
  document.getElementById('root')
)
