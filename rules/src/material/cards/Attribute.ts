import { getEnumValues } from '@gamepark/rules-api'

export type Attribute = Initiative | Movement | Flight | Omnistrike | RangedAttack | Swarm | Regeneration | Stealth | Perforation

export enum AttributeType {
  Initiative = 1,
  Movement,
  Flight,
  Omnistrike,
  RangedAttack,
  Swarm,
  Regeneration,
  Stealth,
  Perforation
}

export const attributeTypes = getEnumValues(AttributeType)

export type Initiative = { type: AttributeType.Initiative }
export const initiative: Initiative = { type: AttributeType.Initiative }

export type Movement = { type: AttributeType.Movement, distance: number }
export const movement = (distance: number): Movement => ({ type: AttributeType.Movement, distance })
export const isMovement = (attribute: Attribute): attribute is Movement => attribute.type === AttributeType.Movement

export type Flight = { type: AttributeType.Flight }
export const flight: Flight = { type: AttributeType.Flight }

export type Omnistrike = { type: AttributeType.Omnistrike }
export const omnistrike: Omnistrike = { type: AttributeType.Omnistrike }

export type RangedAttack = { type: AttributeType.RangedAttack, distance: number }
export const rangedAttack = (distance: number): RangedAttack => ({ type: AttributeType.RangedAttack, distance })
export const isRangedAttack = (attribute: Attribute): attribute is RangedAttack => attribute.type === AttributeType.RangedAttack

export type Swarm = { type: AttributeType.Swarm }
export const swarm: Swarm = { type: AttributeType.Swarm }

export type Regeneration = { type: AttributeType.Regeneration }
export const regeneration: Regeneration = { type: AttributeType.Regeneration }

export type Stealth = { type: AttributeType.Stealth }
export const stealth: Stealth = { type: AttributeType.Stealth }

export type Perforation = { type: AttributeType.Perforation }
export const perforation: Perforation = { type: AttributeType.Perforation }
