import { Faction } from '@gamepark/arackhan-wars/Faction'

import WhitelandToken from '../images/tokens/whitelands-token-front.jpg'
import NakkaToken from '../images/tokens/nakka-token-front.jpg'
import GreyOrderToken from '../images/tokens/greyorder-token-front.jpg'
import BlightToken from '../images/tokens/blight-token-front.jpg'
import { FactionTokenRules } from './FactionTokenRules'
import { RoundTokenDescription } from '@gamepark/react-game'

export class FactionTokenDescription extends RoundTokenDescription {
  diameter = 1.4
  ratio = 1

  images = {
    [Faction.Whitelands]: WhitelandToken,
    [Faction.Nakka]: NakkaToken,
    [Faction.GrayOrder]: GreyOrderToken,
    [Faction.Blight]: BlightToken
  }

  rules = FactionTokenRules
}

export const factionTokenDescription = new FactionTokenDescription()
