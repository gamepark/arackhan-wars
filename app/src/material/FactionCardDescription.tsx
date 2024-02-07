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
import { isDeckbuilding } from '../deckbuilding/deckbuilding.util'
import BlightCardBack from '../images/cards/blight/BlightCardBack.jpg'
import EN1144AbominableHydra from '../images/cards/blight/en/EN1144AbominableHydra.jpg'
import EN1146Berserker from '../images/cards/blight/en/EN1146Berserker.jpg'
import EN1147ChildEater from '../images/cards/blight/en/EN1147ChildEater.jpg'
import EN1156ForgePatriarch from '../images/cards/blight/en/EN1156ForgePatriarch.jpg'
import EN1165PlagueCollector from '../images/cards/blight/en/EN1165PlagueCollector.jpg'
import EN1171ScuttleJaw from '../images/cards/blight/en/EN1171ScuttleJaw.jpg'
import EN1172Slayer from '../images/cards/blight/en/EN1172Slayer.jpg'
import EN1175SwampOgre from '../images/cards/blight/en/EN1175SwampOgre.jpg'
import EN1176SwampTroll from '../images/cards/blight/en/EN1176SwampTroll.jpg'
import EN1179WesternForge from '../images/cards/blight/en/EN1179WesternForge.jpg'
import EN1184FireLightning from '../images/cards/blight/en/EN1184FireLightning.jpg'
import EN1185Firestorm from '../images/cards/blight/en/EN1185Firestorm.jpg'
import EN1186ForcedExile from '../images/cards/blight/en/EN1186ForcedExile.jpg'
import EN1191TheFear from '../images/cards/blight/en/EN1191TheFear.jpg'
import EN1092AngryPeasant from '../images/cards/greyorder/en/EN1092AngryPeasant.jpg'
import EN1093Archer from '../images/cards/greyorder/en/EN1093ArcherFullArt.jpg'
import EN1094Armorer from '../images/cards/greyorder/en/EN1094Armorer.jpg'
import EN1095Assassin from '../images/cards/greyorder/en/EN1095Assassin.jpg'
import EN1096Ballista from '../images/cards/greyorder/en/EN1096Ballista.jpg'
import EN1097BallistaFullArt from '../images/cards/greyorder/en/EN1097BallistaFullArt.jpg'
import EN1098Catanolith from '../images/cards/greyorder/en/EN1098CatanolithHolo.jpg'
import EN1099Catapult from '../images/cards/greyorder/en/EN1099Catapult.jpg'
import EN1100Champion from '../images/cards/greyorder/en/EN1100Champion.jpg'
import EN1101DragonSlayer from '../images/cards/greyorder/en/EN1101DragonSlayer.jpg'
import EN1102DrunkKnight from '../images/cards/greyorder/en/EN1102DrunkKnight.jpg'
import EN1103DrunkKnightFullArt from '../images/cards/greyorder/en/EN1103DrunkKnightFullArt.jpg'
import EN1104Fanatic from '../images/cards/greyorder/en/EN1104Fanatic.jpg'
import EN1105GreyHorseman from '../images/cards/greyorder/en/EN1105GreyHorseman.jpg'
import EN1106GreyHorsemanFullArt from '../images/cards/greyorder/en/EN1106GreyHorsemanFullArt.jpg'
import EN1107GreyKnight from '../images/cards/greyorder/en/EN1107GreyKnightHolo.jpg'
import EN1108GreyMissionary from '../images/cards/greyorder/en/EN1108GreyMissionary.jpg'
import EN1109GreyPriest from '../images/cards/greyorder/en/EN1109GreyPriest.jpg'
import EN1110HeroOfTheBattleOfNerz from '../images/cards/greyorder/en/EN1110HeroOfTheBattleOfNerz.jpg'
import EN1111Infantryman from '../images/cards/greyorder/en/EN1111Infantryman.jpg'
import EN1112NemesioGreyOrder from '../images/cards/greyorder/en/EN1112NemesioFullArt.jpg'
import EN1113Phalanx from '../images/cards/greyorder/en/EN1113Phalanx.jpg'
import EN1114PhalanxFullArt from '../images/cards/greyorder/en/EN1114PhalanxFullArt.jpg'
import EN1115SeniorMercenary from '../images/cards/greyorder/en/EN1115SeniorMercenary.jpg'
import EN1116SiegeTower from '../images/cards/greyorder/en/EN1116SiegeTower.jpg'
import EN1117SoberKnight from '../images/cards/greyorder/en/EN1117SoberKnight.jpg'
import EN1118StandardBearer from '../images/cards/greyorder/en/EN1118StandardBearer.jpg'
import EN1119TheSeneschal from '../images/cards/greyorder/en/EN1119TheSeneschal.jpg'
import EN1120TheSeneschalFullArtHolo from '../images/cards/greyorder/en/EN1120TheSeneschalFullArtHolo.jpg'
import EN1121TheSeneschalFullArt from '../images/cards/greyorder/en/EN1121TheSeneschalFullArt.jpg'
import EN1122Titan from '../images/cards/greyorder/en/EN1122Titan.jpg'
import EN1123TitanFullArt from '../images/cards/greyorder/en/EN1123TitanFullArt.jpg'
import EN1124TomurDiscFullArt from '../images/cards/greyorder/en/EN1124TomurDiscFullArt.jpg'
import EN1125WhitePlainsMercenary from '../images/cards/greyorder/en/EN1125WhitePlainsMercenary.jpg'
import EN1126WhitePlainsMercenaryFullArt from '../images/cards/greyorder/en/EN1126WhitePlainsMercenaryFullArt.jpg'
import EN1127AvalonFortress from '../images/cards/greyorder/en/EN1127AvalonFortress.jpg'
import EN1128AvalonFortressFullArtHolo from '../images/cards/greyorder/en/EN1128AvalonFortressFullArtHolo.jpg'
import EN1129AvalonFortressFullArt from '../images/cards/greyorder/en/EN1129AvalonFortressFullArt.jpg'
import EN1130GhostMetalMonolith from '../images/cards/greyorder/en/EN1130GhostMetalMonolith.jpg'
import EN1131MastersOfAracKhan from '../images/cards/greyorder/en/EN1131MastersOfAracKhanHolo.jpg'
import EN1132ArmouredConvoy from '../images/cards/greyorder/en/EN1132ArmouredConvoy.jpg'
import EN1133Backup from '../images/cards/greyorder/en/EN1133Backup.jpg'
import EN1134HorseOfAvalon from '../images/cards/greyorder/en/EN1134HorseOfAvalon.jpg'
import EN1135HorseOfAvalonFullArtHolo from '../images/cards/greyorder/en/EN1135HorseOfAvalonFullArtHolo.jpg'
import EN1136HorseOfAvalonFullArt from '../images/cards/greyorder/en/EN1136HorseOfAvalonFullArt.jpg'
import EN1137MarchingOrder from '../images/cards/greyorder/en/EN1137MarchingOrder.jpg'
import EN1138OnLeave from '../images/cards/greyorder/en/EN1138OnLeave.jpg'
import EN1139ShieldWall from '../images/cards/greyorder/en/EN1139ShieldWall.jpg'
import EN1140TheGreyOrderRises from '../images/cards/greyorder/en/EN1140TheGreyOrderRises.jpg'
import EN1141Truce from '../images/cards/greyorder/en/EN1141TruceFullArt.jpg'
import EN1142Warcry from '../images/cards/greyorder/en/EN1142Warcry.jpg'
import EN1143YhdilBlast from '../images/cards/greyorder/en/EN1143YhdilBlast.jpg'
import GreyOrderCardBack from '../images/cards/greyorder/GreyOrderCardBack.jpg'
import EN1048Behemoth from '../images/cards/nakka/en/EN1048Behemoth.jpg'
import EN1049BehemothFullArt from '../images/cards/nakka/en/EN1049BehemothFullArt.jpg'
import EN1050CarnivorousPlant from '../images/cards/nakka/en/EN1050CarnivorousPlant.jpg'
import EN1051CrawlingRoots from '../images/cards/nakka/en/EN1051CrawlingRoots.jpg'
import EN1052DeathCrawler from '../images/cards/nakka/en/EN1052DeathCrawler.jpg'
import EN1056Hexacarias from '../images/cards/nakka/en/EN1056Hexacarias.jpg'
import EN1057LightningBird from '../images/cards/nakka/en/EN1057LightningBird.jpg'
import EN1058LightningBirdFullArt from '../images/cards/nakka/en/EN1058LightningBirdFullArt.jpg'
import EN1059LightningDragon from '../images/cards/nakka/en/EN1059LightningDragon.jpg'
import EN1060MountedBanshee from '../images/cards/nakka/en/EN1060MountedBanshee.jpg'
import EN1061NakkaArcher from '../images/cards/nakka/en/EN1061NakkaArcher.jpg'
import EN1062Banshee from '../images/cards/nakka/en/EN1062Banshee.jpg'
import EN1063GroundStomper from '../images/cards/nakka/en/EN1063GroundStomper.jpg'
import EN1064GroundStomperFullArt from '../images/cards/nakka/en/EN1064GroundStomperFullArt.jpg'
import EN1065DeathWhisperer from '../images/cards/nakka/en/EN1065DeathWhisperer.jpg'
import EN1066DeathWhispererFullArt from '../images/cards/nakka/en/EN1066DeathWhispererFullArt.jpg'
import EN1067NemesioNakka from '../images/cards/nakka/en/EN1067NemesioFullArt.jpg'
import EN1068OneEyedHog from '../images/cards/nakka/en/EN1068OneEyedHog.jpg'
import EN1069OneEyedHogFullArt from '../images/cards/nakka/en/EN1069OneEyedHogFullArt.jpg'
import EN1070Protector from '../images/cards/nakka/en/EN1070Protector.jpg'
import EN1071ProtectorFullArt from '../images/cards/nakka/en/EN1071ProtectorFullArt.jpg'
import EN1072ReptilianBeast from '../images/cards/nakka/en/EN1072ReptilianBeast.jpg'
import EN1073SenileYhdorian from '../images/cards/nakka/en/EN1073SenileYhdorian.jpg'
import EN1074UnstableHydra from '../images/cards/nakka/en/EN1074UnstableHydraHolo.jpg'
import EN1075Walker from '../images/cards/nakka/en/EN1075Walker.jpg'
import EN1076WrathOfTheForest from '../images/cards/nakka/en/EN1076WrathOfTheForest.jpg'
import EN1077Xenodon from '../images/cards/nakka/en/EN1077Xenodon.jpg'
import EN1078XenodonAltArt from '../images/cards/nakka/en/EN1078XenodonIllustrationAlt.jpg'
import EN1079EternalRoots from '../images/cards/nakka/en/EN1079EternalRootsFullArt.jpg'
import EN1080RuinsOfSylv from '../images/cards/nakka/en/EN1080RuinsOfSylv.jpg'
import EN1081TreeOfLife from '../images/cards/nakka/en/EN1081TreeOfLife.jpg'
import EN1082TreeOfLifeFullArtHolo from '../images/cards/nakka/en/EN1082TreeOfLifeFullArtHolo.jpg'
import EN1083TreeOfLifeFullArt from '../images/cards/nakka/en/EN1083TreeOfLifeFullArt.jpg'
import EN1084Earthquake from '../images/cards/nakka/en/EN1084Earthquake.jpg'
import EN1085ForestBlast from '../images/cards/nakka/en/EN1085ForestBlast.jpg'
import EN1086LostInTheForest from '../images/cards/nakka/en/EN1086LostInTheForest.jpg'
import EN1087Mimicry from '../images/cards/nakka/en/EN1087Mimicry.jpg'
import EN1088MusicalTrance from '../images/cards/nakka/en/EN1088MusicalTranceFullArt.jpg'
import EN1089NaturalCamouflage from '../images/cards/nakka/en/EN1089NaturalCamouflage.jpg'
import EN1090UnstableGrowth from '../images/cards/nakka/en/EN1090UnstableGrowth.jpg'
import EN1091WarpPath from '../images/cards/nakka/en/EN1091WarpPath.jpg'
import NakkaCardBack from '../images/cards/nakka/NakkaCardBack.jpg'
import EN1001AdrielleFullArt from '../images/cards/whitelands/en/EN1001AdrielleFullArt.jpg'
import EN1002Dreki from '../images/cards/whitelands/en/EN1002Dreki.jpg'
import EN1003Eagle from '../images/cards/whitelands/en/EN1003Eagle.jpg'
import EN1004FrostMaiden from '../images/cards/whitelands/en/EN1004FrostMaiden.jpg'
import EN1005Gabriel from '../images/cards/whitelands/en/EN1005Gabriel.jpg'
import EN1006GabrielFullArtHolo from '../images/cards/whitelands/en/EN1006GabrielFullArtHolo.jpg'
import EN1007GabrielFullArt from '../images/cards/whitelands/en/EN1007GabrielFullArt.jpg'
import EN1008IceElemental from '../images/cards/whitelands/en/EN1008IceElemental.jpg'
import EN1009NoviceFairy from '../images/cards/whitelands/en/EN1009NoviceFairy.jpg'
import EN1010NoviceFairyFullArt from '../images/cards/whitelands/en/EN1010NoviceFairyFullArt.jpg'
import EN1011IceGolem from '../images/cards/whitelands/en/EN1011IceGolem.jpg'
import EN1012IceGolemFullArt from '../images/cards/whitelands/en/EN1012IceGolemFullArt.jpg'
import EN1013IceMoleg from '../images/cards/whitelands/en/EN1013IceMoleg.jpg'
import EN1014IceMolegFullArt from '../images/cards/whitelands/en/EN1014IceMolegFullArt.jpg'
import EN1015IcePaladin from '../images/cards/whitelands/en/EN1015IcePaladin.jpg'
import EN1016IcePaladinFullArt from '../images/cards/whitelands/en/EN1016IcePaladinFullArt.jpg'
import EN1017IceProtector from '../images/cards/whitelands/en/EN1017IceProtector.jpg'
import EN1018IceWolf from '../images/cards/whitelands/en/EN1018IceWolf.jpg'
import EN1019LunarWendigo from '../images/cards/whitelands/en/EN1019LunarWendigo.jpg'
import EN1020NemesioFullArt from '../images/cards/whitelands/en/EN1020NemesioFullArt.jpg'
import EN1021NihilistMorgon from '../images/cards/whitelands/en/EN1021NihilistMorgon.jpg'
import EN1022NihilistPenguin from '../images/cards/whitelands/en/EN1022NihilistPenguin.jpg'
import EN1023NihilistPenguinFullArt from '../images/cards/whitelands/en/EN1023NihilistPenguinFullArt.jpg'
import EN1024PaladinOfTheGuard from '../images/cards/whitelands/en/EN1024PaladinOfTheGuard.jpg'
import EN1025PaladinOfTheGuardFullArt from '../images/cards/whitelands/en/EN1025PaladinOfTheGuardFullArt.jpg'
import EN1026QueensJester from '../images/cards/whitelands/en/EN1026QueensJester.jpg'
import EN1027ShieldOfDawn from '../images/cards/whitelands/en/EN1027ShieldOfDawn.jpg'
import EN1028ShieldOfDawnFullArt from '../images/cards/whitelands/en/EN1028ShieldOfDawnFullArt.jpg'
import EN1029SnowGriffin from '../images/cards/whitelands/en/EN1029SnowGriffin.jpg'
import EN1030VindictiveBear from '../images/cards/whitelands/en/EN1030VindictiveBear.jpg'
import EN1031Yeti from '../images/cards/whitelands/en/EN1031Yeti.jpg'
import EN1032AncestralLibrary from '../images/cards/whitelands/en/EN1032AncestralLibrary.jpg'
import EN1033FortressOfMyjir from '../images/cards/whitelands/en/EN1033FortressOfMyjir.jpg'
import EN1034FortressOfMyjirFullArtHolo from '../images/cards/whitelands/en/EN1034FortressOfMyjirFullArtHolo.jpg'
import EN1035FortressOfMyjirFullArt from '../images/cards/whitelands/en/EN1035FortressOfMyjirFullArt.jpg'
import EN1036TheWhiteGatesFullArt from '../images/cards/whitelands/en/EN1036TheWhiteGatesFullArt.jpg'
import EN1037ArmorOfDawnHolo from '../images/cards/whitelands/en/EN1037ArmorOfDawnHolo.jpg'
import EN1038Blizzard from '../images/cards/whitelands/en/EN1038Blizzard.jpg'
import EN1039CoriolisWind from '../images/cards/whitelands/en/EN1039CoriolisWind.jpg'
import EN1040EsotericWinter from '../images/cards/whitelands/en/EN1040EsotericWinter.jpg'
import EN1041FairyMadness from '../images/cards/whitelands/en/EN1041FairyMadness.jpg'
import EN1042FrozenLightning from '../images/cards/whitelands/en/EN1042FrozenLightning.jpg'
import EN1043IceMeteor from '../images/cards/whitelands/en/EN1043IceMeteor.jpg'
import EN1044IceWings from '../images/cards/whitelands/en/EN1044IceWings.jpg'
import EN1045SecretIncantation from '../images/cards/whitelands/en/EN1045SecretIncantation.jpg'
import EN1046Teleportation from '../images/cards/whitelands/en/EN1046Teleportation.jpg'
import EN1047WinterProtects from '../images/cards/whitelands/en/EN1047WinterProtects.jpg'
import WhitelandsCardBack from '../images/cards/whitelands/WhitelandsCardBack.jpg'
import { CombatIcon } from '../locators/CombatIconLocator'
import { CombatResult } from '../locators/CombatResultIconLocator'

