/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { displayLocationRules, isCustomMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { linkButtonCss } from '@gamepark/react-game/dist/css/buttonCss'
import { onBattlefieldAndAstralPlane } from '@gamepark/arackhan-wars/material/Board'
import { DiscardTiming } from '@gamepark/arackhan-wars/material/cards/FactionCardCharacteristics'
import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { isSpell } from '@gamepark/arackhan-wars/material/cards/Spell'
import { isLand } from '@gamepark/arackhan-wars/material/cards/Land'
import { FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'

export const FactionCardRules = (props: MaterialRulesProps) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const chooseCard = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.ChooseCard && move.data === itemIndex)
  return <>
    <h2>{item.id.front ? t(`card.name.${item.id.front}`) : t('rules.card.faction', { faction: t(`faction.${item.id.back}`) })}</h2>
    <CardLocationRule {...props}/>
    {chooseCard && <PlayMoveButton move={chooseCard} onPlay={closeDialog}>{t('card.choose')}</PlayMoveButton>}
    {item.id.front && <CardFrontRule {...props}/>}
  </>
}

const CardLocationRule = ({ item }: MaterialRulesProps) => {
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

const PerformActionButton = ({ itemIndex, closeDialog }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const performAction = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.PerformAction && move.data === itemIndex)
  return performAction ? <PlayMoveButton move={performAction} onPlay={closeDialog}>{t('card.action.perform')}</PlayMoveButton> : null
}

const CardFrontRule = (props: MaterialRulesProps) => {
  const { item } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const characteristics = FactionCardsCharacteristics[item.id.front]
  return <>
    {isCreature(characteristics) && <>
      <p><Trans defaults="rules.card.creature" values={characteristics}><strong/></Trans></p>
      {characteristics.family &&
        <p><Trans defaults="rules.card.family" values={{ family: t(`card.family.${characteristics.family}`) }}><strong/></Trans></p>
      }
    </>}
    {isSpell(characteristics) && (
      characteristics.discardTiming === DiscardTiming.ActivationOrEndOfTurn ? <p><Trans defaults="rules.card.spell.active"><strong/></Trans></p>
        : <p><Trans defaults="rules.card.spell.passive"><strong/></Trans></p>
    )}
    {isLand(characteristics) && <p><Trans defaults="rules.card.land" values={characteristics}><strong/></Trans></p>}
    {item.location && item.location.player === playerId && onBattlefieldAndAstralPlane(item.location) && <PerformActionButton {...props}/>}
  </>
}
