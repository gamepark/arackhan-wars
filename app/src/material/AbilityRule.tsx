/** @jsxImportSource @emotion/react */
import { Trans, TransProps, useTranslation } from 'react-i18next'
import { Ability } from '@gamepark/arackhan-wars/material/cards/Ability'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { Effect, EffectType } from '@gamepark/arackhan-wars/material/cards/Effect'
import { merge } from 'lodash'
import { AttackCondition, AttackLimitation } from '@gamepark/arackhan-wars/material/cards/AttackLimitation'
import { css } from '@emotion/react'
import { TFunction } from 'i18next'

export const AbilityRule = ({ type, ability, card }: { type: string, ability: Ability, card: FactionCard }) => {
  const { t } = useTranslation()
  const targets = t(`target.${ability.filters.map(filter => filter.text).join('.')}`,
    ability.filters.reduce((values, filter) => merge(values, filter.values?.(t)), {}))
  return <>
    {ability.effects.map((effect, index) =>
      <p key={index}>
        <span css={css`text-transform: uppercase`}>{type}</span>
        &nbsp;
        <Trans values={{ targets }} {...getAbilityText(effect, targets, t, card)}><strong/><em/></Trans>
      </p>
    )}
  </>
}

const getAbilityText = (effect: Effect, targets: string, t: TFunction, card: FactionCard): TransProps<any> => {
  switch (effect.type) {
    case EffectType.Attack:
      return {
        defaults: effect.modifier > 0 ? 'ability.attack.gain' : 'ability.attack.lost',
        values: { targets, modifier: effect.modifier }
      }
    case EffectType.Defense:
      return {
        defaults: effect.modifier > 0 ? 'ability.defense.gain' : 'ability.defense.lost',
        values: { targets, modifier: effect.modifier }
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
      return {
        defaults: 'ability.attribute.gain',
        values: { targets, attribute: t(`attribute.${attribute.type}`, attribute as any) }
      }
    case EffectType.LoseSkills:
      return { defaults: 'ability.skills.lose' }
    case EffectType.Deactivated:
      return { defaults: 'ability.deactivate' }
    case EffectType.Trigger:
      return { defaults: 'ability.trigger.fail-attack.destroy', values: { card: t(`card.name.${card}`) } }
    case EffectType.CannotAttack:
      return {
        defaults: effect.limitation ?
          t(`ability.attack.limit.${attackLimitationText[effect.limitation]}`)
          : t('ability.attack.limit')
      }
    case EffectType.CanOnlyAttack:
      return { defaults: `ability.attack.condition.${attackConditionText[effect.condition]}` }
    case EffectType.CannotBeAttacked:
      return {
        defaults: effect.limitation ?
          t(`ability.attacked.limit.${attackLimitationText[effect.limitation]}`)
          : t('ability.attacked.limit'),
        values: { targets, card: t(`card.name.${card}`) }
      }
    case EffectType.CanOnlyBeAttacked:
      return {
        defaults: `ability.attacked.condition.${attackConditionText[effect.condition]}`,
        values: { targets, card: t(`card.name.${card}`) }
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
  [AttackLimitation.ByGroupedCreatures]: 'group-creatures'
}
