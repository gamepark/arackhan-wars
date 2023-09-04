/** @jsxImportSource @emotion/react */
import { TutorialSetup } from './TutorialSetup'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { roundTrackerDescription } from '../material/RoundTrackerDescription'
import { isCustomMove, isCustomMoveType, isMoveItem, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { startingCoordinates } from '@gamepark/arackhan-wars/rules/PlacementRule'
import { battleMatDescription } from '../material/BattleMatDescription'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { CombatIcon } from '../locators/CombatIconLocator'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import astral from '../images/icons/astral.png'
import { css } from '@emotion/react'

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 1
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

  steps: TutorialStep<number, MaterialType, LocationType>[] = [
    {
      popup: { text: () => <Trans defaults="tuto.welcome"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: (t: TFunction) => t('rules.round-track.purpose'),
        position: { x: 0, y: -30 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.RoundTracker, item: roundTrackerDescription.staticItem },
        this.material(game, MaterialType.RoundTrackerToken)
      ]
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.hand'),
        position: { x: 0, y: -30 }
      },
      focus: (game: MaterialGame) => this.material(game, MaterialType.FactionCard).location(LocationType.Hand).player(1)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.placement.1"><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: () => ({ type: MaterialType.BattleMat, item: battleMatDescription.staticItem })
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.start-zone'),
        position: { x: 30, y: -10 }
      },
      focus: () => [
        { type: MaterialType.BattleMat, item: battleMatDescription.staticItem },
        ...startingCoordinates.map(({ x, y }) => this.location(LocationType.Battlefield).x(x).y(y))
      ]
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.place-card" values={{ card: t(`card.name.${FactionCard.LunarWendigo}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.BattleMat, item: battleMatDescription.staticItem },
        this.location(LocationType.Battlefield).x(3).y(2),
        this.getHandCard(game, FactionCard.LunarWendigo)
      ],
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.LunarWendigo, 3, 2)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.place-card" values={{ card: t(`card.name.${FactionCard.NihilistPenguin}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.BattleMat, item: battleMatDescription.staticItem },
        this.location(LocationType.Battlefield).x(3).y(3),
        this.getHandCard(game, FactionCard.NihilistPenguin)
      ],
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.NihilistPenguin, 3, 3)
      }
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
      focus: (game: MaterialGame) => [
        { type: MaterialType.BattleMat, item: battleMatDescription.staticItem },
        this.location(LocationType.Battlefield).x(3).y(1),
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).player(2)
      ]
    },
    {
      move: {
        player: 2,
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.SwampOgre, 4, 3)
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.reveal'),
        position: { x: 30, y: 0 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.BattleMat, item: battleMatDescription.staticItem },
        this.location(LocationType.Battlefield).x(3).y(1),
        this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace),
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.activation"><strong/></Trans>,
        position: { x: 30, y: 0 }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.creatures"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.attack.value"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
        ...this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index =>
          this.location(LocationType.CombatIcon).id(CombatIcon.Attack).parent(index)
        )
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.defense.value"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
        ...this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index =>
          this.location(LocationType.CombatIcon).id(CombatIcon.Defense).parent(index)
        )
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.attack.rule"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
        this.location(LocationType.CombatIcon).id(CombatIcon.Attack).parent(this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex()),
        this.location(LocationType.CombatIcon).id(CombatIcon.Defense).parent(this.getBattlefieldCard(game, FactionCard.ScuttleJaw).getIndex()),
        this.location(LocationType.CombatIcon).id(CombatIcon.Attack).parent(this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex()),
        this.location(LocationType.CombatIcon).id(CombatIcon.Defense).parent(this.getBattlefieldCard(game, FactionCard.NihilistPenguin).getIndex())
      ]
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.attack" values={{
          card1: t(`card.name.${FactionCard.LunarWendigo}`),
          card2: t(`card.name.${FactionCard.ScuttleJaw}`)
        }}><em/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
        this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(parent => {
            const parentCard = this.material(game, MaterialType.FactionCard).getItem(parent!)?.id.front
            return parentCard === FactionCard.LunarWendigo || parentCard === FactionCard.ScuttleJaw
          }
        ),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex()),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.NihilistPenguin).getIndex())
      ],
      move: {
        filter: (move, game) => isCustomMove(move) && move.type === CustomMoveType.Attack
          && move.data.card === this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex()
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.attack.solve"><strong/></Trans>,
        position: { x: 40, y: -5 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
        this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(parent => {
            const parentCard = this.material(game, MaterialType.FactionCard).getItem(parent!)?.id.front
            return parentCard === FactionCard.LunarWendigo || parentCard === FactionCard.ScuttleJaw
          }
        ),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex()),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.NihilistPenguin).getIndex())
      ],
      move: {
        filter: isCustomMoveType(CustomMoveType.SolveAttack)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.deactivate" values={{ card: t(`card.name.${FactionCard.LunarWendigo}`) }}><em/></Trans>,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(
          this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex()
        )
      ]
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.movement" values={{ card: t(`card.name.${FactionCard.NihilistPenguin}`) }}><em/><strong/></Trans>,
        position: { x: 40, y: -20 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex()),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex())
      ]
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.move.penguin" values={{
          card1: t(`card.name.${FactionCard.NihilistPenguin}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`),
          card3: t(`card.name.${FactionCard.SwampOgre}`)
        }}><em/></Trans>,
        position: { x: 40, y: -10 }
      },
      focus: (game: MaterialGame) => [
        this.getBattlefieldCard(game, FactionCard.NihilistPenguin),
        this.location(LocationType.Battlefield).x(3).y(1)
      ],
      move: {
        filter: move => isMoveItem(move) && move.itemType === MaterialType.FactionCard
          && move.position.location?.type === LocationType.Battlefield && move.position.location.x === 3 && move.position.location.y === 1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.pass.1"><strong/></Trans>,
        position: { x: 40, y: -10 }
      },
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    { move: { player: 2 } },
    {
      popup: {
        text: () => <Trans defaults="tuto.end-round-1"><strong/></Trans>
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
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.skills" values={
          { card1: t(`card.name.${FactionCard.ShieldOfDawn}`), card2: t(`card.name.${FactionCard.LunarWendigo}`) }
        }><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => [
        this.getHandCard(game, FactionCard.ShieldOfDawn), this.getBattlefieldCard(game, FactionCard.LunarWendigo)
      ]
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.place-card" values={{ card: t(`card.name.${FactionCard.ShieldOfDawn}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.BattleMat, item: battleMatDescription.staticItem },
        this.location(LocationType.Battlefield).x(4).y(2),
        this.getHandCard(game, FactionCard.ShieldOfDawn)
      ],
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.ShieldOfDawn, 4, 2)
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.spell" values={{ card: t(`card.name.${FactionCard.IceMeteor}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => [
        this.getHandCard(game, FactionCard.IceMeteor),
        this.location(LocationType.Battlefield).x(4).y(2)
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.astral"><Picture src={astral} css={inlineIcon}/></Trans>
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.place-card" values={{ card: t(`card.name.${FactionCard.IceMeteor}`) }}><em/></Trans>,
        position: { x: 30, y: -10 }
      },
      focus: (game: MaterialGame) => [
        { type: MaterialType.BattleMat, item: battleMatDescription.staticItem },
        this.location(LocationType.Battlefield).x(4).y(1),
        this.getHandCard(game, FactionCard.IceMeteor)
      ],
      move: {
        filter: (move, game) => this.isPlaceCard(game, move, FactionCard.IceMeteor, 4, 1)
      }
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
        text: (t: TFunction) => <Trans defaults="tuto.activation.2" values={{
          card1: t(`card.name.${FactionCard.NihilistPenguin}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`),
          card3: t(`card.name.${FactionCard.ShieldOfDawn}`)
        }}><em/></Trans>,
        position: { x: 40, y: -30 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield)
      ]
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.group-attack" values={{
          card1: t(`card.name.${FactionCard.SwampTroll}`),
          card2: t(`card.name.${FactionCard.LunarWendigo}`)
        }}><strong/><em/></Trans>,
        position: { x: 40, y: 30 }
      },
      focus: (game: MaterialGame) => [
        this.getBattlefieldCard(game, FactionCard.SwampTroll), this.getBattlefieldCard(game, FactionCard.LunarWendigo),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex()),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.ForgePatriarch).getIndex())
      ],
      move: {
        filter: (move, game) => isCustomMove(move) && move.type === CustomMoveType.Attack
          && move.data.card === this.getBattlefieldCard(game, FactionCard.LunarWendigo).getIndex()
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.attack.meteor" values={{
          card1: t(`card.name.${FactionCard.SwampTroll}`),
          card2: t(`card.name.${FactionCard.IceMeteor}`)
        }}><strong/><em/></Trans>,
        position: { x: 40, y: 25 }
      },
      focus: (game: MaterialGame) => [
        this.getBattlefieldCard(game, FactionCard.SwampTroll), this.getBattlefieldCard(game, FactionCard.IceMeteor),
        this.location(LocationType.FactionTokenSpace).parent(this.getBattlefieldCard(game, FactionCard.SwampOgre).getIndex())
      ],
      move: {
        filter: (move, game) => isCustomMove(move) && move.type === CustomMoveType.Attack
          && move.data.card === this.getBattlefieldCard(game, FactionCard.IceMeteor).getIndex()
          && move.data.target === this.getBattlefieldCard(game, FactionCard.SwampTroll).getIndex()
      }
    },
    {
      popup: {
        text: (t: TFunction) => <Trans defaults="tuto.pass.2" values={{
          card1: t(`card.name.${FactionCard.ShieldOfDawn}`),
          card2: t(`card.name.${FactionCard.SwampOgre}`)
        }}><em/><strong/></Trans>,
        position: { x: 40, y: 0 }
      },
      focus: (game: MaterialGame) => [
        this.getBattlefieldCard(game, FactionCard.ShieldOfDawn), this.getBattlefieldCard(game, FactionCard.SwampOgre)
      ],
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.land"><strong/></Trans>,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => [
        this.getHandCard(game, FactionCard.FortressOfMyjir),
        this.material(game, MaterialType.RoundTrackerToken)
      ]
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.help')
      }
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.score'),
        position: { x: -30, y: 20 }
      },
      focus: (game: MaterialGame) => [
        this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield),
        ...this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).getIndexes().map(index =>
          this.location(LocationType.CardValue).parent(index)
        )
      ]
    },
    {
      popup: {
        text: (t: TFunction) => t('tuto.end')
      }
    }
  ]

  isPlaceCard(game: MaterialGame, move: MaterialMove, card: FactionCard, x: number, y: number) {
    return isMoveItem(move) && move.itemType === MaterialType.FactionCard
      && move.position.location?.x === x && move.position.location.y === y
      && this.getHandCard(game, card).getIndexes().includes(move.itemIndex)
  }

  getHandCard(game: MaterialGame, card: FactionCard) {
    return this.material(game, MaterialType.FactionCard).location(LocationType.Hand).filter(item => item.id.front === card)
  }

  getBattlefieldCard(game: MaterialGame, card: FactionCard) {
    return this.material(game, MaterialType.FactionCard).location(LocationType.Battlefield).filter(item => item.id.front === card)
  }
}

const inlineIcon = css`
  height: 2em;
  vertical-align: bottom;
`