import { FactionCardHelp } from './FactionCardHelp'

export class FactionCardDescription extends CardDescription {
  images = {
    [FactionCard.Adrielle]: EN1001AdrielleFullArt,
    [FactionCard.Dreki]: EN1002Dreki,
    [FactionCard.Eagle]: EN1003Eagle,
    [FactionCard.FrostMaiden]: EN1004FrostMaiden,
    [FactionCard.Gabriel]: EN1005Gabriel,
    [FactionCard.GabrielFullArtHolo]: EN1006GabrielFullArtHolo,
    [FactionCard.GabrielFullArt]: EN1007GabrielFullArt,
    [FactionCard.IceElemental]: EN1008IceElemental,
    [FactionCard.NoviceFairy]: EN1009NoviceFairy,
    [FactionCard.NoviceFairyFullArt]: EN1010NoviceFairyFullArt,
    [FactionCard.IceGolem]: EN1011IceGolem,
    [FactionCard.IceGolemFullArt]: EN1012IceGolemFullArt,
    [FactionCard.IceMoleg]: EN1013IceMoleg,
    [FactionCard.IceMolegFullArt]: EN1014IceMolegFullArt,
    [FactionCard.IcePaladin]: EN1015IcePaladin,
    [FactionCard.IcePaladinFullArt]: EN1016IcePaladinFullArt,
    [FactionCard.IceProtector]: EN1017IceProtector,
    [FactionCard.IceWolf]: EN1018IceWolf,
    [FactionCard.LunarWendigo]: EN1019LunarWendigo,
    [FactionCard.NemesioWhitelands]: EN1020NemesioFullArt,
    [FactionCard.NihilistMorgon]: EN1021NihilistMorgon,
    [FactionCard.NihilistPenguin]: EN1022NihilistPenguin,
    [FactionCard.NihilistPenguinFullArt]: EN1023NihilistPenguinFullArt,
    [FactionCard.PaladinOfTheGuard]: EN1024PaladinOfTheGuard,
    [FactionCard.PaladinOfTheGuardFullArt]: EN1025PaladinOfTheGuardFullArt,
    [FactionCard.QueensJester]: EN1026QueensJester,
    [FactionCard.ShieldOfDawn]: EN1027ShieldOfDawn,
    [FactionCard.ShieldOfDawnFullArt]: EN1028ShieldOfDawnFullArt,
    [FactionCard.SnowGriffin]: EN1029SnowGriffin,
    [FactionCard.VindictiveBear]: EN1030VindictiveBear,
    [FactionCard.Yeti]: EN1031Yeti,
    [FactionCard.AncestralLibrary]: EN1032AncestralLibrary,
    [FactionCard.FortressOfMyjir]: EN1033FortressOfMyjir,
    [FactionCard.FortressOfMyjirFullArtHolo]: EN1034FortressOfMyjirFullArtHolo,
    [FactionCard.FortressOfMyjirFullArt]: EN1035FortressOfMyjirFullArt,
    [FactionCard.TheWhiteGates]: EN1036TheWhiteGatesFullArt,
    [FactionCard.ArmorOfDawn]: EN1037ArmorOfDawnHolo,
    [FactionCard.Blizzard]: EN1038Blizzard,
    [FactionCard.CoriolisWind]: EN1039CoriolisWind,
    [FactionCard.EsotericWinter]: EN1040EsotericWinter,
    [FactionCard.FairyMadness]: EN1041FairyMadness,
    [FactionCard.FrozenLightning]: EN1042FrozenLightning,
    [FactionCard.IceMeteor]: EN1043IceMeteor,
    [FactionCard.IceWings]: EN1044IceWings,
    [FactionCard.SecretIncantation]: EN1045SecretIncantation,
    [FactionCard.Teleportation]: EN1046Teleportation,
    [FactionCard.WinterProtects]: EN1047WinterProtects,

    [FactionCard.Behemoth]: EN1048Behemoth,
    [FactionCard.BehemothFullArt]: EN1049BehemothFullArt,
    [FactionCard.CarnivorousPlant]: EN1050CarnivorousPlant,
    [FactionCard.CrawlingRoots]: EN1051CrawlingRoots,
    [FactionCard.DeathCrawler]: EN1052DeathCrawler,
    [FactionCard.Hexacarias]: EN1056Hexacarias,
    [FactionCard.LightningBird]: EN1057LightningBird,
    [FactionCard.LightningBirdFullArt]: EN1058LightningBirdFullArt,
    [FactionCard.LightningDragon]: EN1059LightningDragon,
    [FactionCard.MountedBanshee]: EN1060MountedBanshee,
    [FactionCard.NakkaArcher]: EN1061NakkaArcher,
    [FactionCard.Banshee]: EN1062Banshee,
    [FactionCard.GroundStomper]: EN1063GroundStomper,
    [FactionCard.GroundStomperFullArt]: EN1064GroundStomperFullArt,
    [FactionCard.DeathWhisperer]: EN1065DeathWhisperer,
    [FactionCard.DeathWhispererFullArt]: EN1066DeathWhispererFullArt,
    [FactionCard.NemesioNakka]: EN1067NemesioNakka,
    [FactionCard.OneEyedHog]: EN1068OneEyedHog,
    [FactionCard.OneEyedHogFullArt]: EN1069OneEyedHogFullArt,
    [FactionCard.Protector]: EN1070Protector,
    [FactionCard.ProtectorFullArt]: EN1071ProtectorFullArt,
    [FactionCard.ReptilianBeast]: EN1072ReptilianBeast,
    [FactionCard.SenileYhdorian]: EN1073SenileYhdorian,
    [FactionCard.UnstableHydra]: EN1074UnstableHydra,
    [FactionCard.Walker]: EN1075Walker,
    [FactionCard.WrathOfTheForest]: EN1076WrathOfTheForest,
    [FactionCard.Xenodon]: EN1077Xenodon,
    [FactionCard.XenodonAltArt]: EN1078XenodonAltArt,
    [FactionCard.EternalRoots]: EN1079EternalRoots,
    [FactionCard.RuinsOfSylv]: EN1080RuinsOfSylv,
    [FactionCard.TreeOfLife]: EN1081TreeOfLife,
    [FactionCard.TreeOfLifeFullArtHolo]: EN1082TreeOfLifeFullArtHolo,
    [FactionCard.TreeOfLifeFullArt]: EN1083TreeOfLifeFullArt,
    [FactionCard.Earthquake]: EN1084Earthquake,
    [FactionCard.ForestBlast]: EN1085ForestBlast,
    [FactionCard.LostInTheForest]: EN1086LostInTheForest,
    [FactionCard.Mimicry]: EN1087Mimicry,
    [FactionCard.MusicalTrance]: EN1088MusicalTrance,
    [FactionCard.NaturalCamouflage]: EN1089NaturalCamouflage,
    [FactionCard.UnstableGrowth]: EN1090UnstableGrowth,
    [FactionCard.WarpPath]: EN1091WarpPath,

    [FactionCard.AngryPeasant]: EN1092AngryPeasant,
    [FactionCard.Archer]: EN1093Archer,
    [FactionCard.Armorer]: EN1094Armorer,
    [FactionCard.Assassin]: EN1095Assassin,
    [FactionCard.Ballista]: EN1096Ballista,
    [FactionCard.BallistaFullArt]: EN1097BallistaFullArt,
    [FactionCard.Catanolith]: EN1098Catanolith,
    [FactionCard.Catapult]: EN1099Catapult,
    [FactionCard.Champion]: EN1100Champion,
    [FactionCard.DragonSlayer]: EN1101DragonSlayer,
    [FactionCard.DrunkKnight]: EN1102DrunkKnight,
    [FactionCard.DrunkKnightFullArt]: EN1103DrunkKnightFullArt,
    [FactionCard.Fanatic]: EN1104Fanatic,
    [FactionCard.GreyHorseman]: EN1105GreyHorseman,
    [FactionCard.GreyHorsemanFullArt]: EN1106GreyHorsemanFullArt,
    [FactionCard.GreyKnight]: EN1107GreyKnight,
    [FactionCard.GreyMissionary]: EN1108GreyMissionary,
    [FactionCard.GreyPriest]: EN1109GreyPriest,
    [FactionCard.HeroOfTheBattleOfNerz]: EN1110HeroOfTheBattleOfNerz,
    [FactionCard.Infantryman]: EN1111Infantryman,
    [FactionCard.NemesioGreyOrder]: EN1112NemesioGreyOrder,
    [FactionCard.Phalanx]: EN1113Phalanx,
    [FactionCard.PhalanxFullArt]: EN1114PhalanxFullArt,
    [FactionCard.SeniorMercenary]: EN1115SeniorMercenary,
    [FactionCard.SiegeTower]: EN1116SiegeTower,
    [FactionCard.SoberKnight]: EN1117SoberKnight,
    [FactionCard.StandardBearer]: EN1118StandardBearer,
    [FactionCard.TheSeneschal]: EN1119TheSeneschal,
    [FactionCard.TheSeneschalFullArtHolo]: EN1120TheSeneschalFullArtHolo,
    [FactionCard.TheSeneschalFullArt]: EN1121TheSeneschalFullArt,
    [FactionCard.Titan]: EN1122Titan,
    [FactionCard.TitanFullArt]: EN1123TitanFullArt,
    [FactionCard.TomurDisc]: EN1124TomurDiscFullArt,
    [FactionCard.WhitePlainsMercenary]: EN1125WhitePlainsMercenary,
    [FactionCard.WhitePlainsMercenaryFullArt]: EN1126WhitePlainsMercenaryFullArt,
    [FactionCard.AvalonFortress]: EN1127AvalonFortress,
    [FactionCard.AvalonFortressFullArtHolo]: EN1128AvalonFortressFullArtHolo,
    [FactionCard.AvalonFortressFullArt]: EN1129AvalonFortressFullArt,
    [FactionCard.GhostMetalMonolith]: EN1130GhostMetalMonolith,
    [FactionCard.MastersOfAracKhan]: EN1131MastersOfAracKhan,
    [FactionCard.ArmouredConvoy]: EN1132ArmouredConvoy,
    [FactionCard.Backup]: EN1133Backup,
    [FactionCard.HorseOfAvalon]: EN1134HorseOfAvalon,
    [FactionCard.HorseOfAvalonFullArtHolo]: EN1135HorseOfAvalonFullArtHolo,
    [FactionCard.HorseOfAvalonFullArt]: EN1136HorseOfAvalonFullArt,
    [FactionCard.MarchingOrder]: EN1137MarchingOrder,
    [FactionCard.OnLeave]: EN1138OnLeave,
    [FactionCard.ShieldWall]: EN1139ShieldWall,
    [FactionCard.TheGreyOrderRises]: EN1140TheGreyOrderRises,
    [FactionCard.Truce]: EN1141Truce,
    [FactionCard.Warcry]: EN1142Warcry,
    [FactionCard.YhdilBlast]: EN1143YhdilBlast,

    [FactionCard.ShieldWall]: EN1139ShieldWall,
    [FactionCard.HorseOfAvalon]: EN1134HorseOfAvalon,
    [FactionCard.ScuttleJaw]: EN1171ScuttleJaw,
    [FactionCard.SwampOgre]: EN1175SwampOgre,
    [FactionCard.SwampTroll]: EN1176SwampTroll,
    [FactionCard.Berserker]: EN1146Berserker,
    [FactionCard.PlagueCollector]: EN1165PlagueCollector,
    [FactionCard.Slayer]: EN1172Slayer,
    [FactionCard.ForgePatriarch]: EN1156ForgePatriarch,
    [FactionCard.AbominableHydra]: EN1144AbominableHydra,
    [FactionCard.ChildEater]: EN1147ChildEater,
    [FactionCard.WesternForge]: EN1179WesternForge,
    [FactionCard.FireLightning]: EN1184FireLightning,
    [FactionCard.Firestorm]: EN1185Firestorm,
    [FactionCard.TheFear]: EN1191TheFear,
    [FactionCard.ForcedExile]: EN1186ForcedExile
  }
  backImages = {
    [Faction.Whitelands]: WhitelandsCardBack,
    [Faction.Nakka]: NakkaCardBack,
    [Faction.GreyOrder]: GreyOrderCardBack,
    [Faction.Blight]: BlightCardBack
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
    for (const turnEffect of cardRule.turnEffects) {
      if (turnEffect.type === EffectType.Mimic) {
        locations.unshift({ type: LocationType.CardTurnEffect, parent: index, id: turnEffect })
      }
    }
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

  highlight() {
    return isDeckbuilding ? false : undefined
  }
}

export const factionCardDescription = new FactionCardDescription()

export const cardWidth = factionCardDescription.width
export const cardHeight = factionCardDescription.width / factionCardDescription.ratio

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
