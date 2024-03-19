import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const ActivationHeader = () => {
  const rules = useRules<ArackhanWarsRules>()!
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()

  if (playerId === activePlayer) {
    return <MyActivationHeader/>
  } else {
    return <OtherPlayerActivationHeader/>
  }
}

const MyActivationHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const legalMoves = useLegalMoves()
  const movedCards = rules.remind<number[]>(Memory.MovedCards) ?? []

  if (movedCards.length === 1) {
    const movedCardId = rules.material(MaterialType.FactionCard).getItem(movedCards[0])!.id.front
    const deactivate = legalMoves.find(isMoveItemType(MaterialType.FactionToken))!
    const performAction = legalMoves.find(isCustomMoveType(CustomMoveType.PerformAction))!
    if (performAction) {
      return <Trans defaults="header.move.action" values={{ card: t(`card.name.${getUniqueCard(movedCardId)}`) }}>
        <PlayMoveButton move={performAction}/>
        <PlayMoveButton move={deactivate}/>
      </Trans>
    }
    return <Trans defaults="header.move.you" values={{ card: t(`card.name.${getUniqueCard(movedCardId)}`) }}>
      <PlayMoveButton move={deactivate}/>
    </Trans>
  } else if (movedCards.length > 1) {
    const deactivate = legalMoves.find(isCustomMoveType(CustomMoveType.Deactivate))!
    return <Trans defaults="header.moves.you" values={{ x: movedCards.length }}>
      <PlayMoveButton move={deactivate}/>
    </Trans>
  }

  const solveAttack = legalMoves.find(isCustomMoveType(CustomMoveType.SolveAttack))
  if (solveAttack) {
    return <Trans defaults="header.attack.solve">
      <PlayMoveButton move={solveAttack}/>
    </Trans>
  }

  const pass = legalMoves.find(isCustomMoveType(CustomMoveType.Pass))
  const sequence = rules.remind(Memory.IsInitiativeSequence) ? 'initiative' : 'activation'
  const options = legalMoves.length === 1 ? 'pass' : 'me'
  return <Trans defaults={`header.${sequence}.${options}`}><PlayMoveButton move={pass}/></Trans>
}

const OtherPlayerActivationHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const playerName = usePlayerName(activePlayer)
  const movedCards = rules.remind(Memory.MovedCards) ?? []

  if (movedCards.length === 1) {
    const movedCardId = rules.material(MaterialType.FactionCard).getItem(movedCards[0])?.id.front
    return <>{t('header.move', { card: t(`card.name.${getUniqueCard(movedCardId)}`), player: playerName })}</>
  } else if (movedCards.length > 1) {
    return <>{t('header.moves', { x: movedCards.length, player: playerName })}</>
  }
  if (rules.remind(Memory.IsInitiativeSequence)) {
    return <>{t('header.initiative', { player: playerName })}</>
  }
  return <>{t('header.activation', { player: playerName })}</>
}
