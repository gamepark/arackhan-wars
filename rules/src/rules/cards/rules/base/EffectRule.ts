import { MaterialType } from '../../../../material/MaterialType'
import { areAdjacent } from '../../../../utils/adjacent.utils'
import { Material, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { CardAttributeType, FactionCardDetail } from '../../descriptions/FactionCardDetail'

export type CardModification = {
  attack?: number
  defense?: number
  looseAllAttributes?: boolean
  looseSkill?: boolean
  protectedFromAttacks?: boolean
  extraAttributes?: CardAttributeType[]
  lostAttributes?: CardAttributeType[]
}

export class EffectRule extends MaterialRulesPart {
  readonly card: FactionCardDetail
  readonly item: Material
  readonly index: number

  constructor(game: MaterialGame, item: Material, card: FactionCardDetail, index: number) {
    super(game)
    this.item = item
    this.card = card
    this.index = index
  }

  // Used to apply block skills before any other skills
  blockSkills: boolean = false
  blockAllAttributes: boolean = false
  blockAttack: boolean = false


  isLoosingAttributes(_isAlly: boolean, _cardIndex: number, _attribute?: CardAttributeType): boolean {
    if (!this.isApplicable(_isAlly, _cardIndex)) return false
    return this.blockAllAttributes
  }

  isLoosingSkill(_isAlly: boolean, _cardIndex: number): boolean {
    if (!this.isApplicable(_isAlly, _cardIndex)) return false
    return this.blockSkills
  }

  isProtectedFromAttacks(_isAlly: boolean, _cardIndex: number): boolean {
    if (!this.isApplicable(_isAlly, _cardIndex)) return false
    return this.blockAttack
  }

  isApplicable(_isAlly: boolean, _cardIndex: number): boolean {
    return true
  }

  getModification(cardIndex: number): CardModification | undefined {
    const comparedCard = this.material(MaterialType.FactionCard).index(cardIndex).getItem()!
    const isAlly = this.isAlly(cardIndex)
    if (!this.isAdjacentTo(comparedCard) || !this.isApplicable(isAlly, cardIndex)) return

    const attackModification = this.getAttackModifier(isAlly, comparedCard, cardIndex)
    return {
      attack: attackModification?.attack ?? 0,
      defense: attackModification?.defense ?? 0,
      looseSkill: this.isLoosingSkill(isAlly, cardIndex),
      looseAllAttributes: this.isLoosingAttributes(isAlly, cardIndex),
      protectedFromAttacks: this.isProtectedFromAttacks(isAlly, cardIndex),
      extraAttributes: this.getExtraAttributes(isAlly, cardIndex),
      lostAttributes: this.getLostAttributes(isAlly, cardIndex)
    }
  }

  getAttackModifier(_isAlly: boolean, _cardItem: MaterialItem, _cardIndex: number): CardModification | undefined {
    return
  }

  getExtraAttributes(_isAlly: boolean, _cardIndex: number): CardAttributeType[] {
    return []
  }

  getLostAttributes(_isAlly: boolean, _cardIndex: number): CardAttributeType[] {
    return []
  }

  isAlly(cardIndex: number) {
    const thisFactionToken = this.material(MaterialType.FactionToken).parent(this.index).getItem()
    const cardFactionToken = this.material(MaterialType.FactionToken).parent(cardIndex).getItem()

    if (thisFactionToken && cardFactionToken) return thisFactionToken.id.front === cardFactionToken.id.front
    const cardFaction = this.material(MaterialType.FactionCard).index(cardIndex).getItem()!
    return cardFaction.id.back === this.card.faction
  }

  isAdjacentTo(card: MaterialItem) {
    return areAdjacent(this.item.getItem()!, card)
  }
}
