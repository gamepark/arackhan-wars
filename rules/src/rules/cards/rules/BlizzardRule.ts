import { FactionCardRule } from './base/FactionCardRule'

export class BlizzardRule extends FactionCardRule {

  blockSkills = true
  blockAllAttributes = true

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return !isAlly
  }

  onRoundEnd = () => {
    return this.discardCard()
  }
}
