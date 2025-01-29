import {
  areAdjacentSquares,
  getDistanceBetweenSquares,
  isXYCoordinates,
  Location,
  Material,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  MaterialRulesPart,
  XYCoordinates
} from '@gamepark/rules-api'
import { isEqual } from 'lodash'
import intersection from 'lodash/intersection'
import max from 'lodash/max'
import sumBy from 'lodash/sumBy'
import uniq from 'lodash/uniq'
import { ArackhanWarsRules } from '../ArackhanWarsRules'
import { battlefieldCoordinates } from '../material/Board'
import { Ability } from '../material/cards/Ability'
import {
  AttackByCreaturesOnlyInGroup,
  AttackByCreaturesOnlyInGroupOrSpells,
  AttackCondition,
  AttackLimitation,
  AttackOnlyEvenValueCards,
  CreaturesIfAdjacent,
  NoAttack,
  NoAttackBottomRightCards,
  NoAttackByCreatures,
  NoAttackByGroupedCreatures,
  NoAttackDuringInitiative,
  NoAttackInGroup,
  NoAttackInGroupNotFamily,
  NoAttackOnAdjacentCard
} from '../material/cards/AttackLimitation'
import { Attribute, AttributeType, isMovement, isRangedAttack } from '../material/cards/Attribute'
import { Creature, isCreature } from '../material/cards/Creature'
import {
  AttackerConstraint,
  DefenderConstraint,
  Effect,
  EffectType,
  EndOfTurn,
  EndOfTurnAction,
  ExtraScoreType,
  isAddCharacteristics,
  isAttackerConstraint,
  isDefenderConstraint,
  isGainAttributes,
  isIgnoreFellowGroupAttackWeakness,
  isLoseSkills,
  isMimic,
  isNoGroupAttackWeakness,
  isSetAttackDefense,
  isSwapSkills,
  ModifyAttackCondition,
  ModifyDefenseCondition,
  ModifyMovementCondition,
  Possession,
  Trigger,
  TriggerAction,
  TriggerCondition
} from '../material/cards/Effect'
import { FactionCardCharacteristics } from '../material/cards/FactionCardCharacteristics'
import { Family } from '../material/cards/Family'
import { isLand, Land } from '../material/cards/Land'
import { isSpell, Spell } from '../material/cards/Spell'
import { CardId, FactionCard, FactionCardsCharacteristics, getUniqueCard } from '../material/FactionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CardActionRule } from './action/CardActionRule'
import { TargetingEffect } from './action/TargetingEffect'
import { Attack } from './AttackRule'
import { Memory } from './Memory'

export class CardRule extends MaterialRulesPart {
  private abilitiesCache: Ability[] | undefined = undefined
  private effectsCache: Effect[] | undefined = undefined

  constructor(game: MaterialGame, public index: number) {
    super(game)
  }

  get cardMaterial(): Material {
    return this.material(MaterialType.FactionCard).index(this.index)
  }

  get item(): MaterialItem {
    return this.game.items[MaterialType.FactionCard]![this.index]
  }

  get card(): FactionCard | undefined {
    const mimic = this.targetingEffects.find(isMimic)
    return mimic?.target ?? this.item.id.front as FactionCard | undefined
  }

  get cardNames(): FactionCard[] {
    const card = this.card
    const names = card !== undefined ? [getUniqueCard(card)] : []
    for (const addCharacteristic of this.targetingEffects.filter(isAddCharacteristics)) {
      names.push(getUniqueCard(addCharacteristic.card))
    }
    return uniq(names)
  }

  get owner() {
    return this.item.location.player!
  }

  get characteristics(): FactionCardCharacteristics | undefined {
    const card = this.card
    return card !== undefined ? FactionCardsCharacteristics[card] : undefined
  }

  get value(): number {
    return (this.characteristics?.value ?? 0)
      + sumBy(this.targetingEffects.filter(isAddCharacteristics), effect => FactionCardsCharacteristics[effect.card].value)
  }

