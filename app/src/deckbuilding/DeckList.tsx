/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Deck, useDeleteDeck, useMyDecks } from '@gamepark/react-client'
import { RulesDialog, ThemeButton, usePlay, useRules } from '@gamepark/react-game'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cardToItem, DeckbuildingRules } from './DeckbuildingRules'
import { publisherDecks } from './decks/PublisherDecks'

export const DeckList = ({ close }: { close: () => void }) => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  const [deleteDeck] = useDeleteDeck()
  const [deckToDelete, setDeckToDelete] = useState<Deck>()

  const openDeck = useCallback((deck: Deck) => {
    play(rules!.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).deleteItemsAtOnce())
    play(rules!.material(MaterialType.FactionCard).createItemsAtOnce(deck.cards.map((card, x) => cardToItem(card, { type: LocationType.PlayerDeck, x }))))
    play(rules!.rename(deck.name))
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    storage.deck = deck
    localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
    close()
  }, [rules])

  const deleteAndCloseDeck = useCallback(() => {
    deleteDeck({ variables: { id: deckToDelete!.id } })
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    if (storage.deck?.id === deckToDelete!.id) {
      delete storage.deck.id
      localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
    }
    setDeckToDelete(undefined)
  }, [deckToDelete])

  const { data } = useMyDecks('arackhan-wars')
  if (data === undefined) return null // TODO handle no connexion to server
  const decks: Deck[] = data.myDecks
  return (
    <>
      <ul css={deckList}>
        {decks.map((deck, i) =>
          <li key={i}>
            <h3 css={deckNameCss(getFaction(deck.cards))}>{deck.name}</h3>
            <div>
              <FontAwesomeIcon css={iconButton} icon={faEye} onClick={() => openDeck(deck)} title={t('deck.open')!}/>
              <FontAwesomeIcon css={iconButton} icon={faTrashCan} onClick={() => setDeckToDelete(deck)} title={t('deck.delete')!}/>
            </div>
          </li>
        )}
        <hr/>
        <p css={css`font-weight: bold;`}>{t('deck.publisher')}</p>
        {publisherDecks.map((cards, i) =>
          <li key={i}>
            <h3 css={deckNameCss(FactionCardsCharacteristics[cards[0]].faction)}>{t(`deck.${i}`)}</h3>
            <div>
              <FontAwesomeIcon css={iconButton} icon={faEye} onClick={() => openDeck({ cards, name: t(`deck.${i}`) })} title={t('deck.open')!}/>
            </div>
          </li>
        )}
      </ul>
      <RulesDialog open={deckToDelete !== undefined}>
        <div css={confirmDeleteDialog}>
          <p>{t('deck.delete.confirm', { name: deckToDelete?.name })}</p>
          <div css={dialogButtons}>
            <ThemeButton onClick={() => setDeckToDelete(undefined)}>{t('Cancel')}</ThemeButton>
            <ThemeButton onClick={deleteAndCloseDeck}>{t('Confirm')}</ThemeButton>
          </div>
        </div>
      </RulesDialog>
    </>
  )
}

const deckList = css`
  list-style: none;
  padding: 0;
  margin-bottom: 1em;

  > li {
    margin-top: 0.3em;
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
  margin-left: 0.5em;
  cursor: pointer;
`

const confirmDeleteDialog = css`
  margin: 0 1em;
  font-size: 3em;
  display: flex;
  flex-direction: column;
  white-space: break-spaces;
`

const dialogButtons = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`
