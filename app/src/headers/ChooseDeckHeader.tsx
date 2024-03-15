/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { FactionCardsCharacteristics, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { Deck, useMe } from '@gamepark/react-client'
import { MaterialComponent, RulesDialog, ThemeButton, usePlay, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { displayMaterialHelp, MoveKind } from '@gamepark/rules-api'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { DeckList } from '../deckbuilding/DeckList'

export const ChooseDeckHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const player = usePlayerId()
  const activePlayers = rules?.game.rule?.players ?? []
  if (activePlayers.includes(player)) {
    return <PlayerChooseDeckHeader/>
  } else if (activePlayers.length === 1) {
    return <OpponentChooseDeckHeader player={activePlayers[0]}/>
  } else {
    return <>{t('header.deck')}</>
  }
}

const PlayerChooseDeckHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(true)
  const [deck, setDeck] = useState<Deck>()
  return <>
    <Trans defaults="header.deck.choose"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
      <div css={rulesCss}>
        <h2><Trans defaults="header.deck.choose"><span/></Trans></h2>
        {deck ?
          <DeckDisplay deck={deck} cancel={() => setDeck(undefined)}/>
          :
          <DeckList openDeck={setDeck}/>
        }
      </div>
    </RulesDialog>
  </>
}

const OpponentChooseDeckHeader = ({ player }: { player: number }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <>{t('header.deck.player', { player: playerName })}</>
}

const rulesCss = css`
  font-size: 3em;
  padding: 0 1em;
  overflow: auto;
  max-height: inherit;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`

const DeckDisplay = ({ deck, cancel }: { deck: Deck, cancel: () => void }) => {
  const { t } = useTranslation()
  const play = usePlay()
  const player = usePlayerId()
  const isSubscriber = !!useMe()?.user?.subscriptionSince
  const cards = isSubscriber ? deck.cards : deck.cards.map(getUniqueCard)
  return (
    <>
      <div css={buttonLine}>
        <ThemeButton onClick={cancel}>{t('Cancel')}</ThemeButton>
        <h3>{deck.name}</h3>
        <ThemeButton disabled={!new DeckValidator(cards).isValid}
                     onClick={() => play({ kind: MoveKind.CustomMove, type: CustomMoveType.ChooseDeck, data: { player, cards } })}>
          {t('deck.choose')}
        </ThemeButton>
      </div>
      <ul css={grid}>
        {cards.map((card, index) => <li key={index}>
          <MaterialComponent type={MaterialType.FactionCard} itemId={{ front: card, back: FactionCardsCharacteristics[card].faction }}
                             onClick={() => play(displayMaterialHelp(MaterialType.FactionCard, {
                               id: { front: card, back: FactionCardsCharacteristics[card].faction }
                             }), { local: true })}/>
        </li>)}
      </ul>
    </>
  )
}

const buttonLine = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7em;

  > h3 {
    margin: 0;
  }
`

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 0.8em;
`
