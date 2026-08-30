import '@gamepark/arackhan-wars/rules/CardRule' // registers the card rule factory (side effect at the end of CardRule.ts)
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CardId, FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { wrapRulesWithTutorial } from '@gamepark/react-game/dist/components/tutorial/TutorialRulesWrapper'
import { applyAutomaticMoves, LocalMoveType, MaterialGame, MaterialMove, MoveKind, playAction } from '@gamepark/rules-api'
import { expect, test } from 'vitest'
import { Tutorial } from './Tutorial'

const tutorial = new Tutorial()
wrapRulesWithTutorial(tutorial, ArackhanWarsRules)

const cards = (rules: ArackhanWarsRules, location: LocationType, card: FactionCard) =>
  rules.material(MaterialType.FactionCard).location(location).player(1).id<CardId>(id => id.front === card).length

test.each([...Array(20).keys()])('the tutorial script can be played to the end (run %i)', () => {
  const [game] = tutorial.setupTutorial()
  const rules = new ArackhanWarsRules(game)
  applyAutomaticMoves(rules)
  const log: string[] = []
  for (let i = 0; i < 500; i++) {
    const tuto = (rules.game as MaterialGame).tutorial!
    if (tuto.step >= tutorial.steps.length) {
      // The tutorial ends after the opponent's second round: the penguin died, the wendigo was saved by the shield
      expect(cards(rules, LocationType.PlayerDiscard, FactionCard.NihilistPenguin), 'Nihilist Penguin should be destroyed').toBe(1)
      expect(cards(rules, LocationType.Battlefield, FactionCard.LunarWendigo), 'Lunar Wendigo should survive').toBe(1)
      return
    }
    const step = tutorial.steps[tuto.step]
    if (!step.move) { // popup only: the player closes it to move on
      rules.play({ kind: MoveKind.LocalMove, type: LocalMoveType.SetTutorialStep, step: tuto.step + 1 })
      applyAutomaticMoves(rules)
      continue
    }
    const player = step.move.player ?? rules.game.players[0]
    const moves = (rules.getLegalMoves(player) as MaterialMove[]).filter(move => move.kind !== MoveKind.LocalMove)
    // When no legal move matches the step, the tutorial is stuck: the client lets its AI improvise, wrecking the script
    expect(moves, `no legal move for player ${player} at tutorial step ${tuto.step}\n${log.slice(-5).join('\n')}`).not.toHaveLength(0)
    const move = moves[Math.floor(Math.random() * moves.length)]
    log.push(`step ${tuto.step}: player ${player} plays ${JSON.stringify(move)}`)
    playAction(rules, move, player)
    applyAutomaticMoves(rules)
  }
  throw new Error('The tutorial did not reach its last step')
})
