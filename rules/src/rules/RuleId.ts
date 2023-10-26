export enum RuleId {
  // Setup phases
  ChooseFaction = 1,
  ChooseStartPlayer = 8,
  Mulligan,

  // Round phases
  DrawRule = 10,
  PlacementRule,
  RevealRule,
  ActivationRule,
  EndPhaseRule,

  // Special phases
  SolvePerforations = 20,

  // Action cards S1
  ForcedExileActionRule = 100,
  HorseOfAvalonActionRule,
  TeleportationActionRule,
  MimicryActionRule
}
