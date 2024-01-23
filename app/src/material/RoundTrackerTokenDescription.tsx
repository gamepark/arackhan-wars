/** @jsxImportSource @emotion/react */
import { FactionToken } from '@gamepark/arackhan-wars/material/FactionToken'
import { RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import BlightToken from '../images/tokens/blight-round-token.jpg'
import GreyOrderToken from '../images/tokens/greyorder-round-token.jpg'
import NakkaToken from '../images/tokens/nakka-round-token.jpg'
import NeutralToken from '../images/tokens/neutral-token-front.jpg'
import WhitelandsToken from '../images/tokens/whitelands-round-token.jpg'
import { RoundTrackerHelp } from './RoundTrackerHelp'

export const trackerRatio = 25 / 25

export class RoundTrackerTokenDescription extends RoundTokenDescription {
  images = {
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
    return item.location?.rotation
  }

  protected getFrontId(itemId: never) {
    return super.getFrontId(itemId) ?? FactionToken.Neutral
  }

  protected getBackId(itemId: never) {
    return super.getBackId(itemId) ?? FactionToken.Neutral
  }
}

export const roundTrackerTokenDescription = new RoundTrackerTokenDescription()

