/** @jsxImportSource @emotion/react */
import { ArackhanWarsOptionsSpec } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { addStylesheetUrl, GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { Material, materialI18n } from './material/Material'
import { Locators } from './locators/Locators'
import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { Tutorial } from './tutorial/Tutorial'
import { tutorialAI } from './tutorial/TutorialAI'
import background from './images/background.jpg'

setupTranslation(translations, { debug: false })
addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

ReactDOM.render(
  <StrictMode>
    <GameProvider game="arackhan-wars" GameSetup={ArackhanWarsSetup} Rules={ArackhanWarsRules} optionsSpec={ArackhanWarsOptionsSpec}
                  material={Material} locators={Locators} materialI18n={materialI18n} animations={new MaterialGameAnimations()}
                  tutorial={new Tutorial()} ai={window.Worker ? tutorialAI : undefined}
                  theme={{
                    root: {
                      background: {
                        image: background,
                        overlay: 'rgba(0, 0, 0, 0.3)'
                      }
                    },
                    dialog: {
                      color: '#6B4135',
                      backgroundColor: '#FEF9F5'
                    }
                  }}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
