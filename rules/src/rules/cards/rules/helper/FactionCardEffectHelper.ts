import { PassiveEffect } from '../../descriptions/base/Effect'
import { isLooseSkillEffect } from '../effect/LooseSkillsEffect'
import { CardAttributeType, FactionCardDetail } from '../../descriptions/base/FactionCardDetail'
import { isLooseAttributesEffect } from '../effect/LooseAttributesEffect'
import { isLand } from '../../descriptions/base/Land'
import { isSpell } from '../../descriptions/base/Spell'
import { isCreature } from '../../descriptions/base/Creature'
import { isValueModifierEffect } from '../effect/ValueModifierEffect'
import sumBy from 'lodash/sumBy'
import { isAttackEffect } from '../../descriptions/base/AttackEffect'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'

export class FactionCardEffectHelper extends MaterialRulesPart {
  readonly passiveEffects: Record<number, PassiveEffect[]> = {}

  constructor(game: MaterialGame) {
    super(game)
    this.passiveEffects = this.computeCardPassiveEffects()
  }

  computeCardPassiveEffects(): Record<number, PassiveEffect[]> {
    const battlefieldCards = this.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane)
    const modifications: Record<number, PassiveEffect[]> = this.computeBlockedEffects(battlefieldCards)
    for (const cardIndex of battlefieldCards.getIndexes()) {
      const cardMaterial = this.material(MaterialType.FactionCard).index(cardIndex)
      const card = cardMaterial.getItem()!
      const isSkillDisabled = (modifications[cardIndex] ?? []).some(isLooseSkillEffect)
      const description = getFactionCardDescription(card.id.front)

      for (const otherCardIndex of battlefieldCards.getIndexes()) {
        const otherCardMaterial = this.material(MaterialType.FactionCard).index(otherCardIndex)
        const passiveEffects = this.getPassiveEffects(description, isSkillDisabled)
          .filter((e) => e.isApplicable(cardMaterial, otherCardMaterial))
          .map((e) => e.getEffectRule(this.game))

        if (passiveEffects.length) {
          if (!modifications[otherCardIndex]) modifications[otherCardIndex] = []

          modifications[otherCardIndex].push(...passiveEffects)
        }
      }
    }
    return modifications
  }

  computeBlockedEffects(battlefieldCards: Material): Record<number, PassiveEffect[]> {
    const modifications: Record<number, PassiveEffect[]> = {}
    for (const cardIndex of battlefieldCards.getIndexes()) {
      const cardMaterial = this.material(MaterialType.FactionCard).index(cardIndex)
      const card = cardMaterial.getItem()!
      const description = getFactionCardDescription(card.id.front)

      for (const otherCardIndex of battlefieldCards.getIndexes()) {
        if (otherCardIndex === cardIndex) continue

        const otherCardMaterial = this.material(MaterialType.FactionCard).index(otherCardIndex)
        const passiveEffects = this.getPassiveEffects(description)
          .filter((e) => e.isApplicable(cardMaterial, otherCardMaterial))
          .map((e) => e.getEffectRule(this.game))
          .filter(isLooseSkillEffect)

        if (passiveEffects.length) {
          if (!modifications[otherCardIndex]) modifications[otherCardIndex] = []

          modifications[otherCardIndex].push(...passiveEffects)
        }
      }
    }
    return modifications
  }

  getPassiveEffects(description: FactionCardDetail, isSkillDisabled?: boolean) {
    if (isCreature(description)) {
      return description.getPassiveEffects(isSkillDisabled)
    }
    return description.getPassiveEffects()

  }

  hasLostSkill(cardIndex: number): boolean {
    if (!(cardIndex in this.passiveEffects)) return false
    return this.passiveEffects[cardIndex].some((e) => isLooseSkillEffect(e))
  }

  hasLostAttributes(cardIndex: number, attribute: CardAttributeType): boolean {
    if (!(cardIndex in this.passiveEffects)) return false
    return this.passiveEffects[cardIndex].some((e) => isLooseAttributesEffect(e) && e.hasLostAttribute(attribute))
  }

  getAttack(cardIndex: number): number {
    const card = this.material(MaterialType.FactionCard).getItem(cardIndex)!
    const cardDescription = getFactionCardDescription(card.id.front)
    if (!isSpell(cardDescription) && !isCreature(cardDescription)) return 0
    const baseAttack = cardDescription.attack ?? 0

    if (!(cardIndex in this.passiveEffects)) return baseAttack
    const valueModifierEffects = this.passiveEffects[cardIndex].filter(isValueModifierEffect)
    return baseAttack + sumBy(valueModifierEffects, (e) => e.getBonus().attack ?? 0)
  }

  getDefense(cardIndex: number): number {
    const card = this.material(MaterialType.FactionCard).getItem(cardIndex)!
    const cardDescription = getFactionCardDescription(card.id.front)
    if (!isLand(cardDescription) && !isCreature(cardDescription)) return 0
    const baseDefense = cardDescription.defense ?? 0
    if (!(cardIndex in this.passiveEffects)) return baseDefense
    const valueModifierEffects = this.passiveEffects[cardIndex].filter(isValueModifierEffect)
    return baseDefense + sumBy(valueModifierEffects, (e) => e.getBonus().defense ?? 0)
  }

  afterAttack(cardIndex: number): MaterialMove[] {
    if (!(cardIndex in this.passiveEffects)) return []
    return this.passiveEffects[cardIndex]
      .filter(isAttackEffect)
      .flatMap((e) => e.getAttackConsequences(this.material(MaterialType.FactionCard).index(cardIndex)))
  }

  canAttack(attackerIndex: number, opponent: number): boolean {
    if (!(attackerIndex in this.passiveEffects)) return true
    // TODO: other attackers ?
    return !this.passiveEffects[attackerIndex].filter(isAttackEffect).some((e) => !e.canAttack(attackerIndex, opponent))
  }

  canBeAttacked(attackerIndex: number, opponent: number): boolean {
    if (!(opponent in this.passiveEffects)) return true
    return !this.passiveEffects[opponent].filter(isAttackEffect).some((a) => !a.canBeAttacked(attackerIndex, opponent))
  }


}
