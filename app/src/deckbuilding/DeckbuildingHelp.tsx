import { css } from '@emotion/react'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardId, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { useRules } from '@gamepark/react-game'
import { partition } from 'es-toolkit'
import { useTranslation } from 'react-i18next'
import { DeckbuildingRules } from './DeckbuildingRules'

export const DeckbuildingHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const deck = rules?.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems<CardId>().map(item => item.id!.front) ?? []
  const validator = new DeckValidator(deck)
  const cardsOverLimit = validator.cardsOverLimit
  const [legendaryOverLimit, otherOverLimit] = partition(cardsOverLimit, card => FactionCardsCharacteristics[card].legendary)
  const [cardOverSpecificLimit, cardsOver6Limit] = partition(otherOverLimit, card => FactionCardsCharacteristics[card].limit !== undefined)
  return <>
    <h2>{t('deck.rules')}</h2>
    <p><ValidationMark valid={validator.is23Cards && validator.isSingleFaction}/> {t('deck.rules.size')}</p>
    <p><ValidationMark valid={validator.isMax125Points}/> {t('deck.rules.value')}</p>
    <p><ValidationMark valid={validator.isMax5Initiative}/> {t('deck.rules.initiative')}</p>
    <p><ValidationMark valid={validator.isMax6Stealth}/> {t('deck.rules.stealth')}</p>
    <p><ValidationMark valid={!cardsOver6Limit.length}/> {t('deck.rules.copies')}</p>
    <p><ValidationMark valid={!legendaryOverLimit.length}/> {t('deck.rules.legendary')}</p>
    <p><ValidationMark valid={!cardOverSpecificLimit.length}/> {t('deck.rules.limit')}</p>
  </>
}

export const ValidationMark = ({ valid }: { valid: boolean }) => {
  return <FontAwesomeIcon icon={valid ? faCheck : faXmark} css={valid ? css`color: darkgreen;` : css`color: darkred;`}/>
}
