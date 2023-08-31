import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useLegalMoves, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'

export const ActivationHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const activePlayer = rules?.getActivePlayer()
  const playerName = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()

  const movedCard = rules?.remind(Memory.MovedCards)?.[0]
  const movedCardId = movedCard !== undefined ? rules?.material(MaterialType.FactionCard).getItem(movedCard)?.id.front : undefined
  if (movedCardId !== undefined) {
    const deactivate = legalMoves.find(isMoveItemType(MaterialType.FactionToken))
    if (!deactivate) {
      return <>{t('header.activation.moved.choice', { card: t(`card.name.${movedCardId}`), player: playerName })}</>
    } else {
      return <Trans defaults="header.activation.moved.choose" values={{ card: t(`card.name.${movedCardId}`) }}>
        <PlayMoveButton move={deactivate}/>
      </Trans>
    }
  }

  const isInitiativeSequence = rules?.remind(Memory.IsInitiativeSequence)
  if (isInitiativeSequence) {
    if (!legalMoves.length) {
      return <>{t('header.initiative', { player: playerName })}</>
    } else {
      return <Trans defaults="header.initiative.me"><PlayMoveButton move={legalMoves.find(isCustomMoveType(CustomMoveType.Pass))}/></Trans>
    }
  }

  if (!legalMoves.length) {
    return <>{t('header.activation', { player: playerName })}</>
  } else {
    const solveAttack = legalMoves.find(isCustomMoveType(CustomMoveType.SolveAttack))
    if (solveAttack) {
      return <Trans defaults="header.attack.solve">
        <PlayMoveButton move={solveAttack}/>
      </Trans>
    }
    const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
    return <Trans defaults="header.activation.me"><PlayMoveButton move={pass}/></Trans>
  }
}
