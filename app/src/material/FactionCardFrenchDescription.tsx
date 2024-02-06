/** @jsxImportSource @emotion/react */
import FR1022PingouinNihiliste from '../images/cards/whitelands/fr/FR1022PingouinNihiliste.jpg'
import FR1019WendigoLunaire from '../images/cards/whitelands/fr/FR1019WendigoLunaire.jpg'
import FR1027BouclierDuCrepuscule from '../images/cards/whitelands/fr/FR1027BouclierDuCrepuscule.jpg'
import FR1015PaladinDeGlace from '../images/cards/whitelands/fr/FR1015PaladinDeGlace.jpg'
import FR1003Aigle from '../images/cards/whitelands/fr/FR1003Aigle.jpg'
import FR1024PaladinDeLaGarde from '../images/cards/whitelands/fr/FR1024PaladinDeLaGarde.jpg'
import FR1029GriffonDesNeiges from '../images/cards/whitelands/fr/FR1029GriffonDesNeiges.jpg'
import FR1005Gabriel from '../images/cards/whitelands/fr/FR1005Gabriel.jpg'
import FR1011GolemDeGlace from '../images/cards/whitelands/fr/FR1011GolemDeGlace.jpg'
import FR1033ForteresseDeMyjir from '../images/cards/whitelands/fr/FR1033ForteresseDeMyjir.jpg'
import FR1043MeteoreDeGlace from '../images/cards/whitelands/fr/FR1043MeteoreDeGlace.jpg'
import FR1047ProtectionHivernale from '../images/cards/whitelands/fr/FR1047ProtectionHivernale.jpg'
import FR1046Teleportation from '../images/cards/whitelands/fr/FR1046Teleportation.jpg'
import FR1038Blizzard from '../images/cards/whitelands/fr/FR1038Blizzard.jpg'
import FR1052PhasmeVenimeux from '../images/cards/nakka/fr/FR1052PhasmeVenimeux.jpg'
import FR1077Xenodon from '../images/cards/nakka/fr/FR1077Xenodon.jpg'
import FR1061ArcherNakka from '../images/cards/nakka/fr/FR1061ArcherNakka.jpg'
import FR1073YhdorienSenile from '../images/cards/nakka/fr/FR1073YhdorienSenile.jpg'
import FR1056Hexacarias from '../images/cards/nakka/fr/FR1056Hexacarias.jpg'
import FR1050PlanteCarnivore from '../images/cards/nakka/fr/FR1050PlanteCarnivore.jpg'
import FR1062Banshee from '../images/cards/nakka/fr/FR1062Banshee.jpg'
import FR1048Behemoth from '../images/cards/nakka/fr/FR1048Behemoth.jpg'
import FR1060BansheeMontee from '../images/cards/nakka/fr/FR1060BansheeMontee.jpg'
import FR1076ColereDeLaForet from '../images/cards/nakka/fr/FR1076ColereDeLaForet.jpg'
import FR1081ArbreDeVie from '../images/cards/nakka/fr/FR1081ArbreDeVie.jpg'
import FR1084TremblementDeTerre from '../images/cards/nakka/fr/FR1084TremblementDeTerre.jpg'
import FR1090PuissanceDevorante from '../images/cards/nakka/fr/FR1090PuissanceDevorante.jpg'
import FR1089CamouflageNaturel from '../images/cards/nakka/fr/FR1089CamouflageNaturel.jpg'
import FR1087Mimetisme from '../images/cards/nakka/fr/FR1087Mimetisme.jpg'
import FR1102SoldatIvre from '../images/cards/greyorder/fr/FR1102SoldatIvre.jpg'
import FR1111Fantassin from '../images/cards/greyorder/fr/FR1111Fantassin.jpg'
import FR1113Phalange from '../images/cards/greyorder/fr/FR1113Phalange.jpg'
import FR1096Baliste from '../images/cards/greyorder/fr/FR1096Baliste.jpg'
import FR1100Champion from '../images/cards/greyorder/fr/FR1100Champion.jpg'
import FR1105CavalierGris from '../images/cards/greyorder/fr/FR1105CavalierGris.jpg'
import FR1116TourelleDAttaque from '../images/cards/greyorder/fr/FR1116TourelleDAttaque.jpg'
import FR1110HerosDeLaBatailleDeNerz from '../images/cards/greyorder/fr/FR1110HerosDeLaBatailleDeNerz.jpg'
import FR1119LeSenechal from '../images/cards/greyorder/fr/FR1119LeSenechal.jpg'
import FR1127FortAvalon from '../images/cards/greyorder/fr/FR1127FortAvalon.jpg'
import FR1142ForceEtHonneur from '../images/cards/greyorder/fr/FR1142ForceEtHonneur.jpg'
import FR1139LeveeDeBoucliers from '../images/cards/greyorder/fr/FR1139LeveeDeBoucliers.jpg'
import FR1134ChevalDAvalon from '../images/cards/greyorder/fr/FR1134ChevalDAvalon.jpg'
import FR1171BlatteMalsaine from '../images/cards/blight/fr/FR1171BlatteMalsaine.jpg'
import FR1175OgreDuMarais from '../images/cards/blight/fr/FR1175OgreDuMarais.jpg'
import FR1176TrollDesMarais from '../images/cards/blight/fr/FR1176TrollDesMarais.jpg'
import FR1146Berserker from '../images/cards/blight/fr/FR1146Berserker.jpg'
import FR1165CollecteurDePeste from '../images/cards/blight/fr/FR1165CollecteurDePeste.jpg'
import FR1172Pourfendeur from '../images/cards/blight/fr/FR1172Pourfendeur.jpg'
import FR1156PatriarcheDeLaForge from '../images/cards/blight/fr/FR1156PatriarcheDeLaForge.jpg'
import FR1144HydreAbominable from '../images/cards/blight/fr/FR1144HydreAbominable.jpg'
import FR1147MangeurDEnfants from '../images/cards/blight/fr/FR1147MangeurDEnfants.jpg'
import FR1179ForgesOccidentales from '../images/cards/blight/fr/FR1179ForgesOccidentales.jpg'
import FR1184FoudreDeFeu from '../images/cards/blight/fr/FR1184FoudreDeFeu.jpg'
import FR1185TempeteDeFeu from '../images/cards/blight/fr/FR1185TempeteDeFeu.jpg'
import FR1191LaPeur from '../images/cards/blight/fr/FR1191LaPeur.jpg'
import FR1186ExilMaudit from '../images/cards/blight/fr/FR1186ExilMaudit.jpg'
import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { FactionCardDescription } from './FactionCardDescription'

