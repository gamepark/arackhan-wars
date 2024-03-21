/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { MaterialHistoryProps } from '@gamepark/react-game'
import { isCreateItemType, isCustomMoveType, isMoveItemType, isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { ActionHistory } from './ActionHistory'
import { AttackHistory } from './AttackHistory'
import { ChooseDeckHistory } from './ChooseDeckHistory'
import { ChooseStartPlayerHistory } from './ChooseStartPlayerHistory'
import { KillHistory } from './KillHistory'
import { MoveCardHistory } from './MoveCardHistory'
import { NewRoundHistory } from './NewRoundHistory'
import { PassHistory } from './PassHistory'
import { PlaceCardHistory } from './PlaceCardHistory'
import { RevealCardHistory } from './RevealCardHistory'
import { StartActivationHistory } from './StartActivationHistory'
import { TakeHistory } from './TakeHistory'

export const ArackhanWarsHistory = ({ move, context: { game, action, consequenceIndex } }: MaterialHistoryProps<MaterialGame, MaterialMove>) => {
  if (isCustomMoveType(CustomMoveType.ChooseDeck)(move) || isCustomMoveType(CustomMoveType.ChooseFaction)(move)) {
    return <ChooseDeckHistory player={move.data.player}/>
  }
  if (game.rule?.id === RuleId.ChooseStartPlayer && isCustomMoveType(CustomMoveType.ChoosePlayer)(move)) {
    return <ChooseStartPlayerHistory player={game.rule.player!} chosenPlayer={move.data}/>
  }
  if (game.rule?.id === RuleId.RevealRule) {
    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      return <RevealCardHistory move={move} game={game}/>
    }
  }
  if (game.rule?.id === RuleId.ActivationRule) {
    if (isCustomMoveType(CustomMoveType.Attack)(move)) {
      return <AttackHistory player={action.playerId} card={move.data.card} target={move.data.target}/>
    }
  }
  if (isMoveItemType(MaterialType.FactionCard)(move)
    && move.location.type === LocationType.Battlefield
    && game.items[MaterialType.FactionCard]?.[move.itemIndex]?.location.type === LocationType.Battlefield) {
    return <MoveCardHistory move={move}/>
  }
  if (isMoveItemType(MaterialType.FactionCard)(move)
    && game.rule?.id !== RuleId.PlacementRule
    && move.location.type === LocationType.Battlefield
    && game.items[MaterialType.FactionCard]?.[move.itemIndex]?.location.type === LocationType.PlayerHand) {
    return <PlaceCardHistory move={move}/>
  }
  if (isStartPlayerTurn(move) && move.id === RuleId.ActivationRule) {
    const nextConsequence = consequenceIndex !== undefined ? action.consequences[consequenceIndex + 1] : undefined
    if (nextConsequence && isCustomMoveType(CustomMoveType.Pass)(nextConsequence)) return null
    const initiative = game.rule?.id === RuleId.RevealRule || new ArackhanWarsRules(game).remind(Memory.IsInitiativeSequence)
    return <StartActivationHistory player={move.player!} initiative={initiative}/>
  }
  if (isCustomMoveType(CustomMoveType.Pass)(move) && consequenceIndex === undefined && game.rule?.player !== undefined) {
    return <PassHistory player={game.rule.player}/>
  }
  if (isStartRule(move) && move.id === RuleId.DrawRule) {
    return <NewRoundHistory round={new ArackhanWarsRules(game).round}/>
  }
  if (isMoveItemType(MaterialType.FactionCard)(move)
    && move.location.type === LocationType.PlayerDiscard
    && getCardRule(game, move.itemIndex).isCreature
    && game.rule?.player !== undefined) {
    return <KillHistory player={game.rule.player} card={move.itemIndex}/>
  }
  if (isCustomMoveType(CustomMoveType.PerformAction)(move) && game.rule?.player !== undefined) {
    return <ActionHistory player={game.rule.player} card={move.data}/>
  }
  if (game.rule?.id !== RuleId.RevealRule && game.rule?.id !== RuleId.EndOfRoundRule && game.rule?.player !== undefined) {
    if (isMoveItemType(MaterialType.FactionToken)(move) && !move.location.rotation && move.location.parent !== undefined) {
      return <TakeHistory player={game.rule.player} card={move.location.parent}/>
    } else if (isCreateItemType(MaterialType.FactionToken)(move) && move.item.location.type === LocationType.FactionTokenSpace
      && move.item.location.parent !== undefined) {
      if (isMoveItemType(MaterialType.FactionCard)(action.move) && action.move.itemIndex === move.item.location.parent) return null
      return <TakeHistory player={game.rule.player} card={move.item.location.parent}/>
    }
  }
  return null
}
