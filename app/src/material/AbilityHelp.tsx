import { css } from '@emotion/react'
import { Ability, AbilityMultiplier } from '@gamepark/arackhan-wars/material/cards/Ability'
import { itself } from '@gamepark/arackhan-wars/material/cards/AbilityTargetFilter'
import { AttackCondition, AttackLimitation } from '@gamepark/arackhan-wars/material/cards/AttackLimitation'
import { Creature } from '@gamepark/arackhan-wars/material/cards/Creature'
import {
  Effect,
  EffectType,
  ExtraScoreType,
  ModifyAttackCondition,
  ModifyDefenseCondition,
  ModifyMovementCondition,
  RoundLimitation,
  TriggerAction,
  TriggerCondition
} from '@gamepark/arackhan-wars/material/cards/Effect'
import { FactionCard, FactionCardsCharacteristics, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { merge } from 'es-toolkit/compat'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'

export const AbilityHelp = ({ type, ability, card }: { type: string, ability: Ability, card: FactionCard }) => {
  const { t } = useTranslation()
  return <>
    {ability.effects.map((effect, index) =>
      <p key={index}>
        <span css={css`text-transform: uppercase`}>{type}</span>
        &nbsp;
        <Trans {...getAbilityText(card, ability, effect, t)}><strong/><em/></Trans>
      </p>
    )}
  </>
}

const getAbilityText = (card: FactionCard, ability: Ability, effect: Effect, t: TFunction) => {
  const targets = ability.filters[0] === itself ? '' : t(`targets.${ability.filters.map(filter => filter.text).join('.')}`,
    ability.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {}))

  switch (effect.type) {
    case EffectType.Attack:
      if (ability.multipliers === AbilityMultiplier.ExtraFactionToken) {
        return {
          i18nKey: 'ability.attack.per.token',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
          }
        }
      } else if (Array.isArray(ability.multipliers)) {
        return {
          i18nKey: 'ability.attack.per',
          values: {
            multipliers: t(`targets.${ability.multipliers.map(filter => filter.text).join('.')}`,
              ability.multipliers.reduce((values, filter) => merge(values, filter.values?.(t)), {})),
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
          }
        }
      } else if (ability.condition) {
        return {
          i18nKey: 'ability.attack.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            condition: ability.condition.getText(t)
          }
        }
      } else if (effect.condition !== undefined) {
        return {
          i18nKey: 'ability.attack.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            condition: t(attackModifierConditionText[effect.condition])
          }
        }
      } else {
        return {
          i18nKey: 'ability.attack.targets',
          values: {
            targets,
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
          }
        }
      }
    case EffectType.Defense:
      if (ability.multipliers) {
        const multipliers = t(`targets.${ability.multipliers.map(filter => filter.text).join('.')}`,
          ability.multipliers.reduce((values, filter) => merge(values, filter.values?.(t)), {}))
        if (targets) {
          return {
            i18nKey: 'ability.defense.targets.per',
            values: {
              targets,
              multipliers,
              modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
            }
          }
        } else {
          return {
            i18nKey: 'ability.defense.per',
            values: {
              multipliers,
              modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
            }
          }
        }
      } else if (ability.condition) {
        return {
          i18nKey: 'ability.defense.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            condition: ability.condition.getText(t)
          }
        }
      } else if (effect.condition === ModifyDefenseCondition.AttackedByFlyOrMoves) {
        return {
          i18nKey: 'ability.defense.targets.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            targets,
            condition: t('if.defense.fly-move')
          }
        }
      } else {
        return {
          i18nKey: 'ability.defense.targets',
          values: {
            targets,
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
          }
        }
      }
    case EffectType.LoseAttributes:
      if (effect.attributes?.length === 1) {
        return {
          i18nKey: 'ability.attribute.lose',
          values: { targets, attribute: t(`attribute.${effect.attributes[0]}`) }
        }
      } else {
        return { i18nKey: 'ability.attributes.lose', values: { targets } }
      }
    case EffectType.GainAttributes: {
      const attribute = effect.attributes[0]
      if (!targets) {
        return {
          i18nKey: 'ability.attribute.gain.if',
          values: { attribute: t(`attribute.${attribute.type}`, attribute), condition: ability.condition!.getText(t) }
        }
      } else if (!ability.condition) {
        return {
          i18nKey: 'ability.attribute.give',
          values: { targets, attribute: t(`attribute.${attribute.type}`, attribute) }
        }
      } else {
        return {
          i18nKey: 'ability.attribute.give.if',
          values: { targets, attribute: t(`attribute.${attribute.type}`, attribute), condition: ability.condition.getText(t) }
        }
      }
    }
    case EffectType.LoseSkills:
      return { i18nKey: 'ability.skills.lose', values: { targets } }
    case EffectType.Deactivated:
      return { i18nKey: 'ability.deactivate', values: { targets } }
    case EffectType.Trigger:
      switch (effect.condition) {
        case TriggerCondition.Attack:
          if (effect.action === TriggerAction.Destroy) {
            if (targets) {
              return { i18nKey: 'ability.targets.trigger.attack.destroy', values: { targets } }
            } else {
              return { i18nKey: 'ability.trigger.attack.destroy', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
            }
          }
          break
        case TriggerCondition.FailAttack:
          if (effect.action === TriggerAction.Destroy) {
            return { i18nKey: 'ability.trigger.fail-attack.destroy', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
          }
          break
        case TriggerCondition.DestroyFlyOrMove:
          if (effect.action === TriggerAction.PutCardUnder) {
            return { i18nKey: 'ability.trigger.dragon-trophy', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
          }
          break
        case TriggerCondition.EndOfRound:
          if (effect.action === TriggerAction.Destroy) {
            return { i18nKey: 'ability.trigger.end-round.destroy', values: { targets } }
          }
          break
      }
      return {}
    case EffectType.CannotAttack: {
      {
        const values: Record<string, string> = {}
        if (effect.limitation === AttackLimitation.InGroupNotFamily) {
          values.family = t(`card.family.${(FactionCardsCharacteristics[card] as Creature).family}`)
        }
        if (targets) {
          values.targets = targets
          return {
            i18nKey: effect.limitation ?
              `ability.targets.attack.limit.${attackLimitationText[effect.limitation]}`
              : 'ability.targets.attack.limit',
            values
          }
        } else {
          return {
            i18nKey: effect.limitation ?
              `ability.attack.limit.${attackLimitationText[effect.limitation]}`
              : 'ability.attack.limit',
            values
          }
        }
      }
    }
    case EffectType.CanOnlyAttack:
      if (targets) {
        return { i18nKey: `ability.targets.attack.condition.${attackConditionText[effect.condition]}`, values: { targets } }
      } else {
        return { i18nKey: `ability.attack.condition.${attackConditionText[effect.condition]}` }
      }
    case EffectType.CannotBeAttacked:
      return {
        i18nKey: effect.limitation ?
          `ability.attacked.limit.${attackLimitationText[effect.limitation]}`
          : 'ability.attacked.limit',
        values: { targets, card: t(`card.name.${getUniqueCard(card)}`) }
      }
    case EffectType.CanOnlyBeAttacked:
      if (targets) {
        return {
          i18nKey: `ability.targets.attacked.condition.${attackConditionText[effect.condition]}`,
          values: { targets, card: t(`card.name.${getUniqueCard(card)}`) }
        }
      } else {
        return {
          i18nKey: `ability.attacked.condition.${attackConditionText[effect.condition]}`,
          values: { card: t(`card.name.${getUniqueCard(card)}`) }
        }
      }
    case EffectType.ImmuneToEnemySpells:
      if (ability.condition) {
        return { i18nKey: 'ability.spell-immune.if', values: { condition: ability.condition.getText(t) } }
      } else if (targets) {
        return { i18nKey: 'ability.spell-immune.targets', values: { targets } }
      } else {
        return { i18nKey: 'ability.spell-immune' }
      }
    case EffectType.EndOfTurn:
      return { i18nKey: 'ability.end-of-turn-move', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
    case EffectType.IgnoreAttackDefenseModifiers:
      return { i18nKey: 'ability.ignore-modifiers', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
    case EffectType.ModifyMovement:
      if (effect.conditions.includes(ModifyMovementCondition.DoNotAttack)
        && effect.conditions.includes(ModifyMovementCondition.EndMovementAdjacentToEnemyCard)) {
        return { i18nKey: 'ability.modify.movement.if', values: { modifier: effect.modifier, card: t(`card.name.${getUniqueCard(card)}`) } }
      }
      return {}
    case EffectType.InvertsAttackDefense:
      return { i18nKey: 'ability.inverts-attack-defense', values: { targets } }
    case EffectType.ModifyRange:
      return { i18nKey: 'ability.range.add.targets', values: { targets, modifier: effect.modifier } }
    case EffectType.ExtraScore:
      switch (effect.score) {
        case ExtraScoreType.ValueOfCardsUnder:
          return { i18nKey: 'ability.score.cards-under', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
        case ExtraScoreType.MastersOfAracKhan:
          return { i18nKey: 'ability.score.masters' }
        default:
          return {}
      }
    case EffectType.IgnoreFellowGroupAttackWeakness:
      return {
        i18nKey: 'ability.ignore-fellow-weakness',
        values: {
          targets: t(`targets.${effect.filters.map(filter => filter.text).join('.')}`,
            effect.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {})),
          card: t(`card.name.${getUniqueCard(card)}`)
        }
      }
    case EffectType.CannotBePlayed:
      if (effect.limitation === RoundLimitation.LastRound) {
        return { i18nKey: 'ability.cannot-place.last-turn' }
      }
      return {}
    case EffectType.HitAllies:
      return { i18nKey: 'ability.hit-allies', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
    case EffectType.SwarmSameCard:
      return { i18nKey: 'ability.swarm-same', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
    default:
      return {}
  }
}

const attackConditionText: Record<AttackCondition, string> = {
  [AttackCondition.ByCreaturesInGroup]: 'creatures-in-group',
  [AttackCondition.EvenValueCards]: 'even-value',
  [AttackCondition.CreaturesIfAdjacent]: 'creatures-if-adjacent',
  [AttackCondition.ByCreaturesInGroupOrSpells]: 'creatures-in-group-or-spells'
}

const attackLimitationText: Record<AttackLimitation, string> = {
  [AttackLimitation.ByCreatures]: 'creatures',
  [AttackLimitation.ByGroupedCreatures]: 'group-creatures',
  [AttackLimitation.AdjacentCards]: 'adjacent-cards',
  [AttackLimitation.DuringInitiative]: 'during-initiative',
  [AttackLimitation.BottomRightCards]: 'bottom-right',
  [AttackLimitation.InGroup]: 'in-group',
  [AttackLimitation.InGroupWeakness]: 'in-group',
  [AttackLimitation.InGroupNotFamily]: 'in-group-not-family'
}

const attackModifierConditionText: Record<ModifyAttackCondition, string> = {
  [ModifyAttackCondition.TargetFlyOrMoves]: 'if.attack.fly-move',
  [ModifyAttackCondition.TargetFly]: 'if.attack.fly',
  [ModifyAttackCondition.TargetInitiative]: 'if.attack.initiative'
}