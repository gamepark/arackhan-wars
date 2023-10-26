/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { factions } from '@gamepark/arackhan-wars/material/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MaterialComponent, PlayMoveButton, RulesDialog, ThemeButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const ChooseFactionHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const player = usePlayerId()
  const activePlayers = rules?.game.rule?.players ?? []
  if (activePlayers.includes(player)) {
    return <PlayerChooseFactionHeader/>
  } else if (activePlayers.length === 1) {
    return <OpponentChooseFactionHeader player={activePlayers[0]}/>
  } else {
    return <>{t('header.faction')}</>
  }
}

const PlayerChooseFactionHeader = () => {
  const { t } = useTranslation()
  const legalMoves = useLegalMoves<CustomMove>()
  const [dialogOpen, setDialogOpen] = useState(true)
  return <>
    <Trans defaults="header.faction.choose"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
      <div css={rulesCss}>
        <h2><Trans defaults="header.faction.choose"><span/></Trans></h2>
        <ul css={factionListCss}>
          {factions.map(faction =>
            <li key={faction}>
              <MaterialComponent type={MaterialType.FactionCard} css={css`transform: rotateY(180deg)`} itemId={{ back: faction }}/>
              <PlayMoveButton move={legalMoves.find(move => move.data.faction === faction)}>
                {t(`faction.${faction}`)}
              </PlayMoveButton>
            </li>
          )}
        </ul>
      </div>
    </RulesDialog>
  </>
}

const OpponentChooseFactionHeader = ({ player }: { player: number }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <>{t('header.faction.player', { player: playerName })}</>
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em 2em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`

const factionListCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2em;
  list-style-type: none;
  padding: 0;
  margin: 0;
  
  > li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  button {
    margin: 0.5em 0;
  }
`
