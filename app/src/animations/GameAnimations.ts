import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.when().move(isCreateItemType(MaterialType.FactionCard)).duration(0)
gameAnimations.when().move(isDeleteItemType(MaterialType.FactionCard)).duration(0)

gameAnimations.when()
  .rule(RuleId.Mulligan)
  .move(move =>
    isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.Hand
  )
  .duration(0.2)

gameAnimations.when()
  .rule(RuleId.EndPhaseRule)
  .move(move => isMoveItemType(MaterialType.FactionToken)(move))
  .duration(0.3)
