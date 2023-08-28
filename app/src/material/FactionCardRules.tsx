/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { displayLocationRules, isCustomMove, MaterialItem } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { linkButtonCss } from '@gamepark/react-game/dist/css/buttonCss'

export const FactionCardRules = ({ item, itemIndex, closeDialog }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const performAction = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.PerformAction && move.data === itemIndex)
  const chooseCard = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.ChooseCard && move.data === itemIndex)
  return <>
    <h2>{item.id.front ? t(`card.name.${item.id.front}`) : t('rules.card.faction', { faction: t(`faction.${item.id.back}`) })}</h2>
    <CardLocationRule item={item}/>
    <hr/>
    {performAction && <PlayMoveButton move={performAction} onPlay={closeDialog}>{t('card.action.perform')}</PlayMoveButton>}
    {chooseCard && <PlayMoveButton move={chooseCard} onPlay={closeDialog}>{t('card.choose')}</PlayMoveButton>}
  </>
}

function CardLocationRule({ item }: { item: Partial<MaterialItem> }) {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(item.location?.player)
  switch (item.location?.type) {
    case LocationType.PlayerDeck:
      return <p>{item.location?.player === playerId ? t('rules.card.deck.mine') : t('rules.card.deck', { player })}</p>
    case LocationType.Hand:
      return <p>{item.location?.player === playerId ? t('rules.card.hand.mine') : t('rules.card.hand', { player })}</p>
    case LocationType.Battlefield:
      return <p>{item.location?.player === playerId ? t('rules.card.battlefield.mine') : t('rules.card.battlefield', { player })}</p>
    case LocationType.AstralPlane:
      return <p>{item.location?.player === playerId ? t('rules.card.astral-plane.mine') : t('rules.card.astral-plane', { player })}</p>
    case LocationType.PlayerDiscard:
      return <p>
        <Trans defaults={item.location?.player === playerId ? 'rules.card.discard.mine' : 'rules.card.discard'} values={{ player }}>
          <PlayMoveButton css={linkButtonCss} move={displayLocationRules({ type: LocationType.PlayerDiscard, player: item.location?.player })} local/>
        </Trans>
      </p>
    default:
      return null
  }
}