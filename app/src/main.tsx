import { ArackhanWarsOptionsSpec } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup'
import { addStylesheetUrl, GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import background from './images/background.jpg'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import { Tutorial } from './tutorial/Tutorial'
import { tutorialAI } from './tutorial/TutorialAI'

addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="arackhan-wars"
      Rules={ArackhanWarsRules}
      optionsSpec={ArackhanWarsOptionsSpec}
      GameSetup={ArackhanWarsSetup}
      material={Material}
      materialI18n={materialI18n}
      locators={Locators}
      animations={gameAnimations}
      tutorial={new Tutorial()}
      ai={window.Worker ? tutorialAI : undefined}
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
      }}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
