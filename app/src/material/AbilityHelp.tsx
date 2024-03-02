/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Ability, AbilityMultiplier } from '@gamepark/arackhan-wars/material/cards/Ability'
import { itself } from '@gamepark/arackhan-wars/material/cards/AbilityTargetFilter'
import { AttackCondition, AttackLimitation } from '@gamepark/arackhan-wars/material/cards/AttackLimitation'
import {
  Effect,
  EffectType,
  ExtraScoreType,
  ModifyAttackCondition,
  ModifyDefenseCondition,
  ModifyMovementCondition,
  TriggerAction,
  TriggerCondition
} from '@gamepark/arackhan-wars/material/cards/Effect'
import { FactionCard, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { TFunction } from 'i18next'
import { merge } from 'lodash'
import { Trans, TransProps, useTranslation } from 'react-i18next'

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

const getAbilityText = (card: FactionCard, ability: Ability, effect: Effect, t: TFunction): TransProps<any> => {
  const targets = ability.filters[0] === itself ? '' : t(`targets.${ability.filters.map(filter => filter.text).join('.')}`,
    ability.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {}))

  switch (effect.type) {
    case EffectType.Attack:
      if (ability.multipliers === AbilityMultiplier.ExtraFactionToken) {
        return {
          defaults: 'ability.attack.per.token',
          values: { modifier: effect.modifier }
        }
      } else if (Array.isArray(ability.multipliers)) {
        return {
          defaults: 'ability.attack.per',
          values: {
            multipliers: t(`targets.${ability.multipliers.map(filter => filter.text).join('.')}`,
              ability.multipliers.reduce((values, filter) => merge(values, filter.values?.(t)), {})),
            modifier: effect.modifier
          }
        }
      } else if (ability.condition) {
        return {
          defaults: 'ability.attack.gain.if',
          values: { modifier: effect.modifier, condition: ability.condition.getText(t) }
        }
      } else if (effect.condition === ModifyAttackCondition.TargetFlyOrMoves) {
        return {
          defaults: 'ability.attack.gain.if',
          values: { modifier: effect.modifier, condition: t('if.attack.fly-move') }
        }
      } else {
        return {
          defaults: effect.modifier > 0 ? 'ability.attack.gain' : 'ability.attack.lost',
          values: { targets, modifier: effect.modifier }
        }
      }
    case EffectType.Defense:
      if (ability.multipliers) {
        const multipliers = t(`targets.${ability.multipliers.map(filter => filter.text).join('.')}`,
          ability.multipliers.reduce((values, filter) => merge(values, filter.values?.(t)), {}))
        if (targets) {
          return {
            defaults: 'ability.defense.gain.per',
            values: { targets, multipliers, modifier: effect.modifier }
          }
        } else {
          return {
            defaults: 'ability.defense.per',
            values: { multipliers, modifier: effect.modifier }
          }
        }
      } else if (ability.condition) {
        return {
          defaults: 'ability.defense.gain.if',
          values: { modifier: effect.modifier, condition: ability.condition.getText(t) }
        }
      } else if (effect.condition === ModifyDefenseCondition.AttackedByFlyOrMoves) {
        return {
          defaults: 'ability.defense.targets.gain.if',
          values: { modifier: effect.modifier, targets, condition: t('if.defense.fly-move') }
        }
      } else {
        return {
          defaults: effect.modifier > 0 ? 'ability.defense.gain' : 'ability.defense.lost',
          values: { targets, modifier: effect.modifier }
        }
      }
    case EffectType.LoseAttributes:
      if (effect.attributes?.length === 1) {
        return {
          defaults: 'ability.attribute.lose',
          values: { targets, attribute: t(`attribute.${effect.attributes[0]}`) }
        }
      } else {
        return { defaults: 'ability.attributes.lose' }
      }
    case EffectType.GainAttributes:
      const attribute = effect.attributes[0]
      if (!targets) {
        return {
          defaults: 'ability.attribute.gain.if',
          values: { attribute: t(`attribute.${attribute.type}`, attribute), condition: ability.condition!.getText(t) }
        }
      } else if (!ability.condition) {
        return {
          defaults: 'ability.attribute.give',
          values: { targets, attribute: t(`attribute.${attribute.type}`, attribute) }
        }
      } else {
        return {
          defaults: 'ability.attribute.give.if',
          values: { targets, attribute: t(`attribute.${attribute.type}`, attribute), condition: ability.condition.getText(t) }
        }
      }
    case EffectType.LoseSkills:
      return { defaults: 'ability.skills.lose' }
    case EffectType.Deactivated:
      return { defaults: 'ability.deactivate' }
    case EffectType.Trigger:
      switch (effect.condition) {
        case TriggerCondition.Attack:
          if (effect.action === TriggerAction.Destroy) {
            if (targets) {
              return { defaults: 'ability.targets.trigger.attack.destroy', values: { targets } }
            } else {
              return { defaults: 'ability.trigger.attack.destroy', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
            }
          }
          break
        case TriggerCondition.FailAttack:
          if (effect.action === TriggerAction.Destroy) {
            return { defaults: 'ability.trigger.fail-attack.destroy', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
          }
          break
        case TriggerCondition.DestroyFlyOrMove:
          if (effect.action === TriggerAction.PutCardUnder) {
            return { defaults: 'ability.trigger.dragon-trophy', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
          }
          break
        case TriggerCondition.EndOfRound:
          if (effect.action === TriggerAction.Destroy) {
            return { defaults: 'ability.trigger.end-round.destroy', values: { targets } }
          }
          break
      }
      return {}
    case EffectType.CannotAttack:
      return {
        defaults: effect.limitation ?
          `ability.attack.limit.${attackLimitationText[effect.limitation]}`
          : 'ability.attack.limit'
      }
    case EffectType.CanOnlyAttack:
      if (targets) {
        return { defaults: `ability.targets.attack.condition.${attackConditionText[effect.condition]}`, values: { targets } }
      } else {
        return { defaults: `ability.attack.condition.${attackConditionText[effect.condition]}` }
      }
    case EffectType.CannotBeAttacked:
      return {
        defaults: effect.limitation ?
          `ability.attacked.limit.${attackLimitationText[effect.limitation]}`
          : 'ability.attacked.limit',
        values: { targets, card: t(`card.name.${getUniqueCard(card)}`) }
      }
    case EffectType.CanOnlyBeAttacked:
      if (targets) {
        return {
          defaults: `ability.targets.attacked.condition.${attackConditionText[effect.condition]}`,
          values: { targets, card: t(`card.name.${getUniqueCard(card)}`) }
        }
      } else {
        return {
          defaults: `ability.attacked.condition.${attackConditionText[effect.condition]}`,
          values: { card: t(`card.name.${getUniqueCard(card)}`) }
        }
      }
    case EffectType.ImmuneToEnemySpells:
      if (ability.condition) {
        return { defaults: 'ability.spell-immune.if', values: { condition: ability.condition.getText(t) } }
      } else if (targets) {
        return { defaults: 'ability.spell-immune.targets', values: { targets } }
      } else {
        return { defaults: 'ability.spell-immune' }
      }
    case EffectType.EndOfTurn:
      return { defaults: 'ability.end-of-turn-move', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
    case EffectType.IgnoreAttackDefenseModifiers:
      return { defaults: 'ability.ignore-modifiers', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
    case EffectType.ModifyMovement:
      if (effect.conditions.includes(ModifyMovementCondition.DoNotAttack)
        && effect.conditions.includes(ModifyMovementCondition.EndMovementAdjacentToEnemyCard)) {
        return { defaults: 'ability.modify.movement.if', values: { modifier: effect.modifier, card: t(`card.name.${getUniqueCard(card)}`) } }
      }
      return {}
    case EffectType.InvertsAttackDefense:
      return { defaults: 'ability.inverts-attack-defense', values: { targets } }
    case EffectType.ModifyRange:
      return { defaults: 'ability.range.add.targets', values: { targets, modifier: effect.modifier } }
    case EffectType.ExtraScore:
      switch (effect.score) {
        case ExtraScoreType.ValueOfCardsUnder:
          return { defaults: 'ability.score.cards-under', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
        case ExtraScoreType.MastersOfAracKhan:
          return { defaults: 'ability.score.masters' }
        default:
          return {}
      }
    case EffectType.IgnoreFellowGroupAttackerConstraint:
      return {
        defaults: 'ability.ignore-fellow-weakness',
        values: {
          targets: t(`targets.${effect.filters.map(filter => filter.text).join('.')}`,
            effect.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {})),
          card: t(`card.name.${getUniqueCard(card)}`)
        }
      }
    default:
      return {}
  }
}

const attackConditionText: Record<AttackCondition, string> = {
  [AttackCondition.ByCreaturesInGroup]: 'creatures-in-group',
  [AttackCondition.EvenValueCards]: 'even-value'
}

const attackLimitationText: Record<AttackLimitation, string> = {
  [AttackLimitation.ByCreatures]: 'creatures',
  [AttackLimitation.ByGroupedCreatures]: 'group-creatures',
  [AttackLimitation.AdjacentCards]: 'adjacent-cards',
  [AttackLimitation.DuringInitiative]: 'during-initiative',
  [AttackLimitation.BottomRightCards]: 'bottom-right',
  [AttackLimitation.InGroup]: 'in-group'
}
