export type ActivatedCard = {
  card: number
  targets: number[] // TODO: custom RuleId to declare attack after a movement (With MovedCard in memory). Rename this into "Attacks" with target mandatory
  omnistrike?: boolean
}
