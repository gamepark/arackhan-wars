import { AttributeType } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import flightCancel from '../images/icons/attributes/flight-cancel.png'
import flight from '../images/icons/attributes/flight.png'
import initiativeCancel from '../images/icons/attributes/initiative-cancel.png'
import initiative from '../images/icons/attributes/initiative.png'
import movementCancel from '../images/icons/attributes/movement-cancel.png'
import movement from '../images/icons/attributes/movement.png'
import omnistrikeCancel from '../images/icons/attributes/omnistrike-cancel.png'
import omnistrike from '../images/icons/attributes/omnistrike.png'
import perforationCancel from '../images/icons/attributes/perforation-cancel.png'
import perforation from '../images/icons/attributes/perforation.png'
import rangedAttackCancel from '../images/icons/attributes/ranged-attack-cancel.png'
import rangedAttack from '../images/icons/attributes/ranged-attack.png'
import regenerationCancel from '../images/icons/attributes/regeneration-cancel.png'
import regeneration from '../images/icons/attributes/regeneration.png'
import stealthCancel from '../images/icons/attributes/stealth-cancel.png'
import stealth from '../images/icons/attributes/stealth.png'
import swarmCancel from '../images/icons/attributes/swarm-cancel.png'
import swarm from '../images/icons/attributes/swarm.png'

export class AttributesIconsLocator extends Locator {
  locationDescription = attributesIconDescription
  parentItemType = MaterialType.FactionCard
  getPositionOnParent = ({ x = 0 }: Location) => ({ x: 18 + x * 15, y: 87 })
}

class AttributesIconsDescription extends LocationDescription {
  width = 1
  ratio = 200 / 172

  attributeImages = {
    [AttributeType.Initiative]: initiative,
    [AttributeType.Movement]: movement,
    [AttributeType.Flight]: flight,
    [AttributeType.Omnistrike]: omnistrike,
    [AttributeType.RangedAttack]: rangedAttack,
    [AttributeType.Swarm]: swarm,
    [AttributeType.Regeneration]: regeneration,
    [AttributeType.Stealth]: stealth,
    [AttributeType.Perforation]: perforation
  }

  attributeCancelImages = {
    [AttributeType.Initiative]: initiativeCancel,
    [AttributeType.Movement]: movementCancel,
    [AttributeType.Flight]: flightCancel,
    [AttributeType.Omnistrike]: omnistrikeCancel,
    [AttributeType.RangedAttack]: rangedAttackCancel,
    [AttributeType.Swarm]: swarmCancel,
    [AttributeType.Regeneration]: regenerationCancel,
    [AttributeType.Stealth]: stealthCancel,
    [AttributeType.Perforation]: perforationCancel
  }

  getImage = ({ id }: Location) => id.cancel ? this.attributeCancelImages[id.type as AttributeType] : this.attributeImages[id.type as AttributeType]
}

export const attributesIconDescription = new AttributesIconsDescription()