import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { FactionCardDetail, FactionCardKind } from '../../descriptions/FactionCardDetail'
import { AttackRules } from './AttackRules'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { LocationType } from '../../../../material/LocationType'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { MoveRules } from './MoveRules'
import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { EffectRule } from './EffectRule'


export class FactionCardRule extends MaterialRulesPart {
  readonly card: FactionCardDetail
  readonly item: Material<PlayerId, MaterialType, LocationType>
  readonly index: number

  constructor(game: MaterialGame, index: number) {
    super(game)
    this.item = this.material(MaterialType.FactionCard).index(index)
    this.card = getFactionCardDescription(this.item.getItem()!.id.front)
    this.index = index
  }


  isActive(initiative?: boolean): boolean {
    if (initiative && !this.card.hasInitiative()) return false

    // Spell is always considered activable
    const item = this.item.getItem()!
    const factionCard = getFactionCardDescription(item.id.front)
    if (factionCard.kind === FactionCardKind.Spell) return true

    // Other cards are activable if there is a non returned token on it
    return !!this
      .material(MaterialType.FactionToken)
      .parent(this.index)
      .rotation((rotation) => !rotation?.y)
      .length
  }

  attack(): AttackRules | undefined {
    if (!this.card.canAttack()) return
    return new AttackRules(this.game, this.item, this.card, this.index)
  }

  move(): MoveRules | undefined {
    if (!this.card.hasMovement()) return
    return new MoveRules(this.game, this.item, this.card, this.index)
  }

  effect(): EffectRule | undefined {
    return
  }

  onRoundEnd(): MaterialMove[] {
    return []
  }

  onTurnEnd(): MaterialMove[] {
    return []
  }

  afterActivation(): MaterialMove[] {
    const card = getFactionCardDescription(this.material(MaterialType.FactionCard).getItem(this.index)!.id.front)
    if (card.kind === FactionCardKind.Spell) return []

    return this.material(MaterialType.FactionToken).parent(this.index).moveItems({ rotation: { y: 1 } })
  }

  afterDiscard(): MaterialMove[] {
    return []
  }

  beforeDiscard(): MaterialMove[] {
    return []
  }

  onPlaceCard(): MaterialMove[] {
    return []
  }

  onMoveAdjacentCard(_cardIndex: number) {
    return []
  }

  discardCard(): MaterialMove[] {

    const moves: MaterialMove[] = []

    const factionToken = this.material(MaterialType.FactionToken).parent(this.index)
    if (factionToken.getItem()) {
      moves.push(factionToken.deleteItem())
    }

    moves.push(
      this.item
        .moveItem({ location: { type: LocationType.PlayerDiscard, player: this.item.getItem()!.location.player } })
    )

    return moves
  }
}
