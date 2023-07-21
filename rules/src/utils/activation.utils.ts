import { Material } from '@gamepark/rules-api/dist/material/items/Material'


export const deactivateTokens = (tokens: Material) => {
  if (!tokens.length) return []

  return tokens.moveItems({ rotation: { y: 1 } })
}

export const activateTokens = (tokens: Material) => {
  if (!tokens.length) return []

  return tokens.moveItems({})
}
