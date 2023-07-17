export type ActivatedCard = {
  card: number;
  targets?: number[]
  omnistrike?: boolean
}

export type ActivationRuleMemory = {
  activatedCards: ActivatedCard[]
}
