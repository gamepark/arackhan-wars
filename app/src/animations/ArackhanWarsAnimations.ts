import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { and, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'

export const arackhanWarsAnimations = new MaterialGameAnimations()

arackhanWarsAnimations.configure(isCreateItemType(MaterialType.FactionCard)).skip()
arackhanWarsAnimations.configure(isDeleteItemType(MaterialType.FactionCard)).skip()

arackhanWarsAnimations
  .configure(and(
    isRule(RuleId.Mulligan),
    move => isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.PlayerHand
  ))
  .duration(200)

arackhanWarsAnimations
  .configure(and(
    isRule(RuleId.EndOfRoundRule),
    move => isMoveItemType(MaterialType.FactionToken)(move)
  ))
  .duration(300)
