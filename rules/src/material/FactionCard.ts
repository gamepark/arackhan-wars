import { NihilistPenguin } from '../rules/cards/descriptions/whitelands/NihilistPenguin'
import { FactionCardRule } from '../rules/cards/rules/base/FactionCardRule'
import { LunarWendigo } from '../rules/cards/descriptions/whitelands/LunarWendigo'
import { ShieldOfDown } from '../rules/cards/descriptions/whitelands/ShieldOfDown'
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
import { DrunkKnight } from '../rules/cards/descriptions/grayorder/DrunkKnight'
import { Infantryman } from '../rules/cards/descriptions/grayorder/Infantryman'
import { Phalanx } from '../rules/cards/descriptions/grayorder/Phalanx'
import { Ballista } from '../rules/cards/descriptions/grayorder/Ballista'
import { Champion } from '../rules/cards/descriptions/grayorder/Champion'
import { GreyHorseman } from '../rules/cards/descriptions/grayorder/GreyHorseman'
import { SiegeTower } from '../rules/cards/descriptions/grayorder/SiegeTower'
import { HeroOfTheBattleOfNerz } from '../rules/cards/descriptions/grayorder/HeroOfTheBattleOfNerz'
import { TheSeneschal } from '../rules/cards/descriptions/grayorder/TheSeneschal'
import { AvalonFortress } from '../rules/cards/descriptions/grayorder/AvalonFortress'
import { Warcry } from '../rules/cards/descriptions/grayorder/Warcry'
import { ShieldWall } from '../rules/cards/descriptions/grayorder/ShieldWall'
import { HorseOfAvalon } from '../rules/cards/descriptions/grayorder/HorseOfAvalon'
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
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { ShieldWallRule } from '../rules/cards/rules/ShieldWallRule'
import { FactionCardDetail } from '../rules/cards/descriptions/FactionCardDetail'
import { BlizzardRule } from '../rules/cards/rules/BlizzardRule'
import { IceMeteorRule } from '../rules/cards/rules/IceMeteorRule'
import { TeleportationRule } from '../rules/cards/rules/TeleportationRule'
import { WinterProtectsRule } from '../rules/cards/rules/WinterProtectsRule'
import { EarthQuakeRule } from '../rules/cards/rules/EarthQuakeRule'
import { MimicryRule } from '../rules/cards/rules/MimicryRule'
import { NaturalCamouflageRule } from '../rules/cards/rules/NaturalCamouflageRule'
import { UnstableGrowthRule } from '../rules/cards/rules/UnstableGrowthRule'
import { HorseOfAvalonRule } from '../rules/cards/rules/HorseOfAvalonRule'
import { WarcryRule } from '../rules/cards/rules/WarcryRule'
import { FireLightningRule } from '../rules/cards/rules/FireLightningRule'
import { FirestormRule } from '../rules/cards/rules/FirestormRule'
import { ForcedExileRule } from '../rules/cards/rules/ForcedExileRule'
import { TheFearRule } from '../rules/cards/rules/TheFearRule'
import { MaterialType } from './MaterialType'
import { ChildEaterRule } from '../rules/cards/rules/ChildEaterRule'
import { ForgePatriarchRule } from '../rules/cards/rules/ForgePatriarchRule'
import { PlagueCollectorRule } from '../rules/cards/rules/PlagueCollectorRule'
import { PhalanxRule } from '../rules/cards/rules/PhalanxRule'
import { WesternForgeRule } from '../rules/cards/rules/WesternForgeRule'
import { AvalonFortressRule } from '../rules/cards/rules/AvalonFortressRule'
import { CarnivorousPlantRule } from '../rules/cards/rules/CarnivorousPlantRule'
import { ChampionRule } from '../rules/cards/rules/ChampionRule'
import { DrunkKnightRule } from '../rules/cards/rules/DrunkKnightRule'
import { FortressOfMyjirRule } from '../rules/cards/rules/FortressOfMyjirRule'
import { HeroOfTheBattleOfNerzRule } from '../rules/cards/rules/HeroOfTheBattleOfNerzRule'
import { InfantrymanRule } from '../rules/cards/rules/InfantrymanRule'
import { ShieldOfDawnRule } from '../rules/cards/rules/ShieldOfDawnRule'
import { SnowGriffinRule } from '../rules/cards/rules/SnowGriffinRule'
import { TreeOfLifeRule } from '../rules/cards/rules/TreeOfLifeRule'
import { SwampTrollRule } from '../rules/cards/rules/SwampTrollRule'

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

