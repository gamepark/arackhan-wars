/** @jsxImportSource @emotion/react */
import { onBattlefieldAndAstralPlane } from '@gamepark/arackhan-wars/material/Board'
import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { EffectType } from '@gamepark/arackhan-wars/material/cards/Effect'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Attack } from '@gamepark/arackhan-wars/rules/AttackRule'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { isCustomMove, isCustomMoveType, Location, MaterialGame, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { differenceBy } from 'lodash'
import BlightBack from '../images/cards/blight/blight-card-back.jpg'
import AbominableHydra from '../images/cards/blight/en/s1-aw1-144-en-abominable-hydra.jpg'
import Berserker from '../images/cards/blight/en/s1-aw1-146-en-berserker.jpg'
import ChildEater from '../images/cards/blight/en/s1-aw1-147-en-child-eater.jpg'
import ForgePatriarch from '../images/cards/blight/en/s1-aw1-156-en-forge-patriarch.jpg'
import PlagueCollector from '../images/cards/blight/en/s1-aw1-165-en-plague-collector.jpg'
import ScuttleJaw from '../images/cards/blight/en/s1-aw1-171-en-scuttle-jaw.jpg'
import Slayer from '../images/cards/blight/en/s1-aw1-172-en-slayer.jpg'
import SwampOgre from '../images/cards/blight/en/s1-aw1-175-en-swamp-ogre.jpg'
import SwampTroll from '../images/cards/blight/en/s1-aw1-176-en-swamp-troll.jpg'
import WesternForge from '../images/cards/blight/en/s1-aw1-179-en-western-forge.jpg'
import FireLighning from '../images/cards/blight/en/s1-aw1-184-en-fire-lightning.jpg'
import Firestorm from '../images/cards/blight/en/s1-aw1-185-en-firestorm.jpg'
import ForcedExile from '../images/cards/blight/en/s1-aw1-186-en-forced-exile.jpg'
import TheFear from '../images/cards/blight/en/s1-aw1-191-en-the-fear.jpg'
import Ballista from '../images/cards/greyorder/en/s1-aw1-096-en-ballista.jpg'
import Champion from '../images/cards/greyorder/en/s1-aw1-100-en-champion.jpg'
import DrunkKnight from '../images/cards/greyorder/en/s1-aw1-102-en-drunk-knight.jpg'
import GreyHorseman from '../images/cards/greyorder/en/s1-aw1-105-en-grey-horseman.jpg'
import HeroOfTheBattleOfNerz from '../images/cards/greyorder/en/s1-aw1-110-en-hero-of-the-battle-of-nerz.jpg'
import Infantryman from '../images/cards/greyorder/en/s1-aw1-111-en-infantryman.jpg'
import Phalanx from '../images/cards/greyorder/en/s1-aw1-113-en-phalanx.jpg'
import SiegeTower from '../images/cards/greyorder/en/s1-aw1-116-en-siege-tower.jpg'
import TheSeneschal from '../images/cards/greyorder/en/s1-aw1-119-en-the-seneschal.jpg'
import AvalonFortress from '../images/cards/greyorder/en/s1-aw1-127-en-avalon-fortress.jpg'
import HorseOfAvalon from '../images/cards/greyorder/en/s1-aw1-134-en-horse-of-avalon.jpg'
import ShieldWall from '../images/cards/greyorder/en/s1-aw1-139-en-shield-wall.jpg'
import Warcry from '../images/cards/greyorder/en/s1-aw1-142-en-warcry.jpg'
import GreyOrderBack from '../images/cards/greyorder/greyorder-card-back.jpg'
import Behemoth from '../images/cards/nakka/en/s1-aw1-048-en-behemoth.jpg'
import CarnivorousPlant from '../images/cards/nakka/en/s1-aw1-050-en-carnivorous-plant.jpg'
import DeathCrawler from '../images/cards/nakka/en/s1-aw1-052-en-death-crawler.jpg'
import Hexacarias from '../images/cards/nakka/en/s1-aw1-056-en-hexacarias.jpg'
import MountedBanshee from '../images/cards/nakka/en/s1-aw1-060-en-mounted-banshee.jpg'
import NakkaArcher from '../images/cards/nakka/en/s1-aw1-061-en-nakka-archer.jpg'
import Banshee from '../images/cards/nakka/en/s1-aw1-062-en-banshee.jpg'
import SenileYhdorian from '../images/cards/nakka/en/s1-aw1-073-en-senile-yhdorian.jpg'
import WrathOfTheForest from '../images/cards/nakka/en/s1-aw1-076-en-wrath-of-the-forest.jpg'
import Xenodon from '../images/cards/nakka/en/s1-aw1-077-en-xenodon.jpg'
import ThreeOfLife from '../images/cards/nakka/en/s1-aw1-081-en-tree-of-life.jpg'
import EarthQuake from '../images/cards/nakka/en/s1-aw1-084-en-earthquake.jpg'
import Mimicry from '../images/cards/nakka/en/s1-aw1-087-en-mimicry.jpg'
import NaturalCamouflage from '../images/cards/nakka/en/s1-aw1-089-en-natural-camouflage.jpg'
import UnstableGrowth from '../images/cards/nakka/en/s1-aw1-090-en-unstable-growth.jpg'
import NakkaBack from '../images/cards/nakka/nakka-card-back.jpg'
import Eagle from '../images/cards/whitelands/en/s1-aw1-003-en-eagle.jpg'
import Gabriel from '../images/cards/whitelands/en/s1-aw1-005-en-gabriel.jpg'
import IceGolem from '../images/cards/whitelands/en/s1-aw1-011-en-ice-golem.jpg'
import IcePaladin from '../images/cards/whitelands/en/s1-aw1-015-en-ice-paladin.jpg'
import LunarWendigo from '../images/cards/whitelands/en/s1-aw1-019-en-lunar-wendigo.jpg'

import NihilistPenguin from '../images/cards/whitelands/en/s1-aw1-022-en-nihilist-penguin.jpg'
import PaladinOfTheGuard from '../images/cards/whitelands/en/s1-aw1-024-en-paladin-of-the-guard.jpg'
import ShieldOfDawn from '../images/cards/whitelands/en/s1-aw1-027-en-shield-of-dawn.jpg'
import SnowGriffin from '../images/cards/whitelands/en/s1-aw1-029-en-snow-griffin.jpg'
import FortressOfMyjir from '../images/cards/whitelands/en/s1-aw1-033-en-fortress-of-myjir.jpg'
import Blizzard from '../images/cards/whitelands/en/s1-aw1-038-en-blizzard.jpg'
import IceMeteor from '../images/cards/whitelands/en/s1-aw1-043-en-ice-meteor.jpg'
import Teleportation from '../images/cards/whitelands/en/s1-aw1-046-en-teleportation.jpg'
import WinterProtects from '../images/cards/whitelands/en/s1-aw1-047-en-winter-protects.jpg'
import WhitelandsBack from '../images/cards/whitelands/whitelands-card-back.jpg'
import { CombatIcon } from '../locators/CombatIconLocator'
import { CombatResult } from '../locators/CombatResultIconLocator'

import { FactionCardHelp } from './FactionCardHelp'

export class FactionCardDescription extends CardDescription {
  images = {
    [FactionCard.NihilistPenguin]: NihilistPenguin,
    [FactionCard.LunarWendigo]: LunarWendigo,
    [FactionCard.ShieldOfDawn]: ShieldOfDawn,
    [FactionCard.IcePaladin]: IcePaladin,
    [FactionCard.Eagle]: Eagle,
    [FactionCard.PaladinOfTheGuard]: PaladinOfTheGuard,
    [FactionCard.SnowGriffin]: SnowGriffin,
    [FactionCard.Gabriel]: Gabriel,
    [FactionCard.IceGolem]: IceGolem,
    [FactionCard.FortressOfMyjir]: FortressOfMyjir,
    [FactionCard.IceMeteor]: IceMeteor,
    [FactionCard.WinterProtects]: WinterProtects,
    [FactionCard.Teleportation]: Teleportation,
    [FactionCard.Blizzard]: Blizzard,
    [FactionCard.DeathCrawler]: DeathCrawler,
    [FactionCard.Xenodon]: Xenodon,
    [FactionCard.NakkaArcher]: NakkaArcher,
    [FactionCard.SenileYhdorian]: SenileYhdorian,
    [FactionCard.Hexacarias]: Hexacarias,
    [FactionCard.CarnivorousPlant]: CarnivorousPlant,
    [FactionCard.Banshee]: Banshee,
    [FactionCard.Behemoth]: Behemoth,
    [FactionCard.MountedBanshee]: MountedBanshee,
    [FactionCard.WrathOfTheForest]: WrathOfTheForest,
    [FactionCard.TreeOfLife]: ThreeOfLife,
    [FactionCard.Earthquake]: EarthQuake,
    [FactionCard.UnstableGrowth]: UnstableGrowth,
    [FactionCard.NaturalCamouflage]: NaturalCamouflage,
    [FactionCard.Mimicry]: Mimicry,
    [FactionCard.DrunkKnight]: DrunkKnight,
    [FactionCard.Infantryman]: Infantryman,
    [FactionCard.Phalanx]: Phalanx,
    [FactionCard.Ballista]: Ballista,
    [FactionCard.Champion]: Champion,
    [FactionCard.GreyHorseman]: GreyHorseman,
    [FactionCard.SiegeTower]: SiegeTower,
    [FactionCard.HeroOfTheBattleOfNerz]: HeroOfTheBattleOfNerz,
    [FactionCard.TheSeneschal]: TheSeneschal,
    [FactionCard.AvalonFortress]: AvalonFortress,
    [FactionCard.Warcry]: Warcry,
    [FactionCard.ShieldWall]: ShieldWall,
    [FactionCard.HorseOfAvalon]: HorseOfAvalon,
    [FactionCard.ScuttleJaw]: ScuttleJaw,
    [FactionCard.SwampOgre]: SwampOgre,
    [FactionCard.SwampTroll]: SwampTroll,
    [FactionCard.Berserker]: Berserker,
    [FactionCard.PlagueCollector]: PlagueCollector,
    [FactionCard.Slayer]: Slayer,
    [FactionCard.ForgePatriarch]: ForgePatriarch,
    [FactionCard.AbominableHydra]: AbominableHydra,
    [FactionCard.ChildEater]: ChildEater,
    [FactionCard.WesternForge]: WesternForge,
    [FactionCard.FireLightning]: FireLighning,
    [FactionCard.Firestorm]: Firestorm,
    [FactionCard.TheFear]: TheFear,
    [FactionCard.ForcedExile]: ForcedExile
  }
  backImages = {
    [Faction.Whitelands]: WhitelandsBack,
    [Faction.Nakka]: NakkaBack,
    [Faction.GreyOrder]: GreyOrderBack,
    [Faction.Blight]: BlightBack
  }

  getLocations(item: MaterialItem, { index, rules }: ItemContext) {
    if (item.location.type !== LocationType.Battlefield || item.id.front === undefined) return []

    const locations: Location[] = getCardBattlefieldModifierLocations(rules.game, index)
    const cardRule = getCardRule(rules.game, index)
    const attacks = (rules.remind<Attack[]>(Memory.Attacks) ?? []).filter(attack => attack.targets.includes(index))
    if (attacks.length) {
      const attackValue = cardRule.getDamagesInflicted(attacks.map(attack => attack.card))
      const icon = cardRule.defense >= (attackValue ?? 0) ? CombatResult.Defense : cardRule.canRegenerate ? CombatResult.Regeneration : CombatResult.Dead
      locations.push({ type: LocationType.CombatResultIcon, parent: index, id: icon, x: attackValue })
    }
    locations.push({ type: LocationType.FactionCard, parent: index })
    return locations
  }

  canDrag(move: MaterialMove, context: ItemContext) {
    if (isCustomMoveType(CustomMoveType.Attack)(move)) {
      return move.data.card === context.index
    }

    return super.canDrag(move, context)
  }

  canLongClick(move: MaterialMove, context: ItemContext) {
    if (isCustomMove(move)) {
      switch (move.type) {
        case CustomMoveType.PerformAction:
        case CustomMoveType.ChooseCard:
          return move.data === context.index
      }
    }
    return this.canDrag(move, context)
  }

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext) {
    if (item.location && onBattlefieldAndAstralPlane(item.location)) {
      return item.location.rotation === true
    } else {
      return super.isFlipped(item, context)
    }
  }

  help = FactionCardHelp
}

