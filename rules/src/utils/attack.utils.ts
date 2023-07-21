import { FactionCardEffectHelper } from '../rules/cards/rules/helper/FactionCardEffectHelper'
import { ActivatedCard } from '../rules/types'
import { getFactionCardDescription } from '../material/FactionCard'
import { isAttackAttribute } from '../rules/cards/rules/attribute/AttackAttribute'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'


export const computeAttack = (game: MaterialGame, attacker: Material, opponent: Material, effectHelper: FactionCardEffectHelper, activatedCards: ActivatedCard[] = []) => {
  const cardAttack = effectHelper.getAttack(attacker.getIndex())
  const attackerItem = attacker.getItem()!
  const attackerCard = getFactionCardDescription(attackerItem.id.front)

  const otherAttackersOnThisTarget = activatedCards.filter((c: any) => (c.targets ?? []).includes(opponent.getIndex()))

  let groupAttack = Math.max(cardAttack, 0)
  for (const otherAttacker of otherAttackersOnThisTarget) {
    groupAttack += Math.max(effectHelper.getAttack(otherAttacker.card), 0)
  }

  attackerCard.getAttributes()
    .filter(isAttackAttribute)
    .filter((a) => !effectHelper.hasLostAttributes(attacker.getIndex(), a.type))
    .forEach((a) => groupAttack = a.getAttributeRule(game).getAttackValue(groupAttack, attacker, opponent))

  return groupAttack
}
