import { isSelectItemType, ItemMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class PossessionActionRule extends CardActionRule {
  canPlay(): boolean {
    return this.validTargets.length > 0
  }

  get validTargets() {
    return this.material(MaterialType.FactionCard)
      .filter((item, index) => {
        if (item.location.type !== LocationType.Battlefield || item.location.player === this.player) return false
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && !cardRule.isImmuneToEnemySpells
      })

  }

  getPlayerMoves() {
    return this.validTargets.selectItems()
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.FactionCard)(move)) {
      const card = this.material(MaterialType.FactionCard).getItem(move.itemIndex)!
      this.memorize<number[]>(Memory.OncePerRound, cards => [...cards, this.cardIndex])
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [
        ...effects,
        {
          targets: [move.itemIndex], effect: {
            type: EffectType.Possession,
            originalOwner: card.location.player!
          }
        }
      ])
      delete card.selected
      card.location.player = this.player
      return [
        ...this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(move.itemIndex).deleteItems(),
        this.material(MaterialType.FactionToken).createItem({
          id: this.remind(Memory.PlayerFactionToken, this.player),
          location: { parent: move.itemIndex, type: LocationType.FactionTokenSpace, player: this.player }
        }),
        this.rules().startRule(RuleId.ActivationRule)
      ]
    }
    return []
  }
}
