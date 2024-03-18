/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { onBattlefieldAndAstralPlane } from '@gamepark/arackhan-wars/material/Board'
import { Attribute } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { EffectType } from '@gamepark/arackhan-wars/material/cards/Effect'
import { DiscardTiming } from '@gamepark/arackhan-wars/material/cards/FactionCardCharacteristics'
import { isLand } from '@gamepark/arackhan-wars/material/cards/Land'
import { isSpell } from '@gamepark/arackhan-wars/material/cards/Spell'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { FactionCard, FactionCardsCharacteristics, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { useMe } from '@gamepark/react-client'
import { linkButtonCss, MaterialHelpProps, Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { displayLocationHelp, isCustomMove, isMoveItemType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { isDeckbuilding } from '../deckbuilding/deckbuilding.util'
import astral from '../images/icons/astral.png'
import captureFlag from '../images/icons/capture-flag.png'
import { AbilityHelp } from './AbilityHelp'
import { alignIcon, AttributeHelp } from './AttributeHelp'
import { CardEffectsHelp } from './CardEffectsHelp'

export const FactionCardHelp = (props: MaterialHelpProps) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const chooseCard = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.ChooseCard && move.data === itemIndex)
  const discardCard = useLegalMove(move =>
    isMoveItemType(MaterialType.FactionCard)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.PlayerDiscard
  )
  return <>
    <h2>{item.id.front ? t(`card.name.${getUniqueCard(item.id.front)}`) : t('rules.card.faction', { faction: t(`faction.${item.id.back}`) })}</h2>
    <CardLocationRule {...props}/>
    {chooseCard && <PlayMoveButton move={chooseCard} onPlay={closeDialog}>{t('card.choose')}</PlayMoveButton>}
    {discardCard && <PlayMoveButton move={discardCard} onPlay={closeDialog}>{t('card.discard')}</PlayMoveButton>}
    {item.id.front && <CardFrontRule {...props}/>}
  </>
}

const CardLocationRule = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(item.location?.player)
  switch (item.location?.type) {
    case LocationType.PlayerHand:
      return <p>{item.location?.player === playerId ? t('rules.card.hand.mine') : t('rules.card.hand', { player })}</p>
    case LocationType.Battlefield:
    case LocationType.AstralPlane:
      return <InGameLocationRule {...props}/>
    case LocationType.PlayerDiscard:
      return <p>
        <Trans defaults={item.location?.player === playerId ? 'rules.card.discard.mine' : 'rules.card.discard'} values={{ player }}>
          <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.PlayerDiscard, player: item.location?.player })} local/>
        </Trans>
      </p>
    default:
      return null
  }
}

const InGameLocationRule = ({ item: { location }, itemIndex }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(location?.player)
  const rules = useRules<ArackhanWarsRules>()!
  const cardRule = getCardRule(rules.game, itemIndex!)
  return <p>
    {location?.type === LocationType.Battlefield ?
      (location?.player === playerId ? t('rules.card.battlefield.mine') : t('rules.card.battlefield', { player }))
      : (location?.player === playerId ? t('rules.card.astral-plane.mine') : t('rules.card.astral-plane', { player }))
    }{' '}
    <Trans defaults={cardRule.isActive ? 'rules.card.active' : 'rules.card.deactivated'}><strong/></Trans>
  </p>
}

const PerformActionButton = ({ itemIndex, closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const performAction = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.PerformAction && move.data === itemIndex)
  return performAction ? <PlayMoveButton move={performAction} onPlay={closeDialog}>{t('card.action.perform')}</PlayMoveButton> : null
}

const CardFrontRule = (props: MaterialHelpProps) => {
  const { item, itemIndex } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const factionCard = item.id.front as FactionCard
  const characteristics = FactionCardsCharacteristics[factionCard]
  const isSubscriber = !!useMe()?.user?.subscriptionSince
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
    {isSpell(characteristics) && characteristics.astral &&
      <p css={alignIcon}>
        <Picture src={astral}/>
        &nbsp;
        <span><Trans defaults={`rules.card.spell.astral`}><strong/></Trans></span>
      </p>
    }
    {isLand(characteristics) &&
      <p css={alignIcon}>
        <Picture src={captureFlag}/>
        &nbsp;
        <span><Trans defaults={`rules.card.land`} values={characteristics}><strong/></Trans></span>
      </p>
    }
    {characteristics.getAttributes().map(attribute => <AttributeHelp key={attribute.type} attribute={attribute}/>)}
    {isCreature(characteristics) && characteristics.getSkills().map((skill, index) =>
      <AbilityHelp key={index} type={t('card.skill')} ability={skill} card={factionCard}/>
    )}
    {isSpell(characteristics) && characteristics.getEffects().map((effect, index) =>
      <AbilityHelp key={index} type={t('card.effect')} ability={effect} card={factionCard}/>
    )}
    {isLand(characteristics) && characteristics.getBenefits().map((benefit, index) =>
      <AbilityHelp key={index} type={t('card.benefit')} ability={benefit} card={factionCard}/>
    )}
    {characteristics.getWeaknesses().map((weakness, index) =>
      <AbilityHelp key={index} type={t('card.weakness')} ability={weakness} card={factionCard}/>
    )}
    {characteristics.getAbilities().map(ability =>
      ability.effects.map(effect => {
        switch (effect.type) {
          case EffectType.GainAttributes:
            return effect.attributes.map(attribute => <AttributeHelp key={attribute.type} attribute={attribute}/>)
          case EffectType.LoseAttributes:
            return effect.attributes?.map(attributeType =>
              <AttributeHelp key={attributeType} attribute={{ type: attributeType } as Attribute}/>
            )
          default:
            return null
        }
      })
    )}
    {characteristics.action && <>
      <p><strong>{t('card.action')}</strong> - <Trans defaults={`action.${FactionCardsCharacteristics[factionCard].action}`}><strong/><em/></Trans></p>
      {item.location && item.location.player === playerId && onBattlefieldAndAstralPlane(item.location) && <PerformActionButton {...props}/>}
    </>}
    {item.location?.type === LocationType.Battlefield && <CardEffectsHelp index={itemIndex!}/>}
    <p><Trans defaults="rules.card.value" values={{ value: characteristics.value }}><strong/></Trans></p>
    {characteristics.deckBuildingValue &&
      <p><Trans defaults="rules.card.deck-value" values={{ value: characteristics.deckBuildingValue }}><strong/></Trans></p>
    }
    {characteristics.legendary &&
      <p><Trans defaults="rules.card.legendary"><strong/></Trans></p>
    }
    {characteristics.limit &&
      <p><Trans defaults="rules.card.limit" values={{ limit: characteristics.limit }}><strong/></Trans></p>
    }
    {isDeckbuilding && !isSubscriber && characteristics.altOf &&
      <p css={css`color: darkred`}><FontAwesomeIcon icon={faLock}/> {t('alt.subscribers.only')}</p>
    }
  </>
}
