import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'

export const arackhanWarsAnimations = new MaterialGameAnimations()

arackhanWarsAnimations.when().move(isCreateItemType(MaterialType.FactionCard)).duration(0)
arackhanWarsAnimations.when().move(isDeleteItemType(MaterialType.FactionCard)).duration(0)

arackhanWarsAnimations.when()
  .rule(RuleId.Mulligan)
  .move(move =>
    isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.PlayerHand
  )
  .duration(0.2)

arackhanWarsAnimations.when()
  .rule(RuleId.EndOfRoundRule)
  .move(move => isMoveItemType(MaterialType.FactionToken)(move))
  .duration(0.3)