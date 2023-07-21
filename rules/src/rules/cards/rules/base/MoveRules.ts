import { Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { FactionCardDetail } from '../../descriptions/base/FactionCardDetail'
import { isMovementAttribute } from '../attribute/MovementAttribute'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'

export class MoveRules extends MaterialRulesPart {

  constructor(game: MaterialGame,
              readonly item: Material,
              readonly card: FactionCardDetail,
              readonly index: number,
              readonly effectHelper: FactionCardEffectHelper) {
    super(game)
  }


  getLegalMovements(): MaterialMove[] {
    return this.card
      .getAttributes()
      .filter(isMovementAttribute)
      .flatMap((attribute) => attribute.getAttributeRule(this.game).getLegalMovements(this.item, this.effectHelper))
  }
}
