/** @jsxImportSource @emotion/react */
import roundTrack from '../images/boards/round-track.jpg'
import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { RoundTrackerRules } from './RoundTrackerRules'

export const trackerRatio = 264 / 36

export class RoundTrackerDescription extends BoardDescription {
  image = roundTrack
  height = 3.6
  ratio = trackerRatio
  item = { location: { type: LocationType.Table } }
  rules = RoundTrackerRules
}

export const roundTrackerDescription = new RoundTrackerDescription()

