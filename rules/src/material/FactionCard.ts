import { NihilistPenguin } from './cards/whitelands/NihilistPenguin'
import { LunarWendigo } from './cards/whitelands/LunarWendigo'
import { ShieldOfDawn } from './cards/whitelands/ShieldOfDawn'
import { IcePaladin } from './cards/whitelands/IcePaladin'
import { Eagle } from './cards/whitelands/Eagle'
import { PaladinOfTheGuard } from './cards/whitelands/PaladinOfTheGuard'
import { SnowGriffin } from './cards/whitelands/SnowGriffin'
import { Gabriel } from './cards/whitelands/Gabriel'
import { IceGolem } from './cards/whitelands/IceGolem'
import { FortressOfMyjir } from './cards/whitelands/FortressOfMyjir'
import { IceMeteor } from './cards/whitelands/IceMeteor'
import { WinterProtects } from './cards/whitelands/WinterProtects'
import { Teleportation } from './cards/whitelands/Teleportation'
import { Blizzard } from './cards/whitelands/Blizzard'
import { DeathCrawler } from './cards/nakka/DeathCrawler'
import { Xenodon } from './cards/nakka/Xenodon'
import { NakkaArcher } from './cards/nakka/NakkaArcher'
import { SenileYhdorian } from './cards/nakka/SenileYhdorian'
import { Hexacarias } from './cards/nakka/Hexacarias'
import { CarnivorousPlant } from './cards/nakka/CarnivorousPlant'
import { Banshee } from './cards/nakka/Banshee'
import { Behemoth } from './cards/nakka/Behemoth'
import { MountedBanshee } from './cards/nakka/MountedBanshee'
import { WrathOfTheForest } from './cards/nakka/WrathOfTheForest'
import { TreeOfLife } from './cards/nakka/TreeOfLife'
import { EarthQuake } from './cards/nakka/EarthQuake'
import { UnstableGrowth } from './cards/nakka/UnstableGrowth'
import { NaturalCamouflage } from './cards/nakka/NaturalCamouflage'
import { Mimicry } from './cards/nakka/Mimicry'
import { DrunkKnight } from './cards/greyorder/DrunkKnight'
import { Infantryman } from './cards/greyorder/Infantryman'
import { Phalanx } from './cards/greyorder/Phalanx'
import { Ballista } from './cards/greyorder/Ballista'
import { Champion } from './cards/greyorder/Champion'
import { GreyHorseman } from './cards/greyorder/GreyHorseman'
import { SiegeTower } from './cards/greyorder/SiegeTower'
import { HeroOfTheBattleOfNerz } from './cards/greyorder/HeroOfTheBattleOfNerz'
import { TheSeneschal } from './cards/greyorder/TheSeneschal'
import { AvalonFortress } from './cards/greyorder/AvalonFortress'
import { Warcry } from './cards/greyorder/Warcry'
import { ShieldWall } from './cards/greyorder/ShieldWall'
import { HorseOfAvalon } from './cards/greyorder/HorseOfAvalon'
import { ScuttleJaw } from './cards/blight/ScuttleJaw'
import { SwampOgre } from './cards/blight/SwampOgre'
import { SwampTroll } from './cards/blight/SwampTroll'
import { Berserker } from './cards/blight/Berserker'
import { PlagueCollector } from './cards/blight/PlagueCollector'
import { Slayer } from './cards/blight/Slayer'
import { ForgePatriarch } from './cards/blight/ForgePatriarch'
import { AbominableHydra } from './cards/blight/AbominableHydra'
import { ChildEater } from './cards/blight/ChildEater'
import { WesternForge } from './cards/blight/WesternForge'
import { FireLightning } from './cards/blight/FireLightning'
import { Firestorm } from './cards/blight/Firestorm'
import { TheFear } from './cards/blight/TheFear'
import { ForcedExile } from './cards/blight/ForcedExile'
import { FactionCardCharacteristics } from './cards/FactionCardCharacteristics'
import { Faction } from './Faction'

export enum FactionCard {
  Eagle = 1003,
  Gabriel = 1005,
  IceGolem = 1011,
  IcePaladin = 1015,
  LunarWendigo = 1019,
  NihilistPenguin = 1022,
  PaladinOfTheGuard = 1024,
  ShieldOfDawn = 1027,
  SnowGriffin = 1029,
  FortressOfMyjir = 1033,
  Blizzard = 1038,
  IceMeteor = 1043,
  Teleportation = 1046,
  WinterProtects,
  Behemoth,
  CarnivorousPlant = 1050,
  DeathCrawler = 1052,
  Hexacarias = 1056,
  MountedBanshee = 1060,
  NakkaArcher,
  Banshee,
  SenileYhdorian = 1073,
  WrathOfTheForest = 1076,
  Xenodon,
  TreeOfLife = 1081,
  Earthquake = 1084,
  Mimicry = 1087,
  NaturalCamouflage = 1089,
  UnstableGrowth,
  Ballista = 1096,
  Champion = 1100,
  DrunkKnight = 1102,
  GreyHorseman = 1105,
  HeroOfTheBattleOfNerz = 1110,
  Infantryman,
  Phalanx = 1113,
  SiegeTower = 1116,
  TheSeneschal = 1119,
  AvalonFortress = 1127,
  HorseOfAvalon = 1134,
  ShieldWall = 1139,
  Warcry = 1142,
  AbominableHydra = 1144,
  Berserker = 1146,
  ChildEater,
  ForgePatriarch = 1156,
  PlagueCollector = 1165,
  ScuttleJaw = 1171,
  Slayer,
  SwampOgre = 1175,
  SwampTroll,
  WesternForge = 1179,
  FireLightning = 1184,
  Firestorm,
  ForcedExile,
  TheFear = 1191
}

export type CardId = {
  front: FactionCard
  back: Faction
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
  [FactionCard.Earthquake]: new EarthQuake(),
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
