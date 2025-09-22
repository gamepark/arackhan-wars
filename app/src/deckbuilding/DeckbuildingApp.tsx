import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import DeckbuildingGameDisplay from './DeckbuildingGameDisplay'
import { DeckbuildingHeader } from './DeckbuildingHeader'
import { DeckbuildingRuleId } from './DeckbuildingRules.ts'
import { LoginDialog } from './LoginDialog'

export default function DeckbuildingApp() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  useEffect(() => {
    if (game && !game.helpDisplay) {
      const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
      storage.setup = game
      storage.state = game
      localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
    }
  }, [game])

  return (
    <>
      <DeckbuildingGameDisplay/>
      <LoadingScreen display={loading} author={['Robert Palmer', 'Mickaël Bour']} artist="Robert Palmer" publisher="Nothing But Games" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={{ [DeckbuildingRuleId]: DeckbuildingHeader }} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
      <LoginDialog/>
    </>
  )
}
