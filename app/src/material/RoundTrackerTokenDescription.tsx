/** @jsxImportSource @emotion/react */
import { FactionToken } from '@gamepark/arackhan-wars/material/FactionToken'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem, MaterialRules } from '../../../../workshop/packages/rules-api'
import BlightToken from '../images/tokens/blight-token-front.jpg'
import GreyOrderToken from '../images/tokens/greyorder-token-front.jpg'
import NakkaToken from '../images/tokens/nakka-token-front.jpg'
import NeutralToken from '../images/tokens/neutral-token-front.jpg'
import roundTrackToken from '../images/tokens/round-token-front.jpg'
import WhitelandsToken from '../images/tokens/whitelands-token-front.jpg'
import { RoundTrackerHelp } from './RoundTrackerHelp'

export const trackerRatio = 25 / 25

export class RoundTrackerTokenDescription extends RoundTokenDescription {
  images = {
    0: roundTrackToken,
    [FactionToken.Whitelands]: WhitelandsToken,
    [FactionToken.Nakka]: NakkaToken,
    [FactionToken.GreyOrder]: GreyOrderToken,
    [FactionToken.Blight]: BlightToken,
    [FactionToken.Neutral]: NeutralToken
  }
  backImages = this.images
  diameter = 2.5
  ratio = trackerRatio
  help = RoundTrackerHelp

  isFlipped(item: Partial<MaterialItem>) {
    return !item.id && item.location?.rotation
  }

  protected getFrontId(itemId: 1 | undefined, { rules }: MaterialContext) {
    if (itemId === 1) return 0 // Retro-compatibility
    return this.getPlayerFactionToken(rules, this.getFirstPlayer(rules))
  }

  protected getBackId(itemId: 1 | undefined, { rules }: MaterialContext) {
    if (itemId === 1) return 0 // Retro-compatibility
    return this.getPlayerFactionToken(rules, this.opponent(this.getFirstPlayer(rules)))
  }

  getFirstPlayer(rules: MaterialRules) {
    const startPlayer = rules.remind(Memory.StartPlayer)
    return this.getRound(rules) % 2 === 1 ? startPlayer : this.opponent(startPlayer)
  }

  getRound(rules: MaterialRules) {
    return rules.material(MaterialType.RoundTrackerToken).getItem()?.location.x ?? 0
  }

  opponent(player: number) {
    return player === 1 ? 2 : 1
  }

  getPlayerFactionToken(rules: MaterialRules, player: number) {
    return rules.remind<FactionToken>(Memory.PlayerFactionToken, player) ?? FactionToken.Neutral
  }
}

export const roundTrackerTokenDescription = new RoundTrackerTokenDescription()

