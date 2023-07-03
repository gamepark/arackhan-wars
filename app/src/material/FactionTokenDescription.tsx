import { Faction } from '@gamepark/arackhan-wars/Faction'

import WhitelandToken from '../images/tokens/whitelands-token-front.jpg'
import NakkaToken from '../images/tokens/nakka-token-front.jpg'
import GreyOrderToken from '../images/tokens/greyorder-token-front.jpg'
import BlightToken from '../images/tokens/blight-token-front.jpg'
import WhitelandTokenBack from '../images/tokens/whitelands-token-back.jpg'
import NakkaTokenBack from '../images/tokens/nakka-token-back.jpg'
import GreyOrderTokenBack from '../images/tokens/greyorder-token-back.jpg'
import BlightTokenBack from '../images/tokens/blight-token-back.jpg'
import { FactionTokenRules } from './FactionTokenRules'
import { RoundTokenDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialGame } from '../../../../workshop/packages/rules-api'

export class FactionTokenDescription extends RoundTokenDescription {
  diameter = 1.4

  images = {
    [Faction.Whitelands]: WhitelandToken,
    [Faction.Nakka]: NakkaToken,
    [Faction.GrayOrder]: GreyOrderToken,
    [Faction.Blight]: BlightToken
  }

  backImages = {
    [Faction.Whitelands]: WhitelandTokenBack,
    [Faction.Nakka]: NakkaTokenBack,
    [Faction.GrayOrder]: GreyOrderTokenBack,
    [Faction.Blight]: BlightTokenBack
  }

  getItems = (game: MaterialGame) => {
    return game.players.map((player) => ({
      id: player,
      quantity: 34,
      location: {
        type: LocationType.PlayerTokenStock,
        player
      }
    }))
  }

  stocks = (game: MaterialGame) => {
    return game.players.map((player) => ({
        id: player,
        location: {
          type: LocationType.PlayerTokenStock,
          player
        }
      })
    )
  }

  rules = FactionTokenRules
}

export const factionTokenDescription = new FactionTokenDescription()
