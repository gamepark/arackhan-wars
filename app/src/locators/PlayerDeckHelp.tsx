import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { LocationHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { sortBy } from 'es-toolkit/compat'
import { Trans, useTranslation } from 'react-i18next'
import { DeckCards } from '../headers/ChooseDeckHeader'

export const PlayerDeckHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()
  const cards = rules?.remind(Memory.PlayerDeck, location.player)
  const player = usePlayerName(location.player)
  return <>
    <h2>{playerId === location.player ? t('rules.deck.you') : t('rules.deck.player', { player })}</h2>
    {cards && <p><Trans i18nKey="rules.deck.list"><em/></Trans></p>}
    {cards && <DeckCards cards={sortBy(cards)}/>}
  </>
}