export const getFactionCardDescription = (factionCardId: FactionCard) => FactionCardDescriptions[factionCardId]
export const FactionCardDescriptions: Record<FactionCard, FactionCardDetail> = {
  // WHITELANDS
  [FactionCard.NihilistPenguin]: new NihilistPenguin(),
  [FactionCard.LunarWendigo]: new LunarWendigo(),
  [FactionCard.ShieldOfDawn]: new ShieldOfDown(),
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


export interface FactionCardRuleCreator<Player extends number = number,
  MaterialType extends number = number,
  LocationType extends number = number> {
  new(
    game: MaterialGame<Player, MaterialType, LocationType>,
    index: number
  ): FactionCardRule
}

export const SpecificFactionCardRules: Partial<Record<FactionCard, FactionCardRuleCreator>> = {
  [FactionCard.AvalonFortress]: AvalonFortressRule,
  [FactionCard.Blizzard]: BlizzardRule,
  [FactionCard.CarnivorousPlant]: CarnivorousPlantRule,
  [FactionCard.Champion]: ChampionRule,
  [FactionCard.ChildEater]: ChildEaterRule,
  [FactionCard.DrunkKnight]: DrunkKnightRule,
  [FactionCard.EarthQuake]: EarthQuakeRule,
  [FactionCard.FireLightning]: FireLightningRule,
  [FactionCard.Firestorm]: FirestormRule,
  [FactionCard.ForcedExile]: ForcedExileRule,
  [FactionCard.ForgePatriarch]: ForgePatriarchRule,
  [FactionCard.FortressOfMyjir]: FortressOfMyjirRule,
  [FactionCard.HeroOfTheBattleOfNerz]: HeroOfTheBattleOfNerzRule,
  [FactionCard.HorseOfAvalon]: HorseOfAvalonRule,
  [FactionCard.IceMeteor]: IceMeteorRule,
  [FactionCard.Infantryman]: InfantrymanRule,
  [FactionCard.Mimicry]: MimicryRule,
  [FactionCard.NaturalCamouflage]: NaturalCamouflageRule,
  [FactionCard.Phalanx]: PhalanxRule,
  [FactionCard.PlagueCollector]: PlagueCollectorRule,
  [FactionCard.ShieldOfDawn]: ShieldOfDawnRule,
  [FactionCard.ShieldWall]: ShieldWallRule,
  [FactionCard.SnowGriffin]: SnowGriffinRule,
  [FactionCard.Teleportation]: TeleportationRule,
  [FactionCard.TheFear]: TheFearRule,
  [FactionCard.TreeOfLife]: TreeOfLifeRule,
  [FactionCard.UnstableGrowth]: UnstableGrowthRule,
  [FactionCard.Warcry]: WarcryRule,
  [FactionCard.WesternForge]: WesternForgeRule,
  [FactionCard.WinterProtects]: WinterProtectsRule,
  [FactionCard.SwampTroll]: SwampTrollRule
}

export const getFactionCardRule = (game: MaterialGame, index: number): FactionCardRule => {
  const id = game.items[MaterialType.FactionCard]![index].id.front
  const specificCardRule = SpecificFactionCardRules[id]
  if (specificCardRule) return new specificCardRule(game, index)

  return new FactionCardRule(game, index)
}
