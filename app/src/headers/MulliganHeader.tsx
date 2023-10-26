/** @jsxImportSource @emotion/react */
import { START_HAND } from '@gamepark/arackhan-wars/rules/MulliganRule'
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isEndPlayerTurn, MaterialMove } from '@gamepark/rules-api'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export const MulliganHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const player = usePlayerId()
  const legalMoves = useLegalMoves<MaterialMove>()
  const passMove = legalMoves.find(isEndPlayerTurn)
  if (passMove) {
    return <Trans defaults="header.mulligan.pass"><PlayMoveButton move={passMove}/></Trans>
  }
  const mulliganMove = legalMoves.find(isCustomMoveType(CustomMoveType.Mulligan))
  if (mulliganMove && rules) {
    const cards = START_HAND - rules.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(player).length
    return <Trans defaults="header.mulligan.done" values={{ cards }}><PlayMoveButton move={mulliganMove}/></Trans>
  }
  return <>{t('header.mulligan')}</>
}
