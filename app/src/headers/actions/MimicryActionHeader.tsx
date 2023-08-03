/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'

export const MimicryActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const target = rules.remind(Memory.TargetCard)
  if (target === undefined) {
    if (playerId === activePlayer) {
      return <>{t('mimicry.target.choose')}</>
    } else {
      return <>{t('mimicry.target.choice', {player})}</>
    }
  } else {
    if (playerId === activePlayer) {
      return <>{t('mimicry.mimic.choose')}</>
    } else {
      return <>{t('mimicry.mimic.choice', {player})}</>
    }
  }
}