  get score(): number {
    const card = this.card
    if (card === undefined) return 0
    return this.isSpell ? 0 : this.value + sumBy(FactionCardsCharacteristics[card].getAbilities(), ability =>
      sumBy(ability.effects, effect => {
        if (effect.type === EffectType.ExtraScore) {
          switch (effect.score) {
            case ExtraScoreType.ValueOfCardsUnder:
              return sumBy(this.material(MaterialType.FactionCard).location(LocationType.UnderCard).parent(this.index).getIndexes(), index =>
                getCardRule(this.game, index).value
              )
            case ExtraScoreType.MastersOfAracKhan:
              const creatures = this.material(MaterialType.FactionCard).id<CardId>(id => id.front && isCreature(FactionCardsCharacteristics[id.front]))
              const adjacentAlliedCreatures = creatures.player(this.owner).location(l => areAdjacentSquares(this.item.location, l))
              const scoredEnemies = creatures.player(p => p !== this.owner).location(l => areAdjacentSquares(this.item.location, l)
                || adjacentAlliedCreatures.location(allyLocation => areAdjacentSquares(l, allyLocation)).length > 0)
              return sumBy(scoredEnemies.getItems(), item => FactionCardsCharacteristics[item.id.front].value)
          }
        }
        return 0
      })
    )
  }

  get isCreature() {
    return isCreature(this.characteristics)
  }

  get isSpell() {
    return isSpell(this.characteristics)
  }

  get isLegendary() { // for future expansions
    return this.cardNames.some(card => FactionCardsCharacteristics[card].legendary)
  }

  get abilities(): Ability[] {
    if (!this.abilitiesCache) {
      this.abilitiesCache = this.processAbilities()
    }
    return this.abilitiesCache
  }

  private processAbilities(): Ability[] {
    return this.skills.concat(this.weaknesses).concat(this.spellEffects).concat(this.benefits)
  }

  private get characteristicsForSkills() {
    const swapSkills = this.targetingEffects.find(isSwapSkills)
    if (swapSkills) {
      const otherCreatureIndex = swapSkills.creatures.find(index => index !== this.index)!
      return FactionCardsCharacteristics[this.material(MaterialType.FactionCard).getItem<CardId>(otherCreatureIndex)!.id!.front]
    }
    return this.characteristics
  }

  loseSkills(skills: Ability[], lookAtEnemySkills = true) {
    const hasLoseSkillsAbility = skills.some(skill => skill.effects.some(isLoseSkills))
    const hasLoseSkillsWeakness = this.weaknesses.some(weakness => weakness.effects.some(isLoseSkills))
    const isImmuneToEnemySpells = this.cardsThatMightAffect.some(card =>
      card.initialSkills.some(skill => skill.effects.some(effect => effect.type === EffectType.ImmuneToEnemySpells)
        && skill.isApplicable(this.game, this.cardMaterial, this.cardMaterial)))
    return this.cardsThatMightAffect.some(card => {
      if (isImmuneToEnemySpells && card.isSpell) return false
      const isLoseMySkills = (skill: Ability) =>
        skill.effects.some(isLoseSkills) && skill.isApplicable(this.game, card.cardMaterial, this.cardMaterial)
      return (!hasLoseSkillsAbility && lookAtEnemySkills && card.skillsIgnoringEnemySkills.some(isLoseMySkills))
        || (!hasLoseSkillsWeakness && card.weaknesses.some(isLoseMySkills))
        || card.spellEffects.some(isLoseMySkills)
        || card.benefits.some(isLoseMySkills)
    })
  }

  get initialSkills() {
    const characteristicsForSkills = this.characteristicsForSkills
    if (!isCreature(characteristicsForSkills)) return []
    const skills = [...characteristicsForSkills.getSkills()]
    for (const addCharacteristic of this.targetingEffects.filter(isAddCharacteristics)) {
      const card = FactionCardsCharacteristics[addCharacteristic.card]
      if (isCreature(card)) skills.push(...card.getSkills())
    }
    return skills
  }

  private get skills(): Ability[] {
    const skills = this.initialSkills
    return this.loseSkills(skills) ? [] : skills
  }

  private get skillsIgnoringEnemySkills(): Ability[] {
    const skills = this.initialSkills
    return this.loseSkills(skills, false) ? [] : skills
  }

  private get weaknesses() {
    const weaknesses = [...this.characteristics?.getWeaknesses() ?? []]
    for (const addCharacteristic of this.targetingEffects.filter(isAddCharacteristics)) {
      weaknesses.push(...FactionCardsCharacteristics[addCharacteristic.card].getWeaknesses())
    }
    return weaknesses
  }

  private get spellEffects() {
    const characteristics = this.characteristics
    const effects = isSpell(characteristics) ? characteristics.getEffects() : []
    for (const addCharacteristic of this.targetingEffects.filter(isAddCharacteristics)) {
      const card = FactionCardsCharacteristics[addCharacteristic.card]
      if (isSpell(card)) effects.push(...card.getEffects())
    }
    return effects
  }

