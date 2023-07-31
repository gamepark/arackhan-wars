import { NihilistPenguin } from '../rules/cards/descriptions/whitelands/NihilistPenguin'
import { LunarWendigo } from '../rules/cards/descriptions/whitelands/LunarWendigo'
import { ShieldOfDawn } from '../rules/cards/descriptions/whitelands/ShieldOfDawn'
import { IcePaladin } from '../rules/cards/descriptions/whitelands/IcePaladin'
import { Eagle } from '../rules/cards/descriptions/whitelands/Eagle'
import { PaladinOfTheGuard } from '../rules/cards/descriptions/whitelands/PaladinOfTheGuard'
import { SnowGriffin } from '../rules/cards/descriptions/whitelands/SnowGriffin'
import { Gabriel } from '../rules/cards/descriptions/whitelands/Gabriel'
import { IceGolem } from '../rules/cards/descriptions/whitelands/IceGolem'
import { FortressOfMyjir } from '../rules/cards/descriptions/whitelands/FortressOfMyjir'
import { IceMeteor } from '../rules/cards/descriptions/whitelands/IceMeteor'
import { WinterProtects } from '../rules/cards/descriptions/whitelands/WinterProtects'
import { Teleportation } from '../rules/cards/descriptions/whitelands/Teleportation'
import { Blizzard } from '../rules/cards/descriptions/whitelands/Blizzard'
import { DeathCrawler } from '../rules/cards/descriptions/nakka/DeathCrawler'
import { Xenodon } from '../rules/cards/descriptions/nakka/Xenodon'
import { NakkaArcher } from '../rules/cards/descriptions/nakka/NakkaArcher'
import { SenileYhdorian } from '../rules/cards/descriptions/nakka/SenileYhdorian'
import { Hexacarias } from '../rules/cards/descriptions/nakka/Hexacarias'
import { CarnivorousPlant } from '../rules/cards/descriptions/nakka/CarnivorousPlant'
import { Banshee } from '../rules/cards/descriptions/nakka/Banshee'
import { Behemoth } from '../rules/cards/descriptions/nakka/Behemoth'
import { MountedBanshee } from '../rules/cards/descriptions/nakka/MountedBanshee'
import { WrathOfTheForest } from '../rules/cards/descriptions/nakka/WrathOfTheForest'
import { TreeOfLife } from '../rules/cards/descriptions/nakka/TreeOfLife'
import { EarthQuake } from '../rules/cards/descriptions/nakka/EarthQuake'
import { UnstableGrowth } from '../rules/cards/descriptions/nakka/UnstableGrowth'
import { NaturalCamouflage } from '../rules/cards/descriptions/nakka/NaturalCamouflage'
import { Mimicry } from '../rules/cards/descriptions/nakka/Mimicry'
import { DrunkKnight } from '../rules/cards/descriptions/greyorder/DrunkKnight'
import { Infantryman } from '../rules/cards/descriptions/greyorder/Infantryman'
import { Phalanx } from '../rules/cards/descriptions/greyorder/Phalanx'
import { Ballista } from '../rules/cards/descriptions/greyorder/Ballista'
import { Champion } from '../rules/cards/descriptions/greyorder/Champion'
import { GreyHorseman } from '../rules/cards/descriptions/greyorder/GreyHorseman'
import { SiegeTower } from '../rules/cards/descriptions/greyorder/SiegeTower'
import { HeroOfTheBattleOfNerz } from '../rules/cards/descriptions/greyorder/HeroOfTheBattleOfNerz'
import { TheSeneschal } from '../rules/cards/descriptions/greyorder/TheSeneschal'
import { AvalonFortress } from '../rules/cards/descriptions/greyorder/AvalonFortress'
import { Warcry } from '../rules/cards/descriptions/greyorder/Warcry'
import { ShieldWall } from '../rules/cards/descriptions/greyorder/ShieldWall'
import { HorseOfAvalon } from '../rules/cards/descriptions/greyorder/HorseOfAvalon'
import { ScuttleJaw } from '../rules/cards/descriptions/blight/ScuttleJaw'
import { SwampOgre } from '../rules/cards/descriptions/blight/SwampOgre'
import { SwampTroll } from '../rules/cards/descriptions/blight/SwampTroll'
import { Berserker } from '../rules/cards/descriptions/blight/Berserker'
import { PlagueCollector } from '../rules/cards/descriptions/blight/PlagueCollector'
import { Slayer } from '../rules/cards/descriptions/blight/Slayer'
import { ForgePatriarch } from '../rules/cards/descriptions/blight/ForgePatriarch'
import { AbominableHydra } from '../rules/cards/descriptions/blight/AbominableHydra'
import { ChildEater } from '../rules/cards/descriptions/blight/ChildEater'
import { WesternForge } from '../rules/cards/descriptions/blight/WesternForge'
import { FireLightning } from '../rules/cards/descriptions/blight/FireLightning'
import { Firestorm } from '../rules/cards/descriptions/blight/Firestorm'
import { TheFear } from '../rules/cards/descriptions/blight/TheFear'
import { ForcedExile } from '../rules/cards/descriptions/blight/ForcedExile'
import { FactionCardCharacteristics } from '../rules/cards/descriptions/base/FactionCardCharacteristics'
import { MaterialGame } from '@gamepark/rules-api'
import { MaterialType } from './MaterialType'
import { getTurnEffects, TurnEffectType } from '../rules/cards/rules/action/TurnEffect'

