/** @jsxImportSource @emotion/react */
import { ArackhanWarsOptionsSpec } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { addStylesheetUrl, GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ArackhanWarsAnimations } from './animations/ArackhanWarsAnimations'
import App from './App'
import background from './images/background.jpg'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'
import { tutorialAI } from './tutorial/TutorialAI'

setupTranslation(translations, { debug: false })
addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

ReactDOM.render(
  <StrictMode>
    <GameProvider game="arackhan-wars" GameSetup={ArackhanWarsSetup} Rules={ArackhanWarsRules} optionsSpec={ArackhanWarsOptionsSpec}
                  material={Material} locators={Locators} materialI18n={materialI18n} animations={new ArackhanWarsAnimations()}
                  tutorial={new Tutorial()} ai={window.Worker ? tutorialAI : undefined} version={2}
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