  private get benefits() {
    const characteristics = this.characteristics
    const benefits = isLand(characteristics) ? characteristics.getBenefits() : []
    for (const addCharacteristic of this.targetingEffects.filter(isAddCharacteristics)) {
      const card = FactionCardsCharacteristics[addCharacteristic.card]
      if (isLand(card)) benefits.push(...card.getBenefits())
    }
    return benefits
  }

  isImmuneTo(rule: CardRule) {
    return rule.item.location.player !== this.item.location.player && rule.isSpell && this.isImmuneToEnemySpells
  }

  get isImmuneToEnemySpells() {
    return this.effects.some(effect => effect.type === EffectType.ImmuneToEnemySpells)
  }

  get cardsThatMightAffect() {
    if (this.item.location.type === LocationType.AstralPlane) return []
    return this.material(MaterialType.FactionCard).location(location =>
      location.type === LocationType.AstralPlane ||
      (location.type === LocationType.Battlefield && getDistanceBetweenSquares(this.item.location as XYCoordinates, location as XYCoordinates) <= 1)
    ).getIndexes().map(index => getCardRule(this.game, index))
  }

  get effects(): Effect[] {
    if (!this.effectsCache) {
      this.effectsCache = this.processEffects()
      if (this.effectsCache.some(effect => effect.type === EffectType.IgnoreAttackDefenseModifiers)) {
        this.effectsCache = this.effectsCache.filter(effect => effect.type !== EffectType.Attack && effect.type !== EffectType.Defense)
      }
    }
    return this.effectsCache
  }

  private processEffects(effectPredicate?: (effect: Effect) => boolean): Effect[] {
    const cards = this.cardsThatMightAffect
    const mySkills = this.skills
    const myWeaknesses = this.weaknesses
    const isImmuneToEnemySpells = cards.some(card => {
      const abilitiesOfInterest = effectPredicate ? card.abilities.filter(ability => ability.effects.some(effectPredicate)) : card.abilities
        return abilitiesOfInterest.some(ability => ability.isApplicable(this.game, card.cardMaterial, this.cardMaterial)
          && ability.effects.some(effect => effect.type === EffectType.ImmuneToEnemySpells))
      }
    )
    return cards.flatMap(card => {
      const isEnemy = card.item.location.player !== this.item.location.player
      if (isImmuneToEnemySpells && card.isSpell && isEnemy) return []
      // Errata: creature are not affected by enemy creatures skills that they have, or allied creatures weaknesses that they have
      const isAnotherCreature = card.isCreature && card.index !== this.index
      const isAlliedCreature = isAnotherCreature && !isEnemy
      const isEnemyCreature = isAnotherCreature && isEnemy
      const abilitiesOfInterest = effectPredicate ? card.abilities.filter(ability => ability.effects.some(effectPredicate)) : card.abilities
      return abilitiesOfInterest.filter(ability => ability.isApplicable(this.game, card.cardMaterial, this.cardMaterial))
        .flatMap(ability => {
          const abilityEffects = ability.effects.filter(effect => {
            if (isAlliedCreature) {
              return !myWeaknesses.some(weakness => weakness.effects.some(weaknessEffect => isEqual(weaknessEffect, effect)))
            } else if (isEnemyCreature) {
              return !mySkills.some(skill => skill.effects.some(skillEffect => isEqual(skillEffect, effect)))
            }
            return true
          })
          const effects: Effect[] = []
          const multiplier = ability.getMultiplierFor(this.cardMaterial, this.game)
          for (let i = 0; i < multiplier; i++) {
            effects.push(...abilityEffects)
          }
          return effects
        })
    }).concat(...this.targetingEffects)
  }

  get targetingEffects(): Effect[] {
    const turnEffects = this.remind<TargetingEffect[]>(Memory.TurnEffects) ?? []
    const roundEffects = this.remind<TargetingEffect[]>(Memory.RoundEffects) ?? []
    return turnEffects.concat(roundEffects)
      .filter(targetingEffect => targetingEffect.targets.includes(this.index))
      .map(targetingEffect => targetingEffect.effect)
  }

