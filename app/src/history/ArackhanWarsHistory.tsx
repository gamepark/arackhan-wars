import { css } from '@emotion/react'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { FactionToken } from '@gamepark/arackhan-wars/material/FactionToken'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCreateItemType, isCustomMoveType, isMoveItemType, isStartPlayerTurn, isStartRule, MaterialMove } from '@gamepark/rules-api'
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

export class ArackhanWarsHistory implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, { game, action, consequenceIndex }: MoveComponentContext): MovePlayedLogDescription | undefined {
    if (isCustomMoveType(CustomMoveType.ChooseDeck)(move) || isCustomMoveType(CustomMoveType.ChooseFaction)(move)) {
      return { Component: ChooseDeckHistory, player: move.data.player, css: logCss() }
    }
    if (game.rule?.id === RuleId.ChooseStartPlayer && isCustomMoveType(CustomMoveType.ChoosePlayer)(move)) {
      return { Component: ChooseStartPlayerHistory, player: game.rule.player, css: logCss(game.memory[Memory.PlayerFactionToken][game.rule.player]) }
    }
    if (game.rule?.id === RuleId.RevealRule) {
      if (isMoveItemType(MaterialType.FactionCard)(move)) {
        return { Component: RevealCardHistory, player: move.location.player, css: logCss(game.memory[Memory.PlayerFactionToken][move.location.player!]) }
      }
    }
    if (isStartPlayerTurn(move) && move.id === RuleId.ActivationRule) {
      const nextConsequence = consequenceIndex !== undefined ? action.consequences[consequenceIndex + 1] : undefined
      if (nextConsequence && isCustomMoveType(CustomMoveType.Pass)(nextConsequence)) return
      return { Component: StartActivationHistory, player: move.player, css: [logCss(game.memory[Memory.PlayerFactionToken][move.player!]), borderTop] }
    }
    if (game.rule?.id === RuleId.ActivationRule) {
      if (isCustomMoveType(CustomMoveType.Attack)(move)) {
        return { Component: AttackHistory, depth: 1, css: logCss(game.memory[Memory.PlayerFactionToken][action.playerId]) }
      }
    }
    if (isMoveItemType(MaterialType.FactionCard)(move)
      && move.location.type === LocationType.Battlefield
      && game.items[MaterialType.FactionCard]?.[move.itemIndex]?.location.type === LocationType.Battlefield) {
      return { Component: MoveCardHistory, depth: 1, css: logCss(game.memory[Memory.PlayerFactionToken][move.location.player!]) }
    }
    if (isMoveItemType(MaterialType.FactionCard)(move)
      && game.rule?.id !== RuleId.PlacementRule
      && move.location.type === LocationType.Battlefield
      && game.items[MaterialType.FactionCard]?.[move.itemIndex]?.location.type === LocationType.PlayerHand) {
      return { Component: PlaceCardHistory, depth: 2, css: logCss(game.memory[Memory.PlayerFactionToken][move.location.player!]) }
    }
    if (isCustomMoveType(CustomMoveType.Pass)(move) && consequenceIndex === undefined && game.rule?.player !== undefined) {
      return { Component: PassHistory, depth: 1, css: logCss(game.memory[Memory.PlayerFactionToken][game.rule.player]) }
    }
    if (isMoveItemType(MaterialType.FactionCard)(move)
      && move.location.type === LocationType.PlayerDiscard
      && getCardRule(game, move.itemIndex).isCreature
      && game.rule?.player !== undefined) {
      return { Component: KillHistory, depth: 2, css: logCss(game.memory[Memory.PlayerFactionToken][game.rule.player]) }
    }
    if (isCustomMoveType(CustomMoveType.PerformAction)(move) && game.rule?.player !== undefined) {
      return { Component: ActionHistory, depth: 1, css: logCss(game.memory[Memory.PlayerFactionToken][game.rule.player]) }
    }
    if (game.rule?.id !== RuleId.RevealRule && game.rule?.id !== RuleId.EndOfRoundRule && game.rule?.player !== undefined) {
      if (isMoveItemType(MaterialType.FactionToken)(move) && !move.location.rotation && move.location.parent !== undefined) {
        return { Component: TakeHistory, depth: 2, css: logCss(game.memory[Memory.PlayerFactionToken][game.rule.player]) }
      } else if (isCreateItemType(MaterialType.FactionToken)(move) && move.item.location.type === LocationType.FactionTokenSpace
        && move.item.location.parent !== undefined) {
        if (isMoveItemType(MaterialType.FactionCard)(action.move) && action.move.itemIndex === move.item.location.parent) return
        return { Component: TakeHistory, depth: 2, css: logCss(game.memory[Memory.PlayerFactionToken][game.rule.player]) }
      }
    }
    if (isStartRule(move) && move.id === RuleId.DrawRule) {
      return { Component: NewRoundHistory, css: [logCss(), borderTop] }
    }
    return
  }
}

const logCss = (factionToken?: FactionToken) => css`
  background-color: ${factionToken ? FactionTokenBackground[factionToken] : 'white'};
  border-radius: 0;
  margin: 0;
  color: rgb(0, 36, 72);
`

const FactionTokenBackground: Record<FactionToken, string> = {
  [FactionToken.Whitelands]: '#C6E8F3',
  [FactionToken.Nakka]: '#CDE5CB',
  [FactionToken.GreyOrder]: '#E3E3E3',
  [FactionToken.Blight]: '#F9CDCA',
  [FactionToken.Neutral]: '#FEDCB9'
}


const borderTop = css`
  border-top: 0.05em solid black;
`
