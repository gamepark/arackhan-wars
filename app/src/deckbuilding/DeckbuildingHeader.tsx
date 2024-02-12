import { CardId } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { useSaveDeck } from '@gamepark/react-client'
import { ThemeButton, useRules } from '@gamepark/react-game'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual } from 'react-redux'
import { DeckbuildingRules } from './DeckbuildingRules'

export const DeckbuildingHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const deck = rules?.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems<CardId>().map(item => item.id!.front) ?? []
  const validator = new DeckValidator(deck)
  return <>
    <SaveButton/>
    {' '}
    {validator.isValid ? t('header.deck.valid') : t('header.deck.invalid')}
  </>
}

const SaveButton = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const cards = rules?.material(MaterialType.FactionCard)
    .location(LocationType.PlayerDeck).sort(item => item.location.x!)
    .getItems<CardId>().map(item => item.id!.front)
  const [saveDeck] = useSaveDeck()
  const [storedDeck, setStoredDeck] = useState(() => JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!).deck?.cards)
  const save = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    saveDeck({ variables: { id: storage.deck?.id, boardGame: 'arackhan-wars', name: 'test', cards } }).then(({ data: { saveDeck: deck } }) => {
      storage.deck = deck
      storage.state = rules!.game
      localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
      setStoredDeck(deck.cards)
    })
  }, [saveDeck, rules?.game, cards])
  return <>
    <ThemeButton onClick={save} disabled={shallowEqual(storedDeck, cards)}>{t('deck.save')}</ThemeButton>
  </>
}
