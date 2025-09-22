import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import regeneration from '../images/icons/attributes/regeneration.png'
import defense from '../images/icons/defense.png'
import skull from '../images/icons/skull.png'

export enum CombatResult {
  Defense, Dead, Regeneration
}

export class CombatResultIconLocator extends Locator {
  locationDescription = new CombatResultIconDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 50, y: 38 }
}

export class CombatResultIconDescription extends LocationDescription {
  images = {
    [CombatResult.Defense]: defense,
    [CombatResult.Dead]: skull,
    [CombatResult.Regeneration]: regeneration
  }

  imageSize = {
    [CombatResult.Dead]: { width: 2.5, height: 2.59 },
    [CombatResult.Regeneration]: { width: 2.5, height: 2.15 },
    [CombatResult.Defense]: { width: 4, height: 3.47 }
  }

  getSize = (id: CombatResult) => this.imageSize[id]

  getExtraCss = (location: Location) => [shadowCss, location.id === CombatResult.Defense && defenseValueCss(location.x)]
}

const shadowCss = css`
  filter: drop-shadow(0 0 0.1em black);
`

const defenseValueCss = (value?: number) => css`
  &:after {
    content: '${value}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: darkred;
    font-family: "Cinzel", sans-serif;
    font-size: 1.2em;
  }
`
