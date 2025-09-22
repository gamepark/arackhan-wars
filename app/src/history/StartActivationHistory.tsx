import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { StartPlayerTurn } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const StartActivationHistory = ({ move, context: { game } }: MoveComponentProps<StartPlayerTurn>) => {
  const { t } = useTranslation()
  const initiative = game.rule?.id === RuleId.RevealRule || new ArackhanWarsRules(game).remind(Memory.IsInitiativeSequence)
  const playerName = usePlayerName(move.player)
  return <>{t(`history.activation${initiative ? '.initiative' : ''}`, { player: playerName })}</>
}
