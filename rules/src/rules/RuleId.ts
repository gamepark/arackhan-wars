export enum RuleId {
  // Setup phases
  ChooseFaction = 1,
  ChooseDeck = 2,
  ChooseStartPlayer = 8,
  Mulligan,

  // Round phases
  DrawRule = 10,
  PlacementRule,
  RevealRule,
  ActivationRule,
  EndOfRoundRule,
  EndOfTurn, // For cards like Frost Maiden

  // Special phases
  SolvePerforations = 20,

  // Action cards S1
  ForcedExileActionRule = 100,
  HorseOfAvalonActionRule,
  TeleportationActionRule,
  MimicryActionRule,
  AdrielleAction,
  IceElementalAction,
  NoviceFairyAction,
  NemesioWhitelandsAction,
  AncestralLibraryAction,
  TheWhiteGatesAction,
  CoriolisWindAction,
  DiscardEnemySpellAction,
  IceWingsAction,
  NemesioNakkaAction,
  ProtectorAction,
  MusicalTranceAction,
  WarpPathAction,
  AssassinAction,
  NemesioGreyOrderAction,
  StandardBearerAction,
  TomurDiscAction,
  ArmouredConvoyAction,
  BackupAction,
  MarchingOrderAction,
  OnLeaveAction,
  TheGreyOrderRisesAction,
  NemesioBlightAction,
  EssenceAbsorptionAction,
  PossessionAction
}
