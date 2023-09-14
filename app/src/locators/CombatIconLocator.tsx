/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import attackIcon from '../images/icons/attack.png'
import defenseIcon from '../images/icons/defense.png'
import { css } from '@emotion/react'
import { Location } from '@gamepark/rules-api'

export enum CombatIcon {
  Attack = 1, Defense
}

export class CombatIconLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = combatIconDescription
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(location: Location<PlayerId, LocationType>) {
    return location.id === CombatIcon.Attack ? { x: 18.5, y: 66.6 } : { x: 81.8, y: 66.6 }
  }
}

class CombatIconDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = 1.75
  ratio = 272 / 236
  borderRadius = 0.4

  images = {
    [CombatIcon.Attack]: attackIcon,
    [CombatIcon.Defense]: defenseIcon
  }

  getImage(location: Location<PlayerId, LocationType>): string | undefined {
    return location.x !== undefined ? this.images[location.id] : undefined
  }

  getExtraCss(location: Location<PlayerId, LocationType>) {
    return css`
      pointer-events: none;

      &:after {
        content: '${location.x}';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${location.y! > 0 ? 'darkgreen' : 'darkred'};
        font-family: "Cinzel", sans-serif;
        font-size: 0.45em;
      }
    `
  }
}

export const combatIconDescription = new CombatIconDescription()
