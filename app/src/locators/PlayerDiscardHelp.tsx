/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationHelpProps, MaterialComponent, pointerCursorCss, usePlay, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlayerDiscardHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(location.player)
  const cards = useRules<ArackhanWarsRules>()?.material(MaterialType.FactionCard).location(LocationType.PlayerDiscard).player(location.player)
    .sort(item => -item.location.x!)
  const play = usePlay()
  return <>
    <h2>{playerId === location.player ? t('rules.discard.title.mine') : t('rules.discard.title', { player })}</h2>
    <p>
      {playerId === location.player ? t('rules.discard.content.mine', { number: cards?.length })
        : t('rules.discard.content', { number: cards?.length, player })}
    </p>
    <ol css={grid}>
      {cards?.entries.map(([index, card]) =>
        <li key={index}>
          <MaterialComponent type={MaterialType.FactionCard} itemId={card.id} css={pointerCursorCss}
                             onClick={() => play(displayMaterialHelp(MaterialType.FactionCard, card, index), { transient: true })}/>
        </li>
      )}
    </ol>
  </>
}

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 1.5em;
`