  get attributes(): Attribute[] {
    const effects = this.effectsCache ?? this.processEffects(effect =>
      effect.type === EffectType.LoseAttributes || effect.type === EffectType.AddCharacteristics || effect.type === EffectType.GainAttributes
    )
    if (effects.some(effect => effect.type === EffectType.LoseAttributes && !effect.attributes)) {
      return []
    }
    const attributes = this.characteristics ? [...this.characteristics.getAttributes()] : []
    for (const effect of effects) {
      if (effect.type === EffectType.AddCharacteristics) {
        for (const attribute of FactionCardsCharacteristics[effect.card].getAttributes()) {
          this.addAttribute(attributes, attribute)
        }
      }
    }
    for (const gainAttribute of effects.filter(isGainAttributes)) {
      for (const attribute of gainAttribute.attributes) {
        this.addAttribute(attributes, attribute)
      }
    }
    return attributes.filter(attribute => !effects.some(effect =>
      effect.type === EffectType.LoseAttributes && effect.attributes?.includes(attribute.type))
    )
  }

  private addAttribute(attributes: Attribute[], attribute: Attribute) {
    const index = attributes.findIndex(a => a.type === attribute.type)
    if (index === -1) {
      attributes.push(attribute)
    } else {
      const existingAttribute = attributes[index]
      if ((isMovement(attribute) && isMovement(existingAttribute))
        || (isRangedAttack(attribute) && isRangedAttack(existingAttribute))) {
        attributes[index] = { type: attribute.type, distance: existingAttribute.distance + attribute.distance }
      }
    }
  }

  get token() {
    return this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(this.index)
  }

  get isActive() {
    return this.isSpell ||
      (this.hasActiveToken && !this.effects.some(effect => effect.type === EffectType.Deactivated))
  }

  get hasActiveToken() {
    const token = this.token.getItem()
    return token !== undefined && !token.location.rotation
  }

  get hasFlippedToken() {
    const token = this.token.getItem()
    return token !== undefined && token.location.rotation
  }

