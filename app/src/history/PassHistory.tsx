import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const PassHistory = ({ context: { game } }: MoveComponentProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(game.rule.player)
  return <>{t('history.pass', { player: playerName })}</>
}