export enum FactionCard {
  NihilistPenguin = 1,
  LunarWendigo,
  ShieldOfDawn,
  IcePaladin,
  Eagle,
  PaladinOfTheGuard,
  SnowGriffin,
  Gabriel,
  IceGolem,
  FortressOfMyjir,
  IceMeteor,
  WinterProtects,
  Teleportation,
  Blizzard,
  DeathCrawler,
  Xenodon,
  NakkaArcher,
  SenileYhdorian,
  Hexacarias,
  CarnivorousPlant,
  Banshee,
  Behemoth,
  MountedBanshee,
  WrathOfTheForest,
  TreeOfLife,
  EarthQuake,
  UnstableGrowth,
  NaturalCamouflage,
  Mimicry,
  DrunkKnight,
  Infantryman,
  Phalanx,
  Ballista,
  Champion,
  GreyHorseman,
  SiegeTower,
  HeroOfTheBattleOfNerz,
  TheSeneschal,
  AvalonFortress,
  Warcry,
  ShieldWall,
  HorseOfAvalon,
  ScuttleJaw,
  SwampOgre,
  SwampTroll,
  Berserker,
  PlagueCollector,
  Slayer,
  ForgePatriarch,
  AbominableHydra,
  ChildEater,
  WesternForge,
  FireLightning,
  Firestorm,
  TheFear,
  ForcedExile
}

export const getCharacteristics = (cardIndex: number, game: MaterialGame) => {
  const turnEffects = getTurnEffects(game)
  const mimicry = turnEffects.find(effect => effect.type === TurnEffectType.Mimicry && effect.target === cardIndex)
  if (mimicry) cardIndex = mimicry.copied
  const factionCard = game.items[MaterialType.FactionCard]![cardIndex].id.front as FactionCard
  return FactionCardsCharacteristics[factionCard]
}

export const FactionCardsCharacteristics: Record<FactionCard, FactionCardCharacteristics> = {
  // WHITELANDS
  [FactionCard.NihilistPenguin]: new NihilistPenguin(),
  [FactionCard.LunarWendigo]: new LunarWendigo(),
  [FactionCard.ShieldOfDawn]: new ShieldOfDawn(),
  [FactionCard.IcePaladin]: new IcePaladin(),
  [FactionCard.Eagle]: new Eagle(),
  [FactionCard.PaladinOfTheGuard]: new PaladinOfTheGuard(),
  [FactionCard.SnowGriffin]: new SnowGriffin(),
  [FactionCard.Gabriel]: new Gabriel(),
  [FactionCard.IceGolem]: new IceGolem(),
  [FactionCard.FortressOfMyjir]: new FortressOfMyjir(),
  [FactionCard.IceMeteor]: new IceMeteor(),
  [FactionCard.WinterProtects]: new WinterProtects(),
  [FactionCard.Teleportation]: new Teleportation(),
  [FactionCard.Blizzard]: new Blizzard(),

  // NAKKA
  [FactionCard.DeathCrawler]: new DeathCrawler(),
  [FactionCard.Xenodon]: new Xenodon(),
  [FactionCard.NakkaArcher]: new NakkaArcher(),
  [FactionCard.SenileYhdorian]: new SenileYhdorian(),
  [FactionCard.Hexacarias]: new Hexacarias(),
  [FactionCard.CarnivorousPlant]: new CarnivorousPlant(),
  [FactionCard.Banshee]: new Banshee(),
  [FactionCard.Behemoth]: new Behemoth(),
  [FactionCard.MountedBanshee]: new MountedBanshee(),
  [FactionCard.WrathOfTheForest]: new WrathOfTheForest(),
  [FactionCard.TreeOfLife]: new TreeOfLife(),
  [FactionCard.EarthQuake]: new EarthQuake(),
  [FactionCard.UnstableGrowth]: new UnstableGrowth(),
  [FactionCard.NaturalCamouflage]: new NaturalCamouflage(),
  [FactionCard.Mimicry]: new Mimicry(),

  // GREY ORDER
  [FactionCard.DrunkKnight]: new DrunkKnight(),
  [FactionCard.Infantryman]: new Infantryman(),
  [FactionCard.Phalanx]: new Phalanx(),
  [FactionCard.Ballista]: new Ballista(),
  [FactionCard.Champion]: new Champion(),
  [FactionCard.GreyHorseman]: new GreyHorseman(),
  [FactionCard.SiegeTower]: new SiegeTower(),
  [FactionCard.HeroOfTheBattleOfNerz]: new HeroOfTheBattleOfNerz(),
  [FactionCard.TheSeneschal]: new TheSeneschal(),
  [FactionCard.AvalonFortress]: new AvalonFortress(),
  [FactionCard.Warcry]: new Warcry(),
  [FactionCard.ShieldWall]: new ShieldWall(),
  [FactionCard.HorseOfAvalon]: new HorseOfAvalon(),

  // BLIGHTS
  [FactionCard.ScuttleJaw]: new ScuttleJaw(),
  [FactionCard.SwampOgre]: new SwampOgre(),
  [FactionCard.SwampTroll]: new SwampTroll(),
  [FactionCard.Berserker]: new Berserker(),
  [FactionCard.PlagueCollector]: new PlagueCollector(),
  [FactionCard.Slayer]: new Slayer(),
  [FactionCard.ForgePatriarch]: new ForgePatriarch(),
  [FactionCard.AbominableHydra]: new AbominableHydra(),
  [FactionCard.ChildEater]: new ChildEater(),
  [FactionCard.WesternForge]: new WesternForge(),
  [FactionCard.FireLightning]: new FireLightning(),
  [FactionCard.Firestorm]: new Firestorm(),
  [FactionCard.TheFear]: new TheFear(),
  [FactionCard.ForcedExile]: new ForcedExile()
}
