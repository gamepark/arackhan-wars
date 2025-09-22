import roundTrack from '../images/boards/round-track.jpg'
import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { RoundTrackerHelp } from './RoundTrackerHelp'

export const trackerRatio = 264 / 36

export class RoundTrackerDescription extends BoardDescription {
  image = roundTrack
  height = 3.6
  ratio = trackerRatio
  staticItem = { location: { type: LocationType.RoundTrackerSpot } }
  help = RoundTrackerHelp
}

export const roundTrackerDescription = new RoundTrackerDescription()