export class FactionCardFrenchDescription extends FactionCardDescription {
  images = {
    [FactionCard.NihilistPenguin]: FR1022PingouinNihiliste,
    [FactionCard.LunarWendigo]: FR1019WendigoLunaire,
    [FactionCard.ShieldOfDawn]: FR1027BouclierDuCrepuscule,
    [FactionCard.IcePaladin]: FR1015PaladinDeGlace,
    [FactionCard.Eagle]: FR1003Aigle,
    [FactionCard.PaladinOfTheGuard]: FR1024PaladinDeLaGarde,
    [FactionCard.SnowGriffin]: FR1029GriffonDesNeiges,
    [FactionCard.Gabriel]: FR1005Gabriel,
    [FactionCard.IceGolem]: FR1011GolemDeGlace,
    [FactionCard.FortressOfMyjir]: FR1033ForteresseDeMyjir,
    [FactionCard.IceMeteor]: FR1043MeteoreDeGlace,
    [FactionCard.WinterProtects]: FR1047ProtectionHivernale,
    [FactionCard.Teleportation]: FR1046Teleportation,
    [FactionCard.Blizzard]: FR1038Blizzard,
    [FactionCard.DeathCrawler]: FR1052PhasmeVenimeux,
    [FactionCard.Xenodon]: FR1077Xenodon,
    [FactionCard.NakkaArcher]: FR1061ArcherNakka,
    [FactionCard.SenileYhdorian]: FR1073YhdorienSenile,
    [FactionCard.Hexacarias]: FR1056Hexacarias,
    [FactionCard.CarnivorousPlant]: FR1050PlanteCarnivore,
    [FactionCard.Banshee]: FR1062Banshee,
    [FactionCard.Behemoth]: FR1048Behemoth,
    [FactionCard.MountedBanshee]: FR1060BansheeMontee,
    [FactionCard.WrathOfTheForest]: FR1076ColereDeLaForet,
    [FactionCard.TreeOfLife]: FR1081ArbreDeVie,
    [FactionCard.Earthquake]: FR1084TremblementDeTerre,
    [FactionCard.UnstableGrowth]: FR1090PuissanceDevorante,
    [FactionCard.NaturalCamouflage]: FR1089CamouflageNaturel,
    [FactionCard.Mimicry]: FR1087Mimetisme,
    [FactionCard.DrunkKnight]: FR1102SoldatIvre,
    [FactionCard.Infantryman]: FR1111Fantassin,
    [FactionCard.Phalanx]: FR1113Phalange,
    [FactionCard.Ballista]: FR1096Baliste,
    [FactionCard.Champion]: FR1100Champion,
    [FactionCard.GreyHorseman]: FR1105CavalierGris,
    [FactionCard.SiegeTower]: FR1116TourelleDAttaque,
    [FactionCard.HeroOfTheBattleOfNerz]: FR1110HerosDeLaBatailleDeNerz,
    [FactionCard.TheSeneschal]: FR1119LeSenechal,
    [FactionCard.AvalonFortress]: FR1127FortAvalon,
    [FactionCard.Warcry]: FR1142ForceEtHonneur,
    [FactionCard.ShieldWall]: FR1139LeveeDeBoucliers,
    [FactionCard.HorseOfAvalon]: FR1134ChevalDAvalon,
    [FactionCard.ScuttleJaw]: FR1171BlatteMalsaine,
    [FactionCard.SwampOgre]: FR1175OgreDuMarais,
    [FactionCard.SwampTroll]: FR1176TrollDesMarais,
    [FactionCard.Berserker]: FR1146Berserker,
    [FactionCard.PlagueCollector]: FR1165CollecteurDePeste,
    [FactionCard.Slayer]: FR1172Pourfendeur,
    [FactionCard.ForgePatriarch]: FR1156PatriarcheDeLaForge,
    [FactionCard.AbominableHydra]: FR1144HydreAbominable,
    [FactionCard.ChildEater]: FR1147MangeurDEnfants,
    [FactionCard.WesternForge]: FR1179ForgesOccidentales,
    [FactionCard.FireLightning]: FR1184FoudreDeFeu,
    [FactionCard.Firestorm]: FR1185TempeteDeFeu,
    [FactionCard.TheFear]: FR1191LaPeur,
    [FactionCard.ForcedExile]: FR1186ExilMaudit
  }
}

export const factionCardFrenchDescription = new FactionCardFrenchDescription()
