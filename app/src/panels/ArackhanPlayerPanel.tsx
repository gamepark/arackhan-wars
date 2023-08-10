/** @jsxImportSource @emotion/react */
import { FC, HTMLAttributes } from 'react';
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions';
import { PlayerPanelCounter } from './PlayerPanelCounter';
import { PlayerPanel, useRules } from '@gamepark/react-game';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { css } from '@emotion/react';
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules';

type PlayerPanelProps = {
  player: PlayerId
} & HTMLAttributes<HTMLDivElement>

export const ArackhanPlayerPanel: FC<PlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const rules = useRules<ArackhanWarsRules>()!

  return (
    <PlayerPanel playerId={player}  {...rest}>
      <div css={indicators}>
        <PlayerPanelCounter value={rules?.getScore(player)!} icon={faStar} />
      </div>
    </PlayerPanel>
  )
}

const indicators = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 1em;
  right: 0;
  left: 1em;
  flex-wrap: wrap;
`
