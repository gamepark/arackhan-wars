import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardId, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { useRules } from '@gamepark/react-game'
import partition from 'lodash/partition'
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
    <p><FontAwesomeIcon icon={validator.is23Cards && validator.isSingleFaction ? faCheck : faXmark}/> {t('deck.rules.size')}</p>
    <p><FontAwesomeIcon icon={validator.isMax125Points ? faCheck : faXmark}/> {t('deck.rules.value')}</p>
    <p><FontAwesomeIcon icon={validator.isMax5Initiative ? faCheck : faXmark}/> {t('deck.rules.initiative')}</p>
    <p><FontAwesomeIcon icon={validator.isMax6Stealth ? faCheck : faXmark}/> {t('deck.rules.stealth')}</p>
    <p><FontAwesomeIcon icon={!cardsOver6Limit.length ? faCheck : faXmark}/> {t('deck.rules.copies')}</p>
    <p><FontAwesomeIcon icon={!legendaryOverLimit.length ? faCheck : faXmark}/> {t('deck.rules.legendary')}</p>
    <p><FontAwesomeIcon icon={!cardOverSpecificLimit.length ? faCheck : faXmark}/> {t('deck.rules.limit')}</p>
  </>
}