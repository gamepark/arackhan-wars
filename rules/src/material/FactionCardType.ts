import { NihilistPenguin } from '../rules/cards/whitelands/NihilistPenguin'
import { FactionCardRule } from '../rules/cards/FactionCardRule'
import { LunarWendigo } from '../rules/cards/whitelands/LunarWendigo'
import { ShieldOfDown } from '../rules/cards/whitelands/ShieldOfDown'
import { IcePaladin } from '../rules/cards/whitelands/IcePaladin'
import { Eagle } from '../rules/cards/whitelands/Eagle'
import { PaladinOfTheGuard } from '../rules/cards/whitelands/PaladinOfTheGuard'
import { SnowGriffin } from '../rules/cards/whitelands/SnowGriffin'
import { Gabriel } from '../rules/cards/whitelands/Gabriel'
import { IceGolem } from '../rules/cards/whitelands/IceGolem'
import { FortressOfMyjir } from '../rules/cards/whitelands/FortressOfMyjir'
import { IceMeteor } from '../rules/cards/whitelands/IceMeteor'
import { WinterProtects } from '../rules/cards/whitelands/WinterProtects'
import { Teleportation } from '../rules/cards/whitelands/Teleportation'
import { Blizzard } from '../rules/cards/whitelands/Blizzard'
import { DeathCrawler } from '../rules/cards/nakka/DeathCrawler'
import { Xenodon } from '../rules/cards/nakka/Xenodon'
import { NakkaArcher } from '../rules/cards/nakka/NakkaArcher'
import { SenileYhdorian } from '../rules/cards/nakka/SenileYhdorian'
import { Hexacarias } from '../rules/cards/nakka/Hexacarias'
import { CarnivorousPlant } from '../rules/cards/nakka/CarnivorousPlant'
import { Banshee } from '../rules/cards/nakka/Banshee'
import { Behemoth } from '../rules/cards/nakka/Behemoth'
import { MountedBanshee } from '../rules/cards/nakka/MountedBanshee'
import { WrathOfTheForest } from '../rules/cards/nakka/WrathOfTheForest'
import { TreeOfLife } from '../rules/cards/nakka/TreeOfLife'
import { EarthQuake } from '../rules/cards/nakka/EarthQuake'
import { UnstableGrowth } from '../rules/cards/nakka/UnstableGrowth'
import { NaturalCamouflage } from '../rules/cards/nakka/NaturalCamouflage'
import { Mimicry } from '../rules/cards/nakka/Mimicry'
import { DrunkKnight } from '../rules/cards/grayorder/DrunkKnight'
import { Infantryman } from '../rules/cards/grayorder/Infantryman'
import { Phalanx } from '../rules/cards/grayorder/Phalanx'
import { Ballista } from '../rules/cards/grayorder/Ballista'
import { Champion } from '../rules/cards/grayorder/Champion'
import { GreyHorseman } from '../rules/cards/grayorder/GreyHorseman'
import { SiegeTower } from '../rules/cards/grayorder/SiegeTower'
import { HeroOfTheBattleOfNerz } from '../rules/cards/grayorder/HeroOfTheBattleOfNerz'
import { TheSeneschal } from '../rules/cards/grayorder/TheSeneschal'
import { AvalonFortress } from '../rules/cards/grayorder/AvalonFortress'
import { Warcry } from '../rules/cards/grayorder/Warcry'
import { ShieldWall } from '../rules/cards/grayorder/ShieldWall'
import { HorseOfAvalon } from '../rules/cards/grayorder/HorseOfAvalon'
import { ScuttleJaw } from '../rules/cards/blight/ScuttleJaw'
import { SwampOgre } from '../rules/cards/blight/SwampOgre'
import { SwampTroll } from '../rules/cards/blight/SwampTroll'
import { Berserker } from '../rules/cards/blight/Berserker'
import { PlagueCollector } from '../rules/cards/blight/PlagueCollector'
import { Slayer } from '../rules/cards/blight/Slayer'
import { ForgePatriarch } from '../rules/cards/blight/ForgePatriarch'
import { AbominableHydra } from '../rules/cards/blight/AbominableHydra'
import { ChildEater } from '../rules/cards/blight/ChildEater'
import { WesternForge } from '../rules/cards/blight/WesternForge'
import { FireLightning } from '../rules/cards/blight/FireLightning'
import { Firestorm } from '../rules/cards/blight/Firestorm'
import { TheFear } from '../rules/cards/blight/TheFear'
import { ForcedExile } from '../rules/cards/blight/ForcedExile'

