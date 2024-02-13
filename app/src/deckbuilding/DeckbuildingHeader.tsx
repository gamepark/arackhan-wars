/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { CardId, FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { Deck, useMyDecks, useSaveDeck } from '@gamepark/react-client'
import { RulesDialog, ThemeButton, usePlay, useRules } from '@gamepark/react-game'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual } from 'react-redux'
import { cardToItem, DeckbuildingRules } from './DeckbuildingRules'
import { publisherDecks } from './decks/PublisherDecks'

export const DeckbuildingHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const deck = rules?.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems<CardId>().map(item => item.id!.front) ?? []
  const validator = new DeckValidator(deck)
  return <>
    <DeckListButton/>
    {' '}
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
      localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
      setStoredDeck(deck.cards)
    })
  }, [saveDeck, rules?.game, cards])
  return <>
    <ThemeButton onClick={save} disabled={shallowEqual(storedDeck, cards)}>{t('deck.save')}</ThemeButton>
  </>
}

const DeckListButton = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  const [open, setOpen] = useState(false)
  const openNewDeck = useCallback((cards: FactionCard[]) => {
    play(rules!.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).deleteItemsAtOnce())
    play(rules!.material(MaterialType.FactionCard).createItemsAtOnce(cards.map((card, x) => cardToItem(card, { type: LocationType.PlayerDeck, x }))))
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    storage.deck = { cards }
    localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
    setOpen(false)
  }, [rules])
  const { data } = useMyDecks('arackhan-wars')
  if (data === undefined) return null // TODO handle no connexion to server
  const decks: Deck[] = data.myDecks
  return <>
    <ThemeButton onClick={() => setOpen(true)}>{t('deck.list')}</ThemeButton>
    <RulesDialog open={open} close={() => setOpen(false)}>
      <div css={decksCss}>
        <h2>{t('deck.list')}</h2>
        <ul css={deckList}>
          {decks.map((deck, i) =>
            <li key={i}>
              <h3 css={deckNameCss(getFaction(deck.cards))}>{deck.name}</h3>
            </li>
          )}
          <hr/>
          {publisherDecks.map((cards, i) =>
            <li key={i}>
              <h3 css={deckNameCss(FactionCardsCharacteristics[cards[0]].faction)}>{t(`deck.${i}`)}</h3>
              <div>
                <FontAwesomeIcon css={iconButton} icon={faEye} onClick={() => openNewDeck(cards)}/>
              </div>
            </li>
          )}
        </ul>
      </div>
    </RulesDialog>
  </>
}

const decksCss = css`
  font-size: 3em;
  padding: 0 1em;

  > h2 {
    margin-right: 1em;
  }
`

const deckList = css`
  list-style: none;
  padding: 0;
  margin-bottom: 1em;

  > li {
    margin-top: 0.2em;
    display: flex;
    justify-content: space-between;
  }
`

const deckNameCss = (faction?: Faction) => css`
  margin: 0 1em 0 0;
  font-size: 1em;
  font-weight: normal;
  color: ${faction ? factionColor[faction] : '#6B4135'}
`

const factionColor: Record<Faction, string> = {
  [Faction.Whitelands]: '#0063af',
  [Faction.Nakka]: '#015426',
  [Faction.GreyOrder]: '#454746',
  [Faction.Blight]: '#e4122d'
}

const getFaction = (cards: FactionCard[]) => {
  if (!cards.length) return
  const faction = FactionCardsCharacteristics[cards[0]].faction
  if (cards.some(card => faction !== FactionCardsCharacteristics[card].faction)) return undefined
  return faction
}

const iconButton = css`
  cursor: pointer;
`
