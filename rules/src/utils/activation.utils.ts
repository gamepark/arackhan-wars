import { Material } from '@gamepark/rules-api'


export const deactivateTokens = (tokens: Material) => {
  if (!tokens.length) return []

  return tokens.moveItems({ rotation: { y: 1 } })
}

export const activateTokens = (tokens: Material) => {
  if (!tokens.length) return []

  return tokens.moveItems({})
}

export const isFlipped = (token: Material) => token.getItem()?.rotation?.y === 1

