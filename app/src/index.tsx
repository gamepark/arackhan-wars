/** @jsxImportSource @emotion/react */
import { ArackhanWarsOptionsSpec } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { Material, materialI18n } from './material/Material'
import { Locators } from './locators/Locators'
import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { Tutorial } from './tutorial/Tutorial'
import { tutorialAI } from './tutorial/TutorialAI.worker'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="arackhan-wars" GameSetup={ArackhanWarsSetup} Rules={ArackhanWarsRules} optionsSpec={ArackhanWarsOptionsSpec}
                  material={Material} locators={Locators} materialI18n={materialI18n} animations={new MaterialGameAnimations()}
                  tutorial={new Tutorial()} ai={tutorialAI}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
