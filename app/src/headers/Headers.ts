import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { ComponentType } from 'react'
import { AncestralLibraryActionHeader } from './actions/AncestralLibraryActionHeader'
import { BackupActionHeader } from './actions/BackupActionHeader'
import { CardActionHeader } from './actions/CardActionHeader'
import { DeactivateActionHeader } from './actions/DeactivateActionHeader'
import { DiscardActionHeader } from './actions/DiscardActionHeader'
import { EssenceAbsorptionActionHeader } from './actions/EssenceAbsorptionActionHeader'
import { IceElementalActionHeader } from './actions/IceElementalActionHeader'
import { MarchingOrderActionHeader } from './actions/MarchingOrderActionHeader'
import { MimicryActionHeader } from './actions/MimicryActionHeader'
import { MoveCreatureActionHeader } from './actions/MoveCreatureActionHeader'
import { NemesioBlightActionHeader } from './actions/NemesioBlightActionHeader'
import { NemesioGreyOrderActionHeader } from './actions/NemesioGreyOrderActionHeader'
import { PlaceCreatureActionHeader } from './actions/PlaceCreatureActionHeader'
import { PossessionActionHeader } from './actions/PossessionActionHeader'
import { StandardBearerActionHeader } from './actions/StandardBearerActionHeader'
import { TargetCreatureActionHeader } from './actions/TargetCreatureActionHeader'
import { TheWhiteGatesActionHeader } from './actions/TheWhiteGatesActionHeader'
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

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseFaction]: ChooseFactionHeader,
  [RuleId.ChooseDeck]: ChooseDeckHeader,
  [RuleId.ChooseStartPlayer]: ChooseStartPlayerHeader,
  [RuleId.Mulligan]: MulliganHeader,
  [RuleId.DrawRule]: DrawHeader,
  [RuleId.PlacementRule]: PlacementHeader,
  [RuleId.RevealRule]: RevealHeader,
  [RuleId.ActivationRule]: ActivationHeader,
  [RuleId.SolvePerforations]: ActivationHeader,
  [RuleId.EndOfRoundRule]: EndPhaseHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.ForcedExileActionRule]: MoveCreatureActionHeader,
  [RuleId.HorseOfAvalonActionRule]: PlaceCreatureActionHeader,
  [RuleId.TeleportationActionRule]: MoveCreatureActionHeader,
  [RuleId.MimicryActionRule]: MimicryActionHeader,
  [RuleId.AdrielleAction]: PlaceCreatureActionHeader,
  [RuleId.IceElementalAction]: IceElementalActionHeader,
  [RuleId.NemesioWhitelandsAction]: TargetCreatureActionHeader,
  [RuleId.NoviceFairyAction]: PlaceCreatureActionHeader,
  [RuleId.AncestralLibraryAction]: AncestralLibraryActionHeader,
  [RuleId.TheWhiteGatesAction]: TheWhiteGatesActionHeader,
  [RuleId.CoriolisWindAction]: MoveCreatureActionHeader,
  [RuleId.DiscardEnemySpellAction]: DiscardActionHeader,
  [RuleId.IceWingsAction]: MoveCreatureActionHeader,
  [RuleId.NemesioNakkaAction]: MoveCreatureActionHeader,
  [RuleId.ProtectorAction]: CardActionHeader,
  [RuleId.MusicalTranceAction]: MoveCreatureActionHeader,
  [RuleId.WarpPathAction]: MoveCreatureActionHeader,
  [RuleId.AssassinAction]: MoveCreatureActionHeader,
  [RuleId.NemesioGreyOrderAction]: NemesioGreyOrderActionHeader,
  [RuleId.StandardBearerAction]: StandardBearerActionHeader,
  [RuleId.TomurDiscAction]: DeactivateActionHeader,
  [RuleId.ArmouredConvoyAction]: MoveCreatureActionHeader,
  [RuleId.BackupAction]: BackupActionHeader,
  [RuleId.MarchingOrderAction]: MarchingOrderActionHeader,
  [RuleId.OnLeaveAction]: MoveCreatureActionHeader,
  [RuleId.TheGreyOrderRisesAction]: CardActionHeader,
  [RuleId.NemesioBlightAction]: NemesioBlightActionHeader,
  [RuleId.EssenceAbsorptionAction]: EssenceAbsorptionActionHeader,
  [RuleId.PossessionAction]: PossessionActionHeader
}
