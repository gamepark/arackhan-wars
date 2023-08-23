/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ItemLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import attackIcon from '../images/icons/attack.png'
import defenseIcon from '../images/icons/defense.png'
import { css } from '@emotion/react'
import { Location } from '@gamepark/rules-api'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { addStylesheetUrl } from '@gamepark/react-game/dist/components/menus/menuCss'

addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

export enum CombatIcon {
  Attack = 1, Defense
}

export class CombatIconLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new CombatIconDescription()
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(location: Location<PlayerId, LocationType>) {
    return location.id === CombatIcon.Attack ? { x: 18.5, y: 66.6 } : { x: 81.8, y: 66.6 }
  }
}

export class CombatIconDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = 1.75
  ratio = 272 / 236

  images = {
    [CombatIcon.Attack]: attackIcon,
    [CombatIcon.Defense]: defenseIcon
  }

  getExtraCss(location: Location<PlayerId, LocationType>, { rules }: MaterialContext) {
    const cardRule = getCardRule(rules.game, location.parent!)
    const modifier = location.id === CombatIcon.Attack ? cardRule.attackModifier : cardRule.defenseModifier
    const value = location.id === CombatIcon.Attack ? cardRule.attack : cardRule.defense
    return css`
      pointer-events: none;

      &:after {
        content: '${value}';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${modifier > 0 ? 'darkgreen' : 'darkred'};
        font-family: "Cinzel", sans-serif;
        font-size: 0.45em;
      }
    `
  }
}
