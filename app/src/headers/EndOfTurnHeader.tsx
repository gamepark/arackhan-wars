/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const EndOfTurnHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  if (playerId === activePlayer) {
    const cardIndex = rules.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(activePlayer).getIndexes().find(index =>
      getCardRule(rules.game, index).endOfTurnMoves.length > 0
    )
    if (cardIndex !== undefined) {
      const card = rules.material(MaterialType.FactionCard).getItem(cardIndex)?.id.front
      return <Trans defaults="header.end-of-turn.you" values={{ card: t(`card.name.${getUniqueCard(card)}`) }}><PlayMoveButton move={pass}/></Trans>
    } else {
      return <Trans defaults="header.end-of-turn.pass"><PlayMoveButton move={pass}/></Trans>
    }
  } else {
    return <>{t('header.end-of-turn', { player })}</>
  }
}
