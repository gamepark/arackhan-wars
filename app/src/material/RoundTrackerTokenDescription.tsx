/** @jsxImportSource @emotion/react */
import roundTrackToken from '../images/tokens/round-token-front.jpg'
import { RoundTokenDescription } from '@gamepark/react-game'
import { RoundTrackerRules } from './RoundTrackerRules'

export const trackerRatio = 25 / 25

export class RoundTrackerTokenDescription extends RoundTokenDescription {
  image = roundTrackToken
  diameter = 2.5
  ratio = trackerRatio
  rules = RoundTrackerRules
}

export const roundTrackerTokenDescription = new RoundTrackerTokenDescription()

