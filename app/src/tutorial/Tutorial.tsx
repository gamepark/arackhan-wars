import { css } from '@emotion/react'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { CardId, FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { startingCoordinates } from '@gamepark/arackhan-wars/rules/PlacementRule'
import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialContext, MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCustomMove, isCustomMoveType, isMoveItem, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Trans } from 'react-i18next'
import astral from '../images/icons/astral.png'
import { CombatIcon } from '../locators/CombatIconLocator'
import { battleMatDescription } from '../material/BattleMatDescription'
import { roundTrackerDescription } from '../material/RoundTrackerDescription'
import { TutorialSetup } from './TutorialSetup'

export class Tutorial extends MaterialTutorial {
  version = 7
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [
    { id: 1 },
    {
      id: 2,
      name: 'Bob',
      avatar: {
        topType: TopType.LongHairStraight,
        hairColor: HairColorName.Brown,
        facialHairType: FacialHairType.BeardLight,
        facialHairColor: HairColorName.Brown,
        clotheType: ClotheType.GraphicShirt,
        clotheColor: ClotheColorName.Red,
        graphicType: GraphicType.Skull,
        eyeType: EyeType.Side,
        eyebrowType: EyebrowType.DefaultNatural,
        mouthType: MouthType.Smile,
        skinColor: SkinColor.Light
      }
    }
  ]

