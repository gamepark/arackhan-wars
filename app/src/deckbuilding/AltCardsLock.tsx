/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardId, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { usePlay, useRules } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { cardHeight, cardWidth } from '../material/FactionCardDescription'
import { DeckbuildingRules } from './DeckbuildingRules'

export const AltCardsLock = () => {
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  return <>
    {rules?.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook).id<CardId>(id => FactionCardsCharacteristics[id.front].altOf !== undefined)
      .getIndexes().map(index => {
        const item = rules.material(MaterialType.FactionCard).getItem(index)!
        return <div key={index} css={lockMask(item.location.x!)}
                    onClick={() => play(displayMaterialHelp(MaterialType.FactionCard, item, index))}>
          <FontAwesomeIcon icon={faLock}/>
        </div>
      })}
  </>
}

const lockMask = (x: number) => css`
  position: absolute;
  border-radius: 0.4em;
  background-color: rgba(0, 0, 0, 0.5);
  left: ${(x % 6) * (cardWidth + 1) + 0.8}em;
  top: ${Math.floor(x / 6) * (cardHeight + 1) + 7.5}em;
  height: ${cardHeight + 0.05}em;
  width: ${cardWidth + 0.05}em;
  color: darkred;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
