/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { Avatar, backgroundCss, PlayerTimerDisplay, SpeechBubble, SpeechBubbleDirection, usePlayerName, usePlayerTime, useRules } from '@gamepark/react-game'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import blightPanel from '../images/panels/blight-panel.png'
import greyOrderPanel from '../images/panels/grey-order-panel.png'
import nakkaPanel from '../images/panels/nakka-panel.png'
import timerBackground from '../images/panels/timer.png'
import whitelandsPanel from '../images/panels/whitelands-panel.png'

type PlayerPanelProps = {
  player: number
  bottom: boolean
}

export const ArackhanPlayerPanel: FC<PlayerPanelProps> = ({ player, bottom }) => {
  const playerName = usePlayerName(player)
  const rules = useRules<ArackhanWarsRules>()!
  const faction = useMemo<Faction>(() =>
      rules.material(MaterialType.FactionCard).location(location =>
        location.player === player && (location.type === LocationType.Hand || location.type === LocationType.PlayerDeck)
      ).getItem()?.id.back ?? Faction.GreyOrder
    , [player])
  const score = useMemo(() => rules?.getScore(player), [rules, player])
  const playerTime = usePlayerTime(player)
  return (
    <div css={[panelCss, bottom ? bottomPosition : topPosition, backgroundCss(backgroundImage[faction])]}>
      <Avatar css={avatarStyle} playerId={player}
              speechBubbleProps={{ direction: SpeechBubbleDirection.TOP_LEFT }}>
        {rules.game.rule?.id === RuleId.Mulligan && rules.players[0] === player && <StartPlayerChoice player={player}/>}
      </Avatar>
      <span css={nameStyle}>{playerName}</span>
      {score !== undefined && <span css={[scoreStyle, score > 100 && css`font-size: 3em;`]}>{rules?.getScore(player)}</span>}
      {playerTime !== undefined && !rules.isOver() && <div css={timerCss}><PlayerTimerDisplay playerTime={playerTime} playerId={player} css={timerText}/></div>}
    </div>
  )
}

const StartPlayerChoice = ({ player }: { player: number }) => {
  const { t } = useTranslation()
  const startPlayer = useRules<ArackhanWarsRules>()?.remind(Memory.StartPlayer)
  const playerName = usePlayerName(startPlayer)
  return (
    <SpeechBubble direction={SpeechBubbleDirection.TOP_LEFT}>
      {startPlayer === player ? t('rules.start.choose.me') : t('rules.start.choose.player', { player: playerName })}
    </SpeechBubble>
  )
}

const panelWidth = 50
const timerWidth = 19.2

const panelCss = css`
  position: absolute;
  right: 1em;
  width: ${panelWidth}em;
  height: ${panelWidth / 3.95}em;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 82em;
`

const backgroundImage: Record<Faction, string> = {
  [Faction.Whitelands]: whitelandsPanel,
  [Faction.Nakka]: nakkaPanel,
  [Faction.GreyOrder]: greyOrderPanel,
  [Faction.Blight]: blightPanel
}

const avatarStyle = css`
  position: absolute;
  top: 46.5%;
  left: 13.15%;
  border-radius: 100%;
  height: 8.3em;
  width: 8.3em;
  color: black;
  transform: translate(-50%, -50%);
`

const nameStyle = css`
  position: absolute;
  color: rgba(238, 238, 238, 0.9);
  top: 51.8%;
  left: 52%;
  font-size: 2.8em;
  width: 50%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translate(-50%, -50%);
  font-family: "Cinzel", sans-serif;
`

const scoreStyle = css`
  position: absolute;
  color: #DFC7A1;
  top: 53%;
  right: 8.3%;
  transform: translate(50%, -50%);
  font-size: 4em;
  font-family: "Cinzel", sans-serif;
`

const timerCss = css`
  position: absolute;
  background-image: url("${timerBackground}");
  background-size: cover;
  width: ${timerWidth}em;
  height: ${timerWidth * 73 / 283}em;
  top: 78%;
  left: 48.7%;
`

const timerText = css`
  position: absolute;
  font-size: 2.8em;
  top: 56%;
  left: 60%;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  font-family: "Cinzel", sans-serif;
`
