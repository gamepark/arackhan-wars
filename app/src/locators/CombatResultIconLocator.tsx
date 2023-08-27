/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import defense from '../images/icons/defense.png'
import skull from '../images/icons/skull.png'
import regeneration from '../images/icons/attributes/regeneration.png'
import { css } from '@emotion/react'
import { Location } from '@gamepark/rules-api'

export enum CombatResult {
  Defense, Dead, Regeneration
}

export class CombatResultIconLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new CombatResultIconDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 50, y: 38 }
}

export class CombatResultIconDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  getSize(location: Location<PlayerId, LocationType>) {
    switch (location.id) {
      case CombatResult.Dead:
        return { width: 2.5, height: 2.5 * 496 / 478 }
      case CombatResult.Regeneration:
        return { width: 2.5, height: 2.5 * 172 / 200 }
      case CombatResult.Defense:
      default:
        return { width: 4, height: 4 * 236 / 272 }
    }
  }

  images = {
    [CombatResult.Defense]: defense,
    [CombatResult.Dead]: skull,
    [CombatResult.Regeneration]: regeneration
  }

  getExtraCss(location: Location<PlayerId, LocationType>) {
    const extraCss = [css`
      pointer-events: none;
      filter: drop-shadow(0 0 0.1em black);
    `]
    if (location.id === CombatResult.Defense) {
      extraCss.push(css`
        &:after {
          content: '${location.x}';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: darkred;
          font-family: "Cinzel", sans-serif;
          font-size: 1.2em;
        }
      `)
    }
    return extraCss
  }
}
