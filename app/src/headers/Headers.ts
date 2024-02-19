import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { BackupActionHeader } from './actions/BackupActionHeader'
import { MarchingOrderActionHeader } from './actions/MarchingOrderActionHeader'
import { MimicryActionHeader } from './actions/MimicryActionHeader'
import { MoveCreatureActionHeader } from './actions/MoveCreatureActionHeader'
import { PlaceCreatureActionHeader } from './actions/PlaceCreatureActionHeader'
import { StandardBearerActionHeader } from './actions/StandardBearerActionHeader'
import { ActivationHeader } from './ActivationHeader'
import { ChooseDeckHeader } from './ChooseDeckHeader'
import { ChooseFactionHeader } from './ChooseFactionHeader'
import { ChooseStartPlayerHeader } from './ChooseStartPlayerHeader'
import { DrawHeader } from './DrawHeader'
import { EndOfTurnHeader } from './EndOfTurnHeader'
import { EndPhaseHeader } from './EndPhaseHeader'
import { MulliganHeader } from './MulliganHeader'
import { PlacementHeader } from './PlacementHeader'
import { RevealHeader } from './RevealHeader'

export const Headers: Partial<Record<RuleId, () => ReactJSXElement>> = {
  [RuleId.ChooseFaction]: ChooseFactionHeader,
  [RuleId.ChooseDeck]: ChooseDeckHeader,
  [RuleId.ChooseStartPlayer]: ChooseStartPlayerHeader,
  [RuleId.Mulligan]: MulliganHeader,
  [RuleId.DrawRule]: DrawHeader,
  [RuleId.PlacementRule]: PlacementHeader,
  [RuleId.RevealRule]: RevealHeader,
  [RuleId.ActivationRule]: ActivationHeader,
  [RuleId.SolvePerforations]: ActivationHeader,
  [RuleId.EndPhaseRule]: EndPhaseHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.ForcedExileActionRule]: MoveCreatureActionHeader,
  [RuleId.HorseOfAvalonActionRule]: PlaceCreatureActionHeader,
  [RuleId.TeleportationActionRule]: MoveCreatureActionHeader,
  [RuleId.MimicryActionRule]: MimicryActionHeader,
  [RuleId.AdrielleAction]: PlaceCreatureActionHeader,
  [RuleId.NoviceFairyAction]: PlaceCreatureActionHeader,
  [RuleId.StandardBearerAction]: StandardBearerActionHeader,
  [RuleId.BackupAction]: BackupActionHeader,
  [RuleId.MarchingOrderAction]: MarchingOrderActionHeader
}