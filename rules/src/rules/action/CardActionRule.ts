import { MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isCreature } from '../../material/cards/Creature'
import { FactionCardsCharacteristics } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export abstract class CardActionRule extends PlayerTurnRule {
  cardIndex: number

  constructor(game: MaterialGame) {
    super(game)
    this.cardIndex = this.remind(Memory.ActionCard)
  }

  abstract canPlay(): boolean

  get actionCard() {
    return this.material(MaterialType.FactionCard).getItem(this.cardIndex)!
  }

  get cardRule() {
    return getCardRule(this.game, this.cardIndex)
  }

  afterCardAction() {
    const moves: MaterialMove[] = []
    if (this.cardRule.isSpell) {
      if (this.actionCard.location.type !== LocationType.PlayerDiscard) {
        moves.push(...this.discardActionCard())
      }
    } else {
      const token = this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(this.cardIndex)
      if (token.length) {
        moves.push(token.rotateItem(true))
      }
    }
    moves.push(this.rules().startRule(RuleId.ActivationRule))
    return moves
  }

  discardActionCard() {
    const card = this.material(MaterialType.FactionCard).index(this.cardIndex)
    const moves: MaterialMove[] = [card.moveItem({ type: LocationType.PlayerDiscard, player: this.player })]
    if (isCreature(FactionCardsCharacteristics[card.getItem()?.id.front])) {
      moves.unshift(this.material(MaterialType.FactionToken).parent(this.cardIndex).deleteItem())
    }
    return moves
  }

  onRuleEnd() {
    this.forget(Memory.ActionCard)
    return []
  }
}
