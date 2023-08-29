/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
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
import { FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { alignIcon, AttributeRule } from './AttributeRule'
import astral from '../images/icons/astral.png'
import captureFlag from '../images/icons/capture-flag.png'
import { AbilityRule } from './AbilityRule'

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

const CardLocationRule = (props: MaterialRulesProps) => {
  const { item } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(item.location?.player)
  switch (item.location?.type) {
    case LocationType.PlayerDeck:
      return <p>{item.location?.player === playerId ? t('rules.card.deck.mine') : t('rules.card.deck', { player })}</p>
    case LocationType.Hand:
      return <p>{item.location?.player === playerId ? t('rules.card.hand.mine') : t('rules.card.hand', { player })}</p>
    case LocationType.Battlefield:
    case LocationType.AstralPlane:
      return <InGameLocationRule {...props}/>
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

const InGameLocationRule = ({ item: { location }, itemIndex }: MaterialRulesProps) => {
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

const PerformActionButton = ({ itemIndex, closeDialog }: MaterialRulesProps) => {
  const { t } = useTranslation()
  const performAction = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.PerformAction && move.data === itemIndex)
  return performAction ? <PlayMoveButton move={performAction} onPlay={closeDialog}>{t('card.action.perform')}</PlayMoveButton> : null
}

const CardFrontRule = (props: MaterialRulesProps) => {
  const { item } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const factionCard = item.id.front as FactionCard
  const characteristics = FactionCardsCharacteristics[factionCard]
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
    {characteristics.getAttributes().map(attribute => <AttributeRule key={attribute.type} attribute={attribute}/>)}
    {isCreature(characteristics) && characteristics.getSkills().map((skill, index) =>
      <AbilityRule key={index} type={t('card.skill')} ability={skill} card={factionCard}/>
    )}
    {isCreature(characteristics) && characteristics.getWeaknesses().map((weakness, index) =>
      <AbilityRule key={index} type={t('card.weakness')} ability={weakness} card={factionCard}/>
    )}
    {isSpell(characteristics) && characteristics.getEffects().map((effect, index) =>
      <AbilityRule key={index} type={t('card.effect')} ability={effect} card={factionCard}/>
    )}
    {isLand(characteristics) && characteristics.getBenefits().map((benefit, index) =>
      <AbilityRule key={index} type={t('card.benefit')} ability={benefit} card={factionCard}/>
    )}
    {characteristics.action && <>
      <p><strong>{t('card.action')}</strong> - <Trans defaults={`action.${factionCard}`}><strong/><em/></Trans></p>
      {item.location && item.location.player === playerId && onBattlefieldAndAstralPlane(item.location) && <PerformActionButton {...props}/>}
    </>}
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
  </>
}
