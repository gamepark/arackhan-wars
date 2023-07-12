import { MaterialType } from '../../../../material/MaterialType'
import { areAdjacent } from '../../../../utils/IsAdjacent'
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

  isLoosingAttributes(_cardIndex: number, _isAlly: boolean, _attribute?: CardAttributeType): boolean {
    if (!this.isEffectApplicable(_cardIndex, _isAlly)) return false
    return this.blockAllAttributes
  }

  isLoosingSkill(_cardIndex: number, _isAlly: boolean): boolean {
    if (!this.isEffectApplicable(_cardIndex, _isAlly)) return false
    return this.blockSkills
  }

  isAttackBlocked(_cardIndex: number, _isAlly: boolean): boolean {
    if (!this.isEffectApplicable(_cardIndex, _isAlly)) return false
    return this.blockAttack
  }

  isEffectApplicable(_cardIndex: number, _isAlly: boolean): boolean {
    return true
  }

  getModification(cardIndex: number): CardModification | undefined {
    const comparedCard = this.material(MaterialType.FactionCard).index(cardIndex).getItem()!
    const isAlly = this.isAlly(cardIndex)
    if (!this.isAdjacentTo(comparedCard) || !this.isEffectApplicable(cardIndex, isAlly)) return

    const attackModification = this.getAttackModifier(comparedCard, cardIndex, isAlly)
    return {
      attack: attackModification?.attack ?? 0,
      defense: attackModification?.defense ?? 0,
      looseSkill: this.isLoosingSkill(cardIndex, isAlly),
      looseAllAttributes: this.isLoosingAttributes(cardIndex, isAlly),
      protectedFromAttacks: this.isAttackBlocked(cardIndex, isAlly),
      extraAttributes: this.getExtraAttributes(cardIndex, isAlly),
      lostAttributes: this.getLostAttributes(cardIndex, isAlly)
    }
  }

  getAttackModifier(_cardItem: MaterialItem, _cardIndex: number, _isAlly: boolean): CardModification | undefined {
    return
  }

  getExtraAttributes(_cardIndex: number, _isAlly: boolean): CardAttributeType[] {
    return []
  }

  getLostAttributes(_cardIndex: number, _isAlly: boolean): CardAttributeType[] {
    return []
  }

  isAlly(cardIndex: number) {
    const thisFactionToken = this.material(MaterialType.FactionToken).parent(this.index).getItem()!.id.back
    const cardFactionToken = this.material(MaterialType.FactionToken).parent(cardIndex).getItem()!.id.back

    return thisFactionToken !== undefined && thisFactionToken === cardFactionToken
  }

  isAdjacentTo(card: MaterialItem) {
    return areAdjacent(this.item.getItem()!, card)
  }
}
