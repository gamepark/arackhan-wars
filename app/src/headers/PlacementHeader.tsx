import { useTranslation } from 'react-i18next'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'

export const PlacementHeader = () => {
  const { t } = useTranslation()
  const activePlayer = useGame<MaterialGame>()!.rule!.player!
  const player = usePlayerId()
  const playerName = usePlayerName(activePlayer)

  if (player !== activePlayer) {
    return <>{t('header.placement', { player: playerName })}</>
  } else {
    return <>{t('header.placement.me')}</>
  }
}
