/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const MoveCreatureActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const actionCard = rules.material(MaterialType.FactionCard).getItem(rules.remind(Memory.ActionCard))?.id.front
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const count = rules.remind<number>(Memory.Count) ?? 1
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (playerId === activePlayer) {
    return <Trans defaults="action.move.creature" values={{ card: t(`card.name.${getUniqueCard(actionCard)}`), count }}><PlayMoveButton move={pass}/></Trans>
  } else {
    return <>{t('action.move.creature.player', { card: t(`card.name.${getUniqueCard(actionCard)}`), player, count })}</>
  }
}