export const factionCardDescription = new FactionCardDescription()


export function getCardBattlefieldModifierLocations(game: MaterialGame, index: number) {
  const locations: Location[] = []
  const cardRule = getCardRule(game, index)
  if (cardRule.attackModifier) {
    locations.push({ type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: index, x: cardRule.attack, y: cardRule.attackModifier })
  }
  if (cardRule.defenseModifier) {
    locations.push({ type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: index, x: cardRule.defense, y: cardRule.defenseModifier })
  }
  const characteristics = cardRule.characteristics
  const nativeAttributes = characteristics?.getAttributes() ?? []
  const attributes = cardRule.attributes
  const cancelledAttributes = differenceBy(nativeAttributes, attributes, attribute => attribute.type)
  let attributeIconPosition = 0
  for (const attribute of cancelledAttributes) {
    locations.push({ type: LocationType.AttributesIcons, id: { ...attribute, cancel: true }, x: attributeIconPosition++ })
  }
  const gainedAttributes = differenceBy(attributes, nativeAttributes, attribute => attribute.type)
  for (const attribute of gainedAttributes) {
    locations.push({ type: LocationType.AttributesIcons, id: attribute, x: attributeIconPosition++ })
  }
  const hasSkill = isCreature(characteristics) && characteristics.getSkills().length > 0
  if (hasSkill && cardRule.effects.some(effect => effect.type === EffectType.LoseSkills)) {
    locations.push({ type: LocationType.SkillLostIcon })
  }
  return locations
}
