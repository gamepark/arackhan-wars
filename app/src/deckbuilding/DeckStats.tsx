import { css } from '@emotion/react'
import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { isLand } from '@gamepark/arackhan-wars/material/cards/Land'
import { isSpell } from '@gamepark/arackhan-wars/material/cards/Spell'
import { CardId } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { Picture, useRules } from '@gamepark/react-game'
import { sumBy } from 'es-toolkit'
import creature from '../images/icons/creature.png'
import land from '../images/icons/land.png'
import spell from '../images/icons/spell.png'
import { cardHeight, cardWidth } from '../material/FactionCardDescription'
import { DeckbuildingRules } from './DeckbuildingRules'

export const DeckStats = () => {
  const rules = useRules<DeckbuildingRules>()
  const deck = rules?.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems<CardId>().map(item => item.id!.front) ?? []
  const validator = new DeckValidator(deck)
  const creatures = sumBy(validator.characteristics, characteristics => isCreature(characteristics) ? 1 : 0)
  const lands = sumBy(validator.characteristics, characteristics => isLand(characteristics) ? 1 : 0)
  const spells = sumBy(validator.characteristics, characteristics => isSpell(characteristics) ? 1 : 0)
  return <div css={stats}>
    <p>{validator.deck.length} / 23</p>
    <p>{validator.deckBuildingValue} / 125</p>
    <p><Picture src={creature}/> {creatures}</p>
    <p><Picture src={land}/> {lands}</p>
    <p><Picture src={spell}/> {spells}</p>
  </div>
}

const stats = css`
  position: absolute;
  top: auto;
  left: auto;
  bottom: 0.75em;
  right: 1em;
  display: flex;
  flex-direction: column;
  height: ${cardHeight + 0.3}em;
  width: ${cardWidth}em;
  align-items: start;
  justify-content: space-between;

  > p {
    margin: 0;
    font-size: 1.3em;

    > picture, img {
      vertical-align: sub;
      width: 1.5em;
      height: 1.5em;
    }
  }
`
