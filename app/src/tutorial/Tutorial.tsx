import { css } from '@emotion/react'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { startingCoordinates } from '@gamepark/arackhan-wars/rules/PlacementRule'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCustomMove, isCustomMoveType, isMoveItem, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Trans } from 'react-i18next'
import astral from '../images/icons/astral.png'
import { CombatIcon } from '../locators/CombatIconLocator'
import { TutorialSetup } from './TutorialSetup'

type CardId = { front?: FactionCard, back: Faction }

export class Tutorial extends MaterialTutorial {
  version = 3
  options = { players: [{ faction: Faction.Whitelands }, { faction: Faction.Blight }] }
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
        position: { x: 0, y: -30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.RoundTracker), this.material(game, MaterialType.RoundTrackerToken)],
        margin: { top: 5 }
      })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.hand'),
        position: { x: 0, y: -30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Hand).player(1)],
        margin: { top: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.placement.1"><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.BattleMat)]
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
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.creatures"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.attack.value"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)],
        locations: this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index =>
          ({ type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: index })
        ),
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.defense.value"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)],
        locations: this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index =>
          ({ type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: index })
        ),
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.attack.rule"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)],
        locations: [
          { type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex() },
          { type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: this.getBattlefieldCard(game, FactionCard.ScuttleJaw).getIndex() },
          { type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex() },
          { type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: this.getBattlefieldCard(game, FactionCard.NihilistPenguin).getIndex() }
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.attack" values={{
          card1: t(`card.name.${FactionCard.LunarWendigo}`),
          card2: t(`card.name.${FactionCard.ScuttleJaw}`)
        }}><em/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
          this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(parent => {
            const parentCard = (this.material(game, MaterialType.FactionCard).getItem(parent!)?.id as CardId | undefined)?.front
            return parentCard === FactionCard.LunarWendigo || parentCard === FactionCard.ScuttleJaw
          })
        ],
        locations: [
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex() },
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.NihilistPenguin).getIndex() }
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
        text: () => <Trans i18nKey="tuto.attack.solve"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
          this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(parent => {
            const parentCard = (this.material(game, MaterialType.FactionCard).getItem(parent!)?.id as CardId | undefined)?.front
            return parentCard === FactionCard.LunarWendigo || parentCard === FactionCard.ScuttleJaw
          })
        ],
        locations: [
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex() },
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.NihilistPenguin).getIndex() }
        ],
        scale: 0.5
      }),
      move: {
        filter: isCustomMoveType(CustomMoveType.SolveAttack)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.deactivate" values={{ card: t(`card.name.${FactionCard.LunarWendigo}`) }}><em/></Trans>,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(
            this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex()
          )
        ]
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.movement" values={{ card: t(`card.name.${FactionCard.NihilistPenguin}`) }}><em/><strong/></Trans>,
        position: { x: 40, y: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)],
        locations: [
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex() },
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex() }
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.move.penguin" values={{
          card1: t(`card.name.${FactionCard.NihilistPenguin}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`),
          card3: t(`card.name.${FactionCard.SwampOgre}`)
        }}><em/></Trans>,
        position: { x: 40, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getBattlefieldCard(game, FactionCard.NihilistPenguin)],
        locations: [{ type: LocationType.Battlefield, x: 3, y: 1 }],
        scale: 0.5
      }),
      move: {
        filter: move => isMoveItem(move) && move.itemType === MaterialType.FactionCard
          && move.location?.type === LocationType.Battlefield && move.location.x === 3 && move.location.y === 1
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.pass.1"><strong/></Trans>,
        position: { x: 40, y: -10 }
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
        materials: [this.getHandCard(game, FactionCard.ShieldOfDawn), this.getBattlefieldCard(game, FactionCard.LunarWendigo)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.place-card" values={{ card: t(`card.name.${FactionCard.ShieldOfDawn}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => ({
        locations: [{ type: LocationType.Battlefield, x: 4, y: 2 }],
        materials: [this.getHandCard(game, FactionCard.ShieldOfDawn)],
        scale: 0.5
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
        locations: [{ type: LocationType.Battlefield, x: 4, y: 2 }],
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
        locations: [{ type: LocationType.Battlefield, x: 4, y: 1 }],
        materials: [this.getHandCard(game, FactionCard.IceMeteor)],
        scale: 0.5
      }),
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.IceMeteor, 4, 1)
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
        position: { x: 40, y: -30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: (t: TFunction) => <Trans i18nKey="tuto.group-attack" values={{
          card1: t(`card.name.${FactionCard.SwampTroll}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`)
        }}><strong/><em/></Trans>,
        position: { x: 40, y: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getBattlefieldCard(game, FactionCard.SwampTroll), this.getBattlefieldCard(game, FactionCard.LunarWendigo)],
        locations: [
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex() },
          { type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.ForgePatriarch).getIndex() }
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
        position: { x: 40, y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getBattlefieldCard(game, FactionCard.SwampTroll), this.getBattlefieldCard(game, FactionCard.IceMeteor)],
        locations: [{ type: LocationType.FactionTokenSpace, parent: this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex() }],
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
        text: (t: TFunction) => <Trans i18nKey="tuto.pass.2" values={{
          card1: t(`card.name.${FactionCard.ShieldOfDawn}`),
          card2: t(`card.name.${FactionCard.SwampOgre}`)
        }}><em/><strong/></Trans>,
        position: { x: 40, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.getBattlefieldCard(game, FactionCard.ShieldOfDawn), this.getBattlefieldCard(game, FactionCard.SwampOgre)],
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
        materials: [this.getHandCard(game, FactionCard.FortressOfMyjir), this.material(game, MaterialType.RoundTrackerToken)]
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
        position: { x: -30, y: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)],
        locations: this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index =>
          ({ type: LocationType.CardValue, parent: index })
        ),
        scale: 0.5
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
      && move.location?.x === x && move.location.y === y
      && this.getHandCard(game, card).getIndexes().includes(move.itemIndex)
  }

  getHandCard(game: MaterialGame, card: FactionCard) {
    return this.material(game, MaterialType.FactionCard).location(LocationType.Hand).filter(item => (item.id as CardId).front === card)
  }

  getBattlefieldCard(game: MaterialGame, card: FactionCard) {
    return this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).filter(item => (item.id as CardId).front === card)
  }
}

const inlineIcon = css`
  height: 1em;
  vertical-align: text-top;
`
