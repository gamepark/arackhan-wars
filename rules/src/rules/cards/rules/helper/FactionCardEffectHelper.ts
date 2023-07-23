import { Effect, isWithConsequences, PassiveEffect } from '../../descriptions/base/Effect'
import { isLooseSkillEffect } from '../effect/LooseSkillsEffect'
import { CardAttributeType, FactionCardDetail } from '../../descriptions/base/FactionCardDetail'
import { isLooseAttributesEffect } from '../effect/LooseAttributesEffect'
import { isLand } from '../../descriptions/base/Land'
import { isSpell } from '../../descriptions/base/Spell'
import { isCreature } from '../../descriptions/base/Creature'
import { isValueModifierEffect, ValueModifierEffect } from '../effect/ValueModifierEffect'
import sumBy from 'lodash/sumBy'
import { isAttackEffect } from '../../descriptions/base/AttackEffect'
import { Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { isAttackAttribute } from '../attribute/AttackAttribute'
import sum from 'lodash/sum'
import { Attribute } from '../attribute/Attribute'

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
      const description = getFactionCardDescription(card.id.front)
      const passiveEffects = this.getPassiveEffects(description, this.hasLostSkill(cardIndex))

      const attributes = description.getAttributes()
        .filter(isAttackAttribute)

      for (const otherCardIndex of battlefieldCards.getIndexes()) {
        const otherCardMaterial = this.material(MaterialType.FactionCard).index(otherCardIndex)
        this.applyPassiveEffect(passiveEffects, cardMaterial, otherCardMaterial, modifications, otherCardIndex)
        this.applyAttributes(attributes, cardMaterial, otherCardMaterial, modifications, otherCardIndex)
      }
    }
    return modifications
  }

  private applyAttributes(attributes: Attribute[], cardMaterial: Material, otherCardMaterial: Material, modifications: Record<number, PassiveEffect[]>, otherCardIndex: number) {
    const attackBonuses = attributes
      .filter((a) => !this.hasLostAttributes(cardMaterial.getIndex(), a.type))
      .flatMap((a) => a.getAttributeRule(this.game).getPassiveEffects?.(cardMaterial, otherCardMaterial) ?? [])

    if (attackBonuses.length) {
      if (!modifications[otherCardIndex]) modifications[otherCardIndex] = []
      modifications[otherCardIndex].push(new ValueModifierEffect(this.game, { attack: sum(attackBonuses) }))
    }
  }

  private applyPassiveEffect(effects: Effect[], cardMaterial: Material, otherCardMaterial: Material, modifications: Record<number, PassiveEffect[]>, otherCardIndex: number) {
    const passiveEffects = effects
      .filter((e) => e.isApplicable(cardMaterial, otherCardMaterial))
      .map((e) => e.getEffectRule(this.game))

    if (passiveEffects.length) {
      if (!modifications[otherCardIndex]) modifications[otherCardIndex] = []
      modifications[otherCardIndex].push(...passiveEffects)
    }
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

  hasLostSkill(cardIndex: number, modifications?: Record<number, PassiveEffect[]>): boolean {
    const passiveEffects = modifications ?? this.passiveEffects

    if (!(cardIndex in passiveEffects)) return false
    return passiveEffects[cardIndex].some((e) => isLooseSkillEffect(e))
  }

  hasLostAttributes(cardIndex: number, attribute: CardAttributeType, modifications?: Record<number, PassiveEffect[]>): boolean {
    const passiveEffects = modifications ?? this.passiveEffects

    if (!(cardIndex in passiveEffects)) return false
    return passiveEffects[cardIndex].some((e) => isLooseAttributesEffect(e) && e.hasLostAttribute(attribute))
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

  canAttack(attackerIndex: number, targetIndex: number): boolean {
    if (!(attackerIndex in this.passiveEffects)) return true
    // TODO: other attackers ?
    return !this.passiveEffects[attackerIndex].filter(isAttackEffect).some((e) => !e.canAttack(attackerIndex, targetIndex))
  }

  canBeAttacked(attackerIndex: number, targetIndex: number): boolean {
    if (!(targetIndex in this.passiveEffects)) return true
    return !this.passiveEffects[targetIndex].filter(isAttackEffect).some((a) => !a.canBeAttacked(attackerIndex, targetIndex))
  }

  onCasterMoveTo(casterIndex: number, targetIndex: number): MaterialMove[] {
    if (!(targetIndex in this.passiveEffects)) return []
    this.passiveEffects[targetIndex]
      .flatMap((effect) => {
        if (!isWithConsequences(effect)) return []
        const caster = this.material(MaterialType.FactionCard).index(casterIndex)!
        const target = this.material(MaterialType.FactionCard).index(targetIndex)!
        return effect.onCasterMoveTo(caster, target)
      })

    return []
  }

  onCasterMoveAway(casterIndex: number, targetIndex: number): MaterialMove[] {
    if (!(targetIndex in this.passiveEffects)) return []
    this.passiveEffects[targetIndex]
      .flatMap((effect) => {
        if (!isWithConsequences(effect)) return []
        const caster = this.material(MaterialType.FactionCard).index(casterIndex)!
        const target = this.material(MaterialType.FactionCard).index(targetIndex)!
        return effect.onCasterMoveAway(caster, target)
      })

    return []
  }
}
