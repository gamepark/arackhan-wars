import { ArackhanWarsOptionsSpec } from '@gamepark/arackhan-wars/ArackhanWarsOptions.ts'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules.ts'
import { ArackhanWarsSetup } from '@gamepark/arackhan-wars/ArackhanWarsSetup.ts'
import { addStylesheetUrl, GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { arackhanWarsAnimations } from './animations/ArackhanWarsAnimations.ts'
import App from './App'
import { isDeckbuilding } from './deckbuilding/deckbuilding.util.ts'
import { DeckbuildingProvider } from './deckbuilding/DeckbuildingProvider.tsx'
import { ArackhanWarsHistory } from './history/ArackhanWarsHistory.tsx'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import { theme } from './theme.ts'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial.tsx'
import { tutorialAI } from './tutorial/TutorialAI.ts'

setupTranslation(translations, { debug: false })
addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

createRoot(document.getElementById('root')!).render(
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
  </StrictMode>
)
