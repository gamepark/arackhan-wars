import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { FactionCardsCharacteristics } from '../../../../material/FactionCard'
import { CardActionRule } from './CardActionRule'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { TurnEffectsMemory, TurnEffectType } from './TurnEffect'
import { isCreature } from '../../descriptions/base/Creature'

export class MimicryActionRule extends CardActionRule {

  getPlayerMoves() {
    const creaturesOnBattlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .filter((item) => isCreature(FactionCardsCharacteristics[item.id.front]))

    if (this.target === undefined) {
      return creaturesOnBattlefield.player(this.player).getIndexes()
        .map(index => this.rules().customMove(CustomMoveType.ChooseTarget, index))
    } else {
      return creaturesOnBattlefield.getIndexes()
        .filter(index => index !== this.target)
        .map(index => this.rules().customMove(CustomMoveType.ChooseTarget, index))
    }
  }

  get target() {
    return this.getMemory<{ target?: number }>().target
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.ChooseTarget) {
      if (this.target === undefined) {
        this.memorize({ target: move.data })
      } else {
        const { turnEffects = [] } = this.getMemory<TurnEffectsMemory>()
        this.memorize<TurnEffectsMemory>({ turnEffects: [...turnEffects, { type: TurnEffectType.Mimicry, target: this.target, copied: move.data }] })
        return super.afterCardAction()
      }
    }
    return []
  }
}
