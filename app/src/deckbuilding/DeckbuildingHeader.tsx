import { CardId } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { DeckbuildingRules } from './DeckbuildingRules'

export const DeckbuildingHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const deck = rules?.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems<CardId>().map(item => item.id!.front) ?? []
  const validator = new DeckValidator(deck)
  return <>
    {validator.isValid ? t('header.deck.valid') : t('header.deck.invalid')}
  </>
}
