import { Trans, useTranslation } from 'react-i18next'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { css } from '@emotion/react'

export const GameOverRule = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const player = usePlayerId()
  return (
    <div css={rulesCss}>
      <h2>{t('rules.end')}</h2>
      <p>{t('rules.score')}</p>
      <h3>{t('rules.tie')}</h3>
      <ul>
        <li><p>{t('rules.tie.1')}</p></li>
        <li><p>{t('rules.tie.2')}</p></li>
        <li><p>{t('rules.tie.3')}</p></li>
      </ul>
      {player && <p><Trans i18nKey="rules.score.mine" values={{
        score: rules.getScore(player),
        cards: rules.getTieBreaker(1, player),
        discard: -rules.getTieBreaker(2, player)!
      }}><strong css={css`color: darkgreen;`}/><strong css={css`color: darkred;`}/></Trans></p>}
      {rules.players.filter(p => p !== player).map(player => <PlayerStats key={player} rules={rules} player={player}/>)}
    </div>
  )
}

const PlayerStats = ({ rules, player }: { rules: ArackhanWarsRules, player: number }) => {
  const playerName = usePlayerName(player)
  return <p><Trans i18nKey="rules.score.player" values={{
    player: playerName,
    score: rules.getScore(player),
    cards: rules.getTieBreaker(1, player),
    discard: -rules.getTieBreaker(2, player)!
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
