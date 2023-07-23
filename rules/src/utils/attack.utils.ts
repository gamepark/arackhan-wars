import { FactionCardEffectHelper } from '../rules/cards/rules/helper/FactionCardEffectHelper'
import { ActivatedCard } from '../rules/types'
import { getFactionCardDescription } from '../material/FactionCard'
import { isAttackAttribute } from '../rules/cards/rules/attribute/AttackAttribute'
import { Material, MaterialGame } from '@gamepark/rules-api'


export const computeAttack = (game: MaterialGame, attacker: Material, opponent: Material, effectHelper: FactionCardEffectHelper, activatedCards: ActivatedCard[] = []) => {
  const attackerIndex = attacker.getIndex()
  const cardAttack = effectHelper.getAttack(attackerIndex)
  const attackerCard = attacker.getItem()!
  const attackerCardDescription = getFactionCardDescription(attackerCard.id.front)

  const otherAttackersOnThisTarget = activatedCards.filter((c: any) => c.card !== attackerIndex && (c.targets ?? []).includes(opponent.getIndex()))
  let groupAttack = Math.max(cardAttack, 0)
  for (const otherAttacker of otherAttackersOnThisTarget) {
    groupAttack += Math.max(effectHelper.getAttack(otherAttacker.card), 0)
  }

  attackerCardDescription.getAttributes()
    .filter(isAttackAttribute)
    .filter((a) => !effectHelper.hasLostAttributes(attacker.getIndex(), a.type))
    .forEach((a) => groupAttack = a.getAttributeRule(game).getAttackValue(groupAttack, attacker, opponent))

  return groupAttack
}