export enum FactionCardType {
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


export const FactionCards: Record<FactionCardType, FactionCardRule> = {
  // WHITELANDS
  [FactionCardType.NihilistPenguin]: new NihilistPenguin(),
  [FactionCardType.LunarWendigo]: new LunarWendigo(),
  [FactionCardType.ShieldOfDawn]: new ShieldOfDown(),
  [FactionCardType.IcePaladin]: new IcePaladin(),
  [FactionCardType.Eagle]: new Eagle(),
  [FactionCardType.PaladinOfTheGuard]: new PaladinOfTheGuard(),
  [FactionCardType.SnowGriffin]: new SnowGriffin(),
  [FactionCardType.Gabriel]: new Gabriel(),
  [FactionCardType.IceGolem]: new IceGolem(),
  [FactionCardType.FortressOfMyjir]: new FortressOfMyjir(),
  [FactionCardType.IceMeteor]: new IceMeteor(),
  [FactionCardType.WinterProtects]: new WinterProtects(),
  [FactionCardType.Teleportation]: new Teleportation(),
  [FactionCardType.Blizzard]: new Blizzard(),

  // NAKKA
  [FactionCardType.DeathCrawler]: new DeathCrawler(),
  [FactionCardType.Xenodon]: new Xenodon(),
  [FactionCardType.NakkaArcher]: new NakkaArcher(),
  [FactionCardType.SenileYhdorian]: new SenileYhdorian(),
  [FactionCardType.Hexacarias]: new Hexacarias(),
  [FactionCardType.CarnivorousPlant]: new CarnivorousPlant(),
  [FactionCardType.Banshee]: new Banshee(),
  [FactionCardType.Behemoth]: new Behemoth(),
  [FactionCardType.MountedBanshee]: new MountedBanshee(),
  [FactionCardType.WrathOfTheForest]: new WrathOfTheForest(),
  [FactionCardType.TreeOfLife]: new TreeOfLife(),
  [FactionCardType.EarthQuake]: new EarthQuake(),
  [FactionCardType.UnstableGrowth]: new UnstableGrowth(),
  [FactionCardType.NaturalCamouflage]: new NaturalCamouflage(),
  [FactionCardType.Mimicry]: new Mimicry(),

  // GREY ORDER
  [FactionCardType.DrunkKnight]: new DrunkKnight(),
  [FactionCardType.Infantryman]: new Infantryman(),
  [FactionCardType.Phalanx]: new Phalanx(),
  [FactionCardType.Ballista]: new Ballista(),
  [FactionCardType.Champion]: new Champion(),
  [FactionCardType.GreyHorseman]: new GreyHorseman(),
  [FactionCardType.SiegeTower]: new SiegeTower(),
  [FactionCardType.HeroOfTheBattleOfNerz]: new HeroOfTheBattleOfNerz(),
  [FactionCardType.TheSeneschal]: new TheSeneschal(),
  [FactionCardType.AvalonFortress]: new AvalonFortress(),
  [FactionCardType.Warcry]: new Warcry(),
  [FactionCardType.ShieldWall]: new ShieldWall(),
  [FactionCardType.HorseOfAvalon]: new HorseOfAvalon(),

  // BLIGHTS
  [FactionCardType.ScuttleJaw]: new ScuttleJaw(),
  [FactionCardType.SwampOgre]: new SwampOgre(),
  [FactionCardType.SwampTroll]: new SwampTroll(),
  [FactionCardType.Berserker]: new Berserker(),
  [FactionCardType.PlagueCollector]: new PlagueCollector(),
  [FactionCardType.Slayer]: new Slayer(),
  [FactionCardType.ForgePatriarch]: new ForgePatriarch(),
  [FactionCardType.AbominableHydra]: new AbominableHydra(),
  [FactionCardType.ChildEater]: new ChildEater(),
  [FactionCardType.WesternForge]: new WesternForge(),
  [FactionCardType.FireLightning]: new FireLightning(),
  [FactionCardType.Firestorm]: new Firestorm(),
  [FactionCardType.TheFear]: new TheFear(),
  [FactionCardType.ForcedExile]: new ForcedExile()
}
