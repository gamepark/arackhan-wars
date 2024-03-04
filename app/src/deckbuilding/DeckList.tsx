/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { publisherDecks } from '@gamepark/arackhan-wars/material/decks/PublisherDecks'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { Deck, useMyDecks } from '@gamepark/react-client'
import { useTranslation } from 'react-i18next'

type DeckList = {
  openDeck: (deck: Deck) => void
  deleteDeck?: (deck: Deck) => void
}

export const DeckList = ({ openDeck, deleteDeck }: DeckList) => {
  const { t } = useTranslation()

  const { data } = useMyDecks('arackhan-wars')
  const decks: Deck[] = data?.myDecks ?? []
  return (
    <>
      <ul css={deckList}>
        {decks.map((deck, i) =>
          <li key={i}>
            <h3 css={deckNameCss(getFaction(deck.cards))} onClick={() => openDeck(deck)}>{deck.name}
              {!new DeckValidator(deck.cards).isValid && <FontAwesomeIcon icon={faCircleExclamation} css={invalidDeckWarning}/>}
            </h3>
            <div>
              <FontAwesomeIcon css={iconButton} icon={faEye} onClick={() => openDeck(deck)} title={t('deck.open')!}/>
              {deleteDeck && <FontAwesomeIcon css={iconButton} icon={faTrashCan} onClick={() => deleteDeck(deck)} title={t('deck.delete')!}/>}
            </div>
          </li>
        )}
        <hr/>
        <p css={css`font-weight: bold;`}>{t('deck.publisher')}</p>
        {publisherDecks.map((cards, i) =>
          <li key={i}>
            <h3 css={deckNameCss(FactionCardsCharacteristics[cards[0]].faction)} onClick={() => openDeck({ cards, name: t(`deck.${i}`) })}>{t(`deck.${i}`)}</h3>
            <div>
              <FontAwesomeIcon css={iconButton} icon={faEye} onClick={() => openDeck({ cards, name: t(`deck.${i}`) })} title={t('deck.open')!}/>
            </div>
          </li>
        )}
      </ul>
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
  color: ${faction ? factionColor[faction] : '#6B4135'};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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

const invalidDeckWarning = css`
  margin-left: 0.3em;
  color: darkred;
`

const iconButton = css`
  margin-left: 0.5em;
  cursor: pointer;
`
