export type Attribute = Flight | Initiative | Perforation | Movement | RangedAttack | Omnistrike | Regeneration | Swarm

export enum AttributeType {
  Flight = 1,
  Initiative,
  Perforation,
  Movement,
  RangedAttack,
  Omnistrike,
  Regeneration,
  Swarm
}

export type Flight = { type: AttributeType.Flight }
export const flight: Flight = { type: AttributeType.Flight }

export type Initiative = { type: AttributeType.Initiative }
export const initiative: Initiative = { type: AttributeType.Initiative }

export type Perforation = { type: AttributeType.Perforation }
export const perforation: Perforation = { type: AttributeType.Perforation }

export type Movement = { type: AttributeType.Movement, distance: number }
export const movement = (distance: number): Movement => ({ type: AttributeType.Movement, distance })
export const isMovement = (attribute: Attribute): attribute is Movement => attribute.type === AttributeType.Movement

export type RangedAttack = { type: AttributeType.RangedAttack, distance: number }
export const rangedAttack = (distance: number): RangedAttack => ({ type: AttributeType.RangedAttack, distance })

export type Omnistrike = { type: AttributeType.Omnistrike }
export const omnistrike: Omnistrike = { type: AttributeType.Omnistrike }

export type Regeneration = { type: AttributeType.Regeneration }
export const regeneration: Regeneration = { type: AttributeType.Regeneration }

export type Swarm = { type: AttributeType.Swarm }
export const swarm: Swarm = { type: AttributeType.Swarm }
