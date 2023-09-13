/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { pointerCursorCss, RulesDialog, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars'
import { useState } from 'react'
import { css } from '@emotion/react'
import { getWinners } from '@gamepark/rules-api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons/faCircleQuestion'

export const GameOverHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const player = usePlayerId()
  const [dialogOpen, setDialogOpen] = useState(false)
  const winners = getWinners(rules)
  const score = Math.max(...rules.players.map(player => rules.getScore(player)!))
  const winnerName = usePlayerName(winners[0])
  return <>
    <span>
      {
        winners.length === 1 ?
          winners[0] !== player ?
            t('header.winner', { player: winnerName, score }) :
            t('header.victory', { score }) :
          t('header.tie')
      }
      &nbsp;<FontAwesomeIcon icon={faCircleQuestion} onClick={() => setDialogOpen(true)} css={pointerCursorCss}/>
    </span>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
      <div css={rulesCss}>
        <h2>{t('rules.end')}</h2>
        <p>{t('rules.score')}</p>
        <h3>{t('rules.tie')}</h3>
        <ul>
          <li><p>{t('rules.tie.1')}</p></li>
          <li><p>{t('rules.tie.2')}</p></li>
          <li><p>{t('rules.tie.3')}</p></li>
        </ul>
        {player && <p><Trans defaults="rules.score.mine" values={{
          score: rules.getScore(player),
          cards: rules.getScore(player, 1),
          discard: -rules.getScore(player, 2)!
        }}><strong css={css`color: darkgreen;`}/><strong css={css`color: darkred;`}/></Trans></p>}
        {rules.players.filter(p => p !== player).map(player => <PlayerStats key={player} rules={rules} player={player}/>)}
      </div>
    </RulesDialog>
  </>
}

const PlayerStats = ({ rules, player }: { rules: ArackhanWarsRules, player: number }) => {
  const playerName = usePlayerName(player)
  return <p><Trans defaults="rules.score.player" values={{
    player: playerName,
    score: rules.getScore(player),
    cards: rules.getScore(player, 1),
    discard: -rules.getScore(player, 2)!
  }}><strong css={css`color: darkgreen;`}/><strong css={css`color: darkred;`}/></Trans></p>
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`