  get hasInitiative() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Initiative)
  }

  private get isInitiativeSequence() {
    return this.remind(Memory.IsInitiativeSequence)
  }

  get canBeActivated() {
    return this.isActive && (!this.isInitiativeSequence || this.hasInitiative || this.remind<number[]>(Memory.MovedCards).includes(this.index))
  }

  get canAttack() {
    return this.canBeActivated && this.characteristics?.canAttack
  }

  get canBeAttacked() {
    return !isSpell(this.characteristics)
  }

  canAttackTarget(opponent: number) {
    return this.isInRange(opponent) && !this.someEffectPreventsAttacking(opponent)
  }

  canMeleeAttackTarget(opponent: number) {
    return this.getAttackDistance(opponent) === 1 && !this.someEffectPreventsAttacking(opponent)
  }

  someEffectPreventsAttacking(opponent: number) {
    const attackers = this.remind<Attack[]>(Memory.Attacks).filter(attack => attack.targets.includes(opponent)).map(attack => attack.card)
    attackers.push(this.index)
    const ignoreFellowWeakness = attackers.flatMap(attacker => getCardRule(this.game, attacker).effects.filter(isIgnoreFellowGroupAttackWeakness))
    return this.effects.some(effect =>
        isAttackerConstraint(effect) && this.isPreventingAttack(effect, opponent)
      )
      || getCardRule(this.game, opponent).effects.some(effect =>
        (effect.type === EffectType.ImmuneToEnemySpells && this.isSpell)
        || (isDefenderConstraint(effect)
          && (this.isPreventingAttack(effect, opponent) || this.getAttackConstraint(effect).preventAttackGroup(attackers, opponent)))
      )
      || attackers.some(attacker =>
        getCardRule(this.game, attacker).effects.some(effect =>
            isAttackerConstraint(effect)
            && (!isNoGroupAttackWeakness(effect) || !ignoreFellowWeakness.some(effect => effect.filters.every(filter =>
              filter.filter(this.cardMaterial, this.material(MaterialType.FactionCard).index(attacker), this.game)
            )))
            && this.getAttackConstraint(effect).preventAttackGroup(attackers, opponent)
        )
      )
  }

  private isPreventingAttack(effect: AttackerConstraint | DefenderConstraint, opponent: number) {
    return this.getAttackConstraint(effect).preventAttack(this.index, opponent)
  }

  private getAttackConstraint(effect: AttackerConstraint | DefenderConstraint) {
    switch (effect.type) {
      case EffectType.CannotAttack:
      case EffectType.CannotBeAttacked:
        switch (effect.limitation) {
          case AttackLimitation.ByCreatures:
            return new NoAttackByCreatures(this.game)
          case AttackLimitation.ByGroupedCreatures:
            return new NoAttackByGroupedCreatures(this.game)
          case AttackLimitation.AdjacentCards:
            return new NoAttackOnAdjacentCard(this.game)
          case AttackLimitation.DuringInitiative:
            return new NoAttackDuringInitiative(this.game)
          case AttackLimitation.BottomRightCards:
            return new NoAttackBottomRightCards(this.game)
          case AttackLimitation.InGroup:
          case AttackLimitation.InGroupWeakness:
            return new NoAttackInGroup(this.game)
          case AttackLimitation.InGroupNotFamily:
            return new NoAttackInGroupNotFamily(this.game, this.families)
          default:
            return new NoAttack(this.game)
        }
      case EffectType.CanOnlyAttack:
      case EffectType.CanOnlyBeAttacked:
        switch (effect.condition) {
          case AttackCondition.ByCreaturesInGroup:
            return new AttackByCreaturesOnlyInGroup(this.game)
          case AttackCondition.EvenValueCards:
            return new AttackOnlyEvenValueCards(this.game)
          case AttackCondition.CreaturesIfAdjacent:
            return new CreaturesIfAdjacent(this.game)
          case AttackCondition.ByCreaturesInGroupOrSpells:
            return new AttackByCreaturesOnlyInGroupOrSpells(this.game)
        }
    }
  }

  getAttackDistance(opponent: number): number {
    const cardLocation = this.item.location
    const opponentRule = getCardRule(this.game, opponent)
    const opponentLocation = opponentRule.item.location
    if (!isXYCoordinates(cardLocation) || !isXYCoordinates(opponentLocation)) return Infinity
    let distance = getDistanceBetweenSquares(cardLocation, opponentLocation)
    if (distance === 1 && opponentRule.hasStealth && this.isCreature) distance++
    return distance
  }

  private isInRange(opponent: number) {
    return this.getAttackDistance(opponent) <= this.range
  }

  get range() {
    const rangedAttack = this.attributes.find(isRangedAttack)
    if (!rangedAttack) return 1
    const modifier = sumBy(this.effects, effect => effect.type === EffectType.ModifyRange ? effect.modifier : 0)
    return rangedAttack.distance + modifier
  }

  get hasStealth() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Stealth)
  }

  get canPerformAction() {
    if (this.characteristics?.action === undefined || !this.canBeActivated) return false
    const ActionRule = new ArackhanWarsRules(this.game).rules[this.characteristics.action]
    const actionRule = new ActionRule(this.game) as CardActionRule
    actionRule.cardIndex = this.index
    return actionRule.canPlay()
  }

  getDamagesInflicted(attackers: number[]): number | undefined {
    if (attackers.length === 0) return undefined
    if (this.isInvalidAttackersGroup(attackers)) {
      // We recursively try all attack groups made of all attackers but one, and keep the best value
      return max(attackers.map(excludedAttacker => this.getDamagesInflicted(attackers.filter(attacker => attacker !== excludedAttacker))))
    }
    return sumBy(attackers, attacker => getCardRule(this.game, attacker).getAttack(this.index))
  }

  isInvalidAttackersGroup(attackers: number[]) {
    return this.effects.some(effect =>
      isDefenderConstraint(effect) && this.isEffectInvalidAttackGroup(effect, attackers)
    ) || attackers.some(attacker =>
      getCardRule(this.game, attacker).effects.some(effect =>
        isAttackerConstraint(effect) && this.isEffectInvalidAttackGroup(effect, attackers)
      )
    )
  }

  private isEffectInvalidAttackGroup(effect: AttackerConstraint | DefenderConstraint, attackers: number[]) {
    return this.getAttackConstraint(effect).isInsufficientAttackGroup(attackers, this.index)
  }

  get attackCharacteristic() {
    return (this.characteristics as Creature | Spell)?.attack ?? 0
  }

  private get invertsAttackDefense() {
    return sumBy(this.effects, effect => effect.type === EffectType.InvertsAttackDefense ? 1 : 0) % 2 === 1
  }

  get attack() {
    return this.invertsAttackDefense ? this.getDefenseBeforeInvert() : this.getAttackBeforeInvert()
  }

  getAttack(target: number) {
    return this.invertsAttackDefense ? this.getDefenseBeforeInvert() : this.getAttackBeforeInvert(getCardRule(this.game, target))
  }

  private getAttackBeforeInvert(target?: CardRule) {
    const setAttackDefense = this.effects.find(isSetAttackDefense)
    const baseAttack = setAttackDefense?.attack ?? this.attackCharacteristic
    const attackModifier = sumBy(this.effects, effect => {
      switch (effect.type) {
        case EffectType.Attack:
          return this.respectsModifyAttackCondition(target, effect.condition) ? effect.modifier : 0
        case EffectType.AddCharacteristics:
          return (FactionCardsCharacteristics[effect.card] as Creature).attack
        default:
          return 0
      }
    }) + this.swarmBonus
    return Math.max(0, baseAttack + attackModifier)
  }

  private respectsModifyAttackCondition(target?: CardRule, condition?: ModifyAttackCondition) {
    switch (condition) {
      case ModifyAttackCondition.TargetFlyOrMoves:
        return target?.attributes.some(attribute => attribute.type === AttributeType.Flight || attribute.type === AttributeType.Movement)
      case ModifyAttackCondition.TargetFly:
        return target?.attributes.some(attribute => attribute.type === AttributeType.Flight)
      case ModifyAttackCondition.TargetInitiative:
        return target?.attributes.some(attribute => attribute.type === AttributeType.Initiative)
      default:
        return true
    }
  }

  get swarmBonus() {
    const families = this.families
    if (!this.families.length || !this.attributes.some(attribute => attribute.type === AttributeType.Swarm)) return 0
    const swarmSameCard = this.effects.some(effect => effect.type === EffectType.SwarmSameCard)
    return sumBy(this.material(MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes(), index => {
      if (index === this.index) return 0
      const cardRule = getCardRule(this.game, index)
      if (swarmSameCard) return intersection(cardRule.cardNames, this.cardNames).length
      return intersection(cardRule.families, families).length
    })
  }

  get families() {
    const families: Family[] = []
    if (isCreature(this.characteristics) && this.characteristics.family) families.push(this.characteristics.family)
    for (const addCharacteristic of this.targetingEffects.filter(isAddCharacteristics)) {
      const characteristics = FactionCardsCharacteristics[addCharacteristic.card]
      if (isCreature(characteristics) && characteristics.family) {
        families.push(characteristics.family)
      }
    }
    return uniq(families)
  }

  get defenseCharacteristic() {
    return (this.characteristics as Creature | Land)?.defense ?? 0
  }

  get defense() {
    return this.invertsAttackDefense ? this.getAttackBeforeInvert() : this.getDefenseBeforeInvert()
  }

  getDefense(attackers: number[]) {
    return this.invertsAttackDefense ? this.getAttackBeforeInvert() : this.getDefenseBeforeInvert(attackers)
  }

  private getDefenseBeforeInvert(attackers: number[] = []) {
    const setAttackDefense = this.effects.find(isSetAttackDefense)
    const baseDefense = setAttackDefense?.defense ?? this.defenseCharacteristic
    const defenseModifier = sumBy(this.effects, effect => {
      switch (effect.type) {
        case EffectType.Defense:
          return effect.condition !== ModifyDefenseCondition.AttackedByFlyOrMoves
          || attackers.some(attacker => getCardRule(this.game, attacker).attributes.some(attribute =>
            attribute.type === AttributeType.Flight || attribute.type === AttributeType.Movement
          ))
            ? effect.modifier : 0
        case EffectType.AddCharacteristics:
          return (FactionCardsCharacteristics[effect.card] as Creature).defense
        default:
          return 0
      }
    })
    return Math.max(0, baseDefense + defenseModifier)
  }

  get hasOmnistrike() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Omnistrike)
  }

  get omnistrikeTargets() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .filter((item, index) => {
        if (this.effects.some(effect => effect.type === EffectType.HitAllies) && getCardRule(this.game, index).isCreature) {
          return index !== this.index
        }
        return item.location.player !== this.owner
      })
      .getIndexes().filter(opponent => getCardRule(this.game, opponent).canBeAttacked && this.canMeleeAttackTarget(opponent))
  }

  get hasPerforation() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Perforation)
  }

  triggerAttackEffects() {
    const moves: MaterialMove[] = []
    for (const effect of this.effects) {
      if (effect.type === EffectType.Trigger && effect.condition === TriggerCondition.Attack) {
        moves.push(...this.getEffectAction(effect))
      }
    }
    return moves
  }

  triggerFailAttackEffects() {
    const moves: MaterialMove[] = []
    for (const effect of this.effects) {
      if (effect.type === EffectType.Trigger && effect.condition === TriggerCondition.FailAttack) {
        moves.push(...this.getEffectAction(effect))
      }
    }
    return moves
  }

  getEffectAction(effect: Trigger) {
    return effect.action === TriggerAction.Destroy ? this.destroyCard() : []
  }

  get canFly() {
    return this.attributes.some(attribute => attribute.type === AttributeType.Flight)
  }

  get movement() {
    const movement = this.attributes.find(isMovement)
    if (!movement) return 0
    return movement.distance + sumBy(this.effects, effect => effect.type === EffectType.ModifyMovement ? effect.modifier : 0)
  }

  get legalMovements() {
    return this.legalDestinations.map(({ x, y }) =>
      this.cardMaterial.moveItem({ type: LocationType.Battlefield, x, y, player: this.owner })
    )
  }

  get legalDestinations() {
    if (!this.canBeActivated) return []
    if (this.canFly) {
      return battlefieldCoordinates.filter(coordinates => this.canMoveOrSwapPosition(coordinates))
    } else if (this.movement > 0) {
      const paths = this.buildMovementPaths()
      const legalDestinations: XYCoordinates[] = []
      for (let y = 0; y < paths.length; y++) {
        for (let x = 0; x < paths[y].length; x++) {
          if (paths[y][x] === Path.CanStop) {
            legalDestinations.push({ x, y })
          }
        }
      }
      return legalDestinations
    } else {
      return []
    }
  }

  public buildMovementPaths(movement = this.movement) {
    const paths: Path[][] = [
      [X, X, X, _, _, _, _, X],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [X, _, _, _, _, X, X, X]
    ]
    const itemLocation = this.item.location as XYCoordinates
    paths[itemLocation.y][itemLocation.x] = Path.Blocked
    let previousLocations = [this.item.location as XYCoordinates]
    for (let distance = 1; distance <= movement; distance++) {
      const currentLocations: XYCoordinates[] = []
      for (const { x, y } of previousLocations) {
        const adjacentLocations = [{ x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 }]
        for (const { x, y } of adjacentLocations) {
          if (y >= 0 && y < paths.length && x >= 0 && x < paths[y].length && paths[y][x] === Path.Unknown) {
            paths[y][x] = this.getPath({ x, y }, distance)
            if (paths[y][x] !== Path.Blocked && !this.locationCancelsMovement(x, y)) {
              currentLocations.push({ x, y })
            }
          }
        }
      }
      previousLocations = currentLocations
    }
    return paths
  }

  private getPath(location: XYCoordinates, distance: number) {
    const card = this.getCardAt(location)
    if (card.length) {
      if (card.getItem()?.location.player !== this.owner) {
        return Path.Blocked
      }
      if (distance > 1 && !this.thereIsAnotherCardAdjacentTo(this.item.location as XYCoordinates)) return Path.CanGoThrough
      return getCardRule(this.game, card.getIndex()).canSwap(location, distance) ? Path.CanStop : Path.CanGoThrough
    }
    return this.isValidSpotToEndMovement(location, distance) ? Path.CanStop : Path.CanGoThrough
  }

  private getCardAt({ x, y }: XYCoordinates) {
    return this.material(MaterialType.FactionCard)
      .location(location => location.type === LocationType.Battlefield && location.x === x && location.y === y)
  }

  private isValidSpotToEndMovement(location: XYCoordinates, distance?: number) {
    return this.thereIsAnotherCardAdjacentTo(location)
      && (distance === undefined || this.canMoveAtDistance(location, distance))
  }

  private canMoveAtDistance(location: XYCoordinates, distance: number) {
    let movement = this.attributes.find(isMovement)?.distance ?? 0
    for (const effect of this.effects) {
      if (effect.type === EffectType.ModifyMovement) {
        if (effect.conditions.includes(ModifyMovementCondition.EndMovementAdjacentToEnemyCard)) {
          const enemyAdjacentCard = this.getOtherCardsAdjacentTo(location).player(player => player !== this.owner)
          if (enemyAdjacentCard.length === 0) continue
        }
        movement += effect.modifier
      }
    }
    return movement >= distance
  }

  public thereIsAnotherCardAdjacentTo(location: XYCoordinates) {
    return this.getOtherCardsAdjacentTo(location).length > 0
  }

  public getOtherCardsAdjacentTo(location: XYCoordinates = this.item.location as XYCoordinates) {
    return this.material(MaterialType.FactionCard).filter((item, index) =>
      index !== this.index
      && item.location.type === LocationType.Battlefield
      && areAdjacentSquares(item.location, location)
    )
  }

  private locationCancelsMovement(x: number, y: number) {
    const gameCopy: MaterialGame = JSON.parse(JSON.stringify(this.game))
    const cardCopy = new ArackhanWarsRules(gameCopy).material(MaterialType.FactionCard).index(this.index)
    cardCopy.getItem()!.location.x = x
    cardCopy.getItem()!.location.y = y
    const cardRules = new CardRule(gameCopy, this.index)
    return !cardRules.isActive || !cardRules.attributes.some(attribute => attribute.type === AttributeType.Movement)
      || (this.isInitiativeSequence && !cardRules.attributes.some(attribute => attribute.type === AttributeType.Initiative))
  }

  private canMoveOrSwapPosition(location: XYCoordinates, distance?: number) {
    const cardAtDestination = this.getCardAt(location)
    if (!cardAtDestination.length) return this.isValidSpotToEndMovement(location)
    if (cardAtDestination.getIndex() === this.index || cardAtDestination.getItem()!.location.player !== this.owner) {
      return false
    }
    return getCardRule(this.game, cardAtDestination.getIndex()).canSwap(this.item.location as XYCoordinates, distance)
  }

  private canSwap(location: XYCoordinates, distance?: number): boolean {
    if (!this.canBeActivated || this.remind<Attack[]>(Memory.Attacks).some(attack => attack.card === this.index)) return false
    if (this.canFly) return getDistanceBetweenSquares(location, this.item.location as XYCoordinates) === 1 || this.isValidSpotToEndMovement(location)
    else if (distance) {
      return this.canMoveAtDistance(location, distance) && (distance === 1 || this.thereIsAnotherCardAdjacentTo(location))
    } else return this.legalDestinations.some(({ x, y }) => location.x === x && location.y === y)
  }

  get canRegenerate(): boolean {
    return this.attributes.some(attribute => attribute.type === AttributeType.Regeneration) && this.isActive
  }

  get endOfTurnMoves(): MaterialMove[] {
    return this.effects.flatMap(effect =>
      effect.type === EffectType.EndOfTurn ? this.getEndOfTurnEffectMoves(effect) : []
    )
  }

  getEndOfTurnEffectMoves(effect: EndOfTurn): MaterialMove[] {
    if (effect.action === EndOfTurnAction.Move) {
      if (this.remind<number[]>(Memory.MovedCards).includes(this.index)) return []
      return battlefieldCoordinates.filter(coordinates =>
        this.getCardAt(coordinates).length === 0 && this.isValidSpotToEndMovement(coordinates)
      ).map(coordinates =>
        this.cardMaterial.moveItem({ type: LocationType.Battlefield, ...coordinates, player: this.owner })
      )
    }
    return []
  }

  cannotAttackAfterMoveTo({ x, y }: XYCoordinates): boolean {
    const movementWithoutAttack = sumBy(this.effects, effect =>
      effect.type === EffectType.ModifyMovement && effect.conditions.includes(ModifyMovementCondition.DoNotAttack) ? effect.modifier : 0
    )
    if (movementWithoutAttack === 0) return false
    const paths = this.buildMovementPaths(this.movement - movementWithoutAttack)
    return paths[y][x] !== Path.CanStop
  }

  get originalOwner() {
    const possession = (this.remind<TargetingEffect[]>(Memory.RoundEffects) ?? [])
      .find(t => t.targets.includes(this.index) && t.effect.type === EffectType.Possession)
    return possession ? (possession.effect as Possession).originalOwner : this.owner
  }

  destroyCard(destination?: Location): MaterialMove[] {
    const moves = this.removeMaterialFromCard()
    moves.push(this.cardMaterial.moveItem(destination ?? { type: LocationType.PlayerDiscard, player: this.originalOwner }))
    return moves
  }

  removeMaterialFromCard(): MaterialMove[] {
    return [
      ...this.material(MaterialType.FactionToken).parent(this.index).deleteItems(),
      ...this.material(MaterialType.FactionCard).parent(this.index).moveItems(item => ({ type: LocationType.PlayerDiscard, player: item.location.player }))
    ]
  }
}

let cardsRulesCache: {
  game: MaterialGame,
  rules: Record<number, CardRule>
} | undefined

export function getCardRule(game: MaterialGame, cardIndex: number) {
  if (cardsRulesCache?.game !== game) {
    cardsRulesCache = { game, rules: {} }
  }
  if (!cardsRulesCache.rules[cardIndex]) {
    cardsRulesCache.rules[cardIndex] = new CardRule(game, cardIndex)
  }
  return cardsRulesCache.rules[cardIndex]
}

export function resetCardsRulesCache() {
  cardsRulesCache = undefined
}

export enum Path {
  Unknown, Blocked, CanStop, CanGoThrough
}

const X = Path.Blocked
const _ = Path.Unknown