  steps: TutorialStep[] = [
    {
      popup: { text: () => <Trans i18nKey="tuto.welcome"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: (t: TFunction) => t('rules.round-track.purpose'),
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => ({
        staticItems: [{ type: MaterialType.RoundTracker, item: roundTrackerDescription.staticItem }],
        materials: [this.material(game, MaterialType.RoundTrackerToken)],
        margin: { top: 5 }
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.hand'),
        position: { x: 0, y: -25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.PlayerHand).player(1)],
        margin: { top: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.placement.1"><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: () => ({
        staticItems: [{ type: MaterialType.BattleMat, item: battleMatDescription.staticItem }]
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.start-zone'),
        position: { x: 30, y: -10 }
      },
      focus: () => ({
        locations: startingCoordinates.map(({ x, y }) => ({ type: LocationType.Battlefield, x, y })),
        scale: 0.5, margin: { right: 30 }
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.place-card" values={{ card: t(`card.name.${FactionCard.LunarWendigo}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        locations: [{ type: LocationType.Battlefield, x: 3, y: 2 }],
        materials: [this.getHandCard(game, FactionCard.LunarWendigo)],
        scale: 0.5
      }),
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.LunarWendigo, 3, 2)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.place-card" values={{ card: t(`card.name.${FactionCard.NihilistPenguin}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        locations: [{ type: LocationType.Battlefield, x: 3, y: 3 }],
        materials: [this.getHandCard(game, FactionCard.NihilistPenguin)],
        margin: { top: 5 },
        scale: 0.5
      }),
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.NihilistPenguin, 3, 3)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.placement.validation"><strong/></Trans>
      },
      move: {}
    },
    {
      move: {
        player: 2,
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.ScuttleJaw, 3, 1)
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.placement.2'),
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).player(2)],
        scale: 0.3
      })
    },
    {
      move: {
        player: 2,
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.SwampOgre, 4, 3)
      }
    },
    { move: { player: 2 } },
    {
      popup: {
        text: (t: TFunction) => t('tuto.reveal'),
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace),
          this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)
        ],
        margin: { right: 10 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.activation"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace),
          this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)
        ],
        margin: { right: 10 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.creatures"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace),
          this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)
        ],
        margin: { right: 10 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.attack.value"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        locations: this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index => (
          { type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: index }
        )),
        margin: { right: 10, top: 3 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.defense.value"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        locations: this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index => (
          { type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: index }
        )),
        margin: { right: 10, top: 3 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.attack.rule"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        locations: [
          { type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex() },
          { type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: this.getBattlefieldCard(game, FactionCard.ScuttleJaw).getIndex() },
          { type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex() },
          { type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: this.getBattlefieldCard(game, FactionCard.NihilistPenguin).getIndex() }
        ],
        margin: { right: 10, top: 3 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.attack" values={{
          card1: t(`card.name.${FactionCard.LunarWendigo}`),
          card2: t(`card.name.${FactionCard.ScuttleJaw}`)
        }}><em/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.LunarWendigo),
          this.getBattlefieldCard(game, FactionCard.ScuttleJaw),
          this.getTokens(game, [FactionCard.LunarWendigo, FactionCard.ScuttleJaw])
        ],
        margin: { right: 15, bottom: 5 },
        scale: 0.5
      }),
      move: {
        filter: (move, game) => isCustomMove(move) && move.type === CustomMoveType.Attack
          && move.data.card === this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex()
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.attack.solve"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame, context: MaterialContext) => this.steps[game.tutorial!.step - 1].focus!(game, context),
      move: {
        filter: isCustomMoveType(CustomMoveType.SolveAttack)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.deactivate" values={{ card: t(`card.name.${FactionCard.LunarWendigo}`) }}><em/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getTokens(game, [FactionCard.LunarWendigo])],
        margin: { right: 20 },
        scale: 0.7
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.movement" values={{ card: t(`card.name.${FactionCard.NihilistPenguin}`) }}><em/><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.NihilistPenguin),
          this.getTokens(game, [FactionCard.NihilistPenguin])
        ],
        margin: { right: 20, top: 10 },
        scale: 0.7
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.move.penguin" values={{
          card1: t(`card.name.${FactionCard.NihilistPenguin}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`),
          card3: t(`card.name.${FactionCard.SwampOgre}`)
        }}><em/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.NihilistPenguin),
          this.getTokens(game, [FactionCard.NihilistPenguin])
        ],
        locations: [{ type: LocationType.Battlefield, x: 3, y: 1 }],
        margin: { right: 20 },
        scale: 0.6
      }),
      move: {
        filter: move => isMoveItem(move) && move.itemType === MaterialType.FactionCard
          && move.location.type === LocationType.Battlefield && move.location.x === 3 && move.location.y === 1
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.pass.1"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.end-round-1"><strong/></Trans>
      }
    },
    {
      move: {
        player: 2,
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.ForgePatriarch, 2, 1)
      }
    },
    {
      move: {
        player: 2,
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.SwampTroll, 2, 2)
      }
    },
    { move: { player: 2 } },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.skills" values={
          { card1: t(`card.name.${FactionCard.ShieldOfDawn}`), card2: t(`card.name.${FactionCard.LunarWendigo}`) }
        }><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getHandCard(game, FactionCard.ShieldOfDawn),
          this.getBattlefieldCard(game, FactionCard.LunarWendigo)
        ],
        margin: { bottom: 5, left: 5, top: 5 }
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.place-card" values={{ card: t(`card.name.${FactionCard.ShieldOfDawn}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getHandCard(game, FactionCard.ShieldOfDawn)],
        locations: [{ type: LocationType.Battlefield, x: 4, y: 2 }],
        margin: { bottom: 5, left: 15, top: 5 }
      }),
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.ShieldOfDawn, 4, 2)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.spell" values={{ card: t(`card.name.${FactionCard.IceMeteor}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getHandCard(game, FactionCard.IceMeteor)],
        margin: { left: 30, top: 15, bottom: 2 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.astral"><Picture src={astral} css={inlineIcon}/></Trans>
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.place-card" values={{ card: t(`card.name.${FactionCard.IceMeteor}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getHandCard(game, FactionCard.IceMeteor)],
        locations: [{ type: LocationType.Battlefield, x: 4, y: 1 }],
        margin: { left: 15, top: 2, bottom: 2 }
      }),
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.IceMeteor, 4, 1)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.placement.validation"><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      move: {}
    },
    {
      move: {
        player: 2,
        filter: (move, game) => isCustomMove(move) && move.type === CustomMoveType.Attack
          && move.data.card === this.getBattlefieldCard(game, FactionCard.ForgePatriarch).getIndex()
      }
    },
    {
      move: { player: 2, filter: isCustomMoveType(CustomMoveType.Pass) }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.activation.2" values={{
          card1: t(`card.name.${FactionCard.NihilistPenguin}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`),
          card3: t(`card.name.${FactionCard.ShieldOfDawn}`)
        }}><em/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.ForgePatriarch),
          this.getBattlefieldCard(game, FactionCard.LunarWendigo),
          this.getBattlefieldCard(game, FactionCard.ShieldOfDawn),
          this.getTokens(game, [FactionCard.ForgePatriarch, FactionCard.LunarWendigo, FactionCard.ShieldOfDawn])
        ],
        locations: [{ type: LocationType.Battlefield, x: 3, y: 1 }],
        scale: 0.5
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.group-attack" values={{
          card1: t(`card.name.${FactionCard.SwampTroll}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`)
        }}><strong/><em/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.LunarWendigo),
          this.getBattlefieldCard(game, FactionCard.SwampTroll),
          this.getTokens(game, [FactionCard.LunarWendigo, FactionCard.SwampTroll])
        ],
        scale: 0.5
      }),
      move: {
        filter: (move, game) => isCustomMove(move) && move.type === CustomMoveType.Attack
          && move.data.card === this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex()
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.attack.meteor" values={{
          card1: t(`card.name.${FactionCard.SwampTroll}`),
          card2: t(`card.name.${FactionCard.IceMeteor}`)
        }}><strong/><em/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.LunarWendigo),
          this.getBattlefieldCard(game, FactionCard.SwampTroll),
          this.getBattlefieldCard(game, FactionCard.IceMeteor),
          this.getTokens(game, [FactionCard.LunarWendigo, FactionCard.SwampTroll, FactionCard.IceMeteor])
        ],
        scale: 0.5
      }),
      move: {
        filter: (move, game) => isCustomMove(move) && move.type === CustomMoveType.Attack
          && move.data.card === this.getBattlefieldCard(game, FactionCard.IceMeteor).getIndex()
          && move.data.target === this.getBattlefieldCard(game, FactionCard.SwampTroll).getIndex()
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.attack.solve" values={{
          card1: t(`card.name.${FactionCard.SwampTroll}`),
          card2: t(`card.name.${FactionCard.IceMeteor}`)
        }}><strong/><em/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.LunarWendigo),
          this.getBattlefieldCard(game, FactionCard.SwampTroll),
          this.getBattlefieldCard(game, FactionCard.IceMeteor),
          this.getTokens(game, [FactionCard.LunarWendigo, FactionCard.SwampTroll, FactionCard.IceMeteor])
        ],
        scale: 0.5
      }),
      move: {
        filter: isCustomMoveType(CustomMoveType.SolveAttack)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.pass.2" values={{
          card1: t(`card.name.${FactionCard.ShieldOfDawn}`),
          card2: t(`card.name.${FactionCard.SwampOgre}`)
        }}><em/><strong/></Trans>,
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.getBattlefieldCard(game, FactionCard.ShieldOfDawn),
          this.getBattlefieldCard(game, FactionCard.SwampOgre),
          this.getTokens(game, [FactionCard.ShieldOfDawn, FactionCard.SwampOgre])
        ],
        margin: { right: 10 },
        scale: 0.5
      }),
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.land"><strong/></Trans>,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getHandCard(game, FactionCard.FortressOfMyjir)],
        margin: { top: 10, bottom: 1 }
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.help')
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('rules.score') + '\n' + t('tuto.advice'),
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        locations: this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index => (
            { type: LocationType.CardValue, parent: index }
          )
        ),
        margin: { left: 3, right: 25, bottom: 5 },
        scale: 0.6
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.end')
      }
    }
  ]

  isPlaceCard(game: MaterialGame, move: MaterialMove, card: FactionCard, x: number, y: number) {
    return isMoveItem(move) && move.itemType === MaterialType.FactionCard
      && move.location.x === x && move.location.y === y
      && this.getHandCard(game, card).getIndexes().includes(move.itemIndex)
  }

  getHandCard(game: MaterialGame, card: FactionCard) {
    return this.material(game, MaterialType.FactionCard).location(LocationType.PlayerHand).id<CardId>(id => id.front === card)
  }

  getBattlefieldCard(game: MaterialGame, card: FactionCard) {
    return this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).id<CardId>(id => id.front === card)
  }

  getTokens(game: MaterialGame, cards: FactionCard[]) {
    const cardsIndexes = cards.map(card => this.getBattlefieldCard(game, card).getIndex())
    return this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(parent =>
      parent !== undefined && cardsIndexes.includes(parent)
    )
  }
}

const inlineIcon = css`
  height: 2em;
  vertical-align: bottom;
`