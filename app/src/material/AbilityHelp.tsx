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
          defaults: 'ability.attack.per.token',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
          }
        }
      } else if (Array.isArray(ability.multipliers)) {
        return {
          defaults: 'ability.attack.per',
          values: {
            multipliers: t(`targets.${ability.multipliers.map(filter => filter.text).join('.')}`,
              ability.multipliers.reduce((values, filter) => merge(values, filter.values?.(t)), {})),
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
          }
        }
      } else if (ability.condition) {
        return {
          defaults: 'ability.attack.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            condition: ability.condition.getText(t)
          }
        }
      } else if (effect.condition !== undefined) {
        return {
          defaults: 'ability.attack.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            condition: t(attackModifierConditionText[effect.condition])
          }
        }
      } else {
        return {
          defaults: 'ability.attack.targets',
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
            defaults: 'ability.defense.targets.per',
            values: {
              targets,
              multipliers,
              modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
            }
          }
        } else {
          return {
            defaults: 'ability.defense.per',
            values: {
              multipliers,
              modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
            }
          }
        }
      } else if (ability.condition) {
        return {
          defaults: 'ability.defense.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            condition: ability.condition.getText(t)
          }
        }
      } else if (effect.condition === ModifyDefenseCondition.AttackedByFlyOrMoves) {
        return {
          defaults: 'ability.defense.targets.if',
          values: {
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier,
            targets,
            condition: t('if.defense.fly-move')
          }
        }
      } else {
        return {
          defaults: 'ability.defense.targets',
          values: {
            targets,
            modifier: effect.modifier < 0 ? effect.modifier : '+' + effect.modifier
          }
        }
      }
    case EffectType.LoseAttributes:
      if (effect.attributes?.length === 1) {
        return {
          defaults: 'ability.attribute.lose',
          values: { targets, attribute: t(`attribute.${effect.attributes[0]}`) }
        }
      } else {
        return { defaults: 'ability.attributes.lose', values: { targets } }
      }
    case EffectType.GainAttributes: {
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
    }
    case EffectType.LoseSkills:
      return { defaults: 'ability.skills.lose', values: { targets } }
    case EffectType.Deactivated:
      return { defaults: 'ability.deactivate', values: { targets } }
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
    case EffectType.CannotAttack: {
      {
        const values: Record<string, string> = {}
        if (effect.limitation === AttackLimitation.InGroupNotFamily) {
          values.family = t(`card.family.${(FactionCardsCharacteristics[card] as Creature).family}`)
        }
        if (targets) {
          values.targets = targets
          return {
            defaults: effect.limitation ?
              `ability.targets.attack.limit.${attackLimitationText[effect.limitation]}`
              : 'ability.targets.attack.limit',
            values
          }
        } else {
          return {
            defaults: effect.limitation ?
              `ability.attack.limit.${attackLimitationText[effect.limitation]}`
              : 'ability.attack.limit',
            values
          }
        }
      }
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
    case EffectType.IgnoreFellowGroupAttackWeakness:
      return {
        defaults: 'ability.ignore-fellow-weakness',
        values: {
          targets: t(`targets.${effect.filters.map(filter => filter.text).join('.')}`,
            effect.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {})),
          card: t(`card.name.${getUniqueCard(card)}`)
        }
      }
    case EffectType.CannotBePlayed:
      if (effect.limitation === RoundLimitation.LastRound) {
        return { defaults: 'ability.cannot-place.last-turn' }
      }
      return {}
    case EffectType.HitAllies:
      return { defaults: 'ability.hit-allies', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
    case EffectType.SwarmSameCard:
      return { defaults: 'ability.swarm-same', values: { card: t(`card.name.${getUniqueCard(card)}`) } }
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