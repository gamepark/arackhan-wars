import { FactionCardInspector } from '../rules/cards/rules/helper/FactionCardInspector'
import { ActivatedCard } from '../rules/types'
import { Material } from '@gamepark/rules-api'


export const computeAttack = (attacker: Material, opponent: Material, cardInspector: FactionCardInspector, activatedCards: ActivatedCard[] = []) => {
  const attackerIndex = attacker.getIndex()
  const cardAttack = cardInspector.getAttack(attackerIndex)

  const otherAttackersOnThisTarget = activatedCards.filter((c: any) => c.card !== attackerIndex && (c.targets ?? []).includes(opponent.getIndex()))
  let groupAttack = Math.max(cardAttack, 0)
  for (const otherAttacker of otherAttackersOnThisTarget) {
    groupAttack += Math.max(cardInspector.getAttack(otherAttacker.card), 0)
  }

  groupAttack = cardInspector.getAttackForOpponent(attacker, opponent, groupAttack)
  return groupAttack
}
