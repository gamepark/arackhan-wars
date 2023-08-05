import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useLegalMoves, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'

export const ActivationHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const activePlayer = rules?.getActivePlayer()
  const playerName = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()
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
    const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
    if (solveAttack) {
      return <Trans defaults="You can play card, <0>pass</0> or <1>solve your attack</1>">
        <PlayMoveButton move={pass}/>
        <PlayMoveButton move={solveAttack}/>
      </Trans>
    }
    return <Trans defaults="header.activation.me"><PlayMoveButton move={pass}/></Trans>
  }
}
