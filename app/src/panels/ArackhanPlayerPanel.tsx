/** @jsxImportSource @emotion/react */
import { FC, useMemo } from 'react'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { Avatar, backgroundCss, SpeechBubbleDirection, usePlayerName, useRules } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import whitelandsPanel from '../images/panels/whitelands-panel.png'
import nakkaPanel from '../images/panels/nakka-panel.png'
import greyOrderPanel from '../images/panels/grey-order-panel.png'
import blightPanel from '../images/panels/blight-panel.png'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'

type PlayerPanelProps = {
  player: PlayerId
  bottom: boolean
}

export const ArackhanPlayerPanel: FC<PlayerPanelProps> = ({ player, bottom }) => {
  const playerName = usePlayerName(player)
  const rules = useRules<ArackhanWarsRules>()!
  const faction = useMemo(() =>
      rules.material(MaterialType.FactionCard).location(LocationType.Hand).player(player).getItem()!.id.back as Faction
    , [rules, player])
  const score = useMemo(() => rules?.getScore(player), [rules, player])
  return (
    <div css={[panelCss, bottom ? bottomPosition : topPosition, backgroundCss(backgroundImage[faction])]}>
      <Avatar css={avatarStyle} playerId={player}
              speechBubbleProps={{ direction: bottom ? SpeechBubbleDirection.TOP_LEFT : SpeechBubbleDirection.BOTTOM_LEFT }}/>
      <span css={nameStyle}>{playerName}</span>
      {score !== undefined && <span css={[scoreStyle, score > 100 && css`font-size: 3em;`]}>{rules?.getScore(player)}</span>}
    </div>
  )
}

const panelWidth = 50

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
  top: 49%;
  left: 30%;
  font-size: 3.5em;
  max-width: 7em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(-50%);
`

const scoreStyle = css`
  position: absolute;
  top: 50%;
  right: 8.6%;
  transform: translate(50%, -50%);
  font-size: 4em;
`
