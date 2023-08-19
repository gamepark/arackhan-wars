import WhitelandToken from '../images/tokens/whitelands-token-front.jpg'
import NakkaToken from '../images/tokens/nakka-token-front.jpg'
import GreyOrderToken from '../images/tokens/greyorder-token-front.jpg'
import BlightToken from '../images/tokens/blight-token-front.jpg'
import NeutralToken from '../images/tokens/neutral-token-front.jpg'
import WhitelandTokenBack from '../images/tokens/whitelands-token-back.jpg'
import NakkaTokenBack from '../images/tokens/nakka-token-back.jpg'
import GreyOrderTokenBack from '../images/tokens/greyorder-token-back.jpg'
import BlightTokenBack from '../images/tokens/blight-token-back.jpg'
import NeutralTokenBack from '../images/tokens/neutral-token-back.jpg'
import { FactionTokenRules } from './FactionTokenRules'
import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { TokenFaction } from '@gamepark/arackhan-wars/material/TokenFaction'

export class FactionTokenDescription extends RoundTokenDescription {
  diameter = 1.4

  images = {
    [TokenFaction.Whitelands]: WhitelandToken,
    [TokenFaction.Nakka]: NakkaToken,
    [TokenFaction.GreyOrder]: GreyOrderToken,
    [TokenFaction.Blight]: BlightToken,
    [TokenFaction.Neutral]: NeutralToken
  }

  backImages = {
    [TokenFaction.Whitelands]: WhitelandTokenBack,
    [TokenFaction.Nakka]: NakkaTokenBack,
    [TokenFaction.GreyOrder]: GreyOrderTokenBack,
    [TokenFaction.Blight]: BlightTokenBack,
    [TokenFaction.Neutral]: NeutralTokenBack
  }

  getStaticItems = ({ rules }: MaterialContext) =>
    rules.players.map((player) => ({
      id: rules.remind(Memory.Token, player),
      quantity: 34,
      location: { type: LocationType.PlayerTokenStock, player }
    }))

  getStockLocation = (item: MaterialItem) => ({
    type: LocationType.PlayerTokenStock,
    player: item.location.player
  })

  rules = FactionTokenRules
}

export const factionTokenDescription = new FactionTokenDescription()
