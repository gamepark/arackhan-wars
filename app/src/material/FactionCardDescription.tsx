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
import EN1096Ballista from '../images/cards/greyorder/en/EN1096Ballista.jpg'
import EN1100Champion from '../images/cards/greyorder/en/EN1100Champion.jpg'
import EN1102DrunkKnight from '../images/cards/greyorder/en/EN1102DrunkKnight.jpg'
import EN1105GreyHorseman from '../images/cards/greyorder/en/EN1105GreyHorseman.jpg'
import EN1110HeroOfTheBattleOfNerz from '../images/cards/greyorder/en/EN1110HeroOfTheBattleOfNerz.jpg'
import EN1111Infantryman from '../images/cards/greyorder/en/EN1111Infantryman.jpg'
import EN1113Phalanx from '../images/cards/greyorder/en/EN1113Phalanx.jpg'
import EN1116SiegeTower from '../images/cards/greyorder/en/EN1116SiegeTower.jpg'
import EN1119TheSeneschal from '../images/cards/greyorder/en/EN1119TheSeneschal.jpg'
import EN1127AvalonFortress from '../images/cards/greyorder/en/EN1127AvalonFortress.jpg'
import EN1134HorseOfAvalon from '../images/cards/greyorder/en/EN1134HorseOfAvalon.jpg'
import EN1139ShieldWall from '../images/cards/greyorder/en/EN1139ShieldWall.jpg'
import EN1142Warcry from '../images/cards/greyorder/en/EN1142Warcry.jpg'
import GreyOrderCardBack from '../images/cards/greyorder/GreyOrderCardBack.jpg'
import EN1048Behemoth from '../images/cards/nakka/en/EN1048Behemoth.jpg'
import EN1050CarnivorousPlant from '../images/cards/nakka/en/EN1050CarnivorousPlant.jpg'
import EN1052DeathCrawler from '../images/cards/nakka/en/EN1052DeathCrawler.jpg'
import EN1056Hexacarias from '../images/cards/nakka/en/EN1056Hexacarias.jpg'
import EN1060MountedBanshee from '../images/cards/nakka/en/EN1060MountedBanshee.jpg'
import EN1061NakkaArcher from '../images/cards/nakka/en/EN1061NakkaArcher.jpg'
import EN1062Banshee from '../images/cards/nakka/en/EN1062Banshee.jpg'
import EN1073SenileYhdorian from '../images/cards/nakka/en/EN1073SenileYhdorian.jpg'
import EN1076WrathOfTheForest from '../images/cards/nakka/en/EN1076WrathOfTheForest.jpg'
import EN1077Xenodon from '../images/cards/nakka/en/EN1077Xenodon.jpg'
import EN1081TreeOfLife from '../images/cards/nakka/en/EN1081TreeOfLife.jpg'
import EN1084Earthquake from '../images/cards/nakka/en/EN1084Earthquake.jpg'
import EN1087Mimicry from '../images/cards/nakka/en/EN1087Mimicry.jpg'
import EN1089NaturalCamouflage from '../images/cards/nakka/en/EN1089NaturalCamouflage.jpg'
import EN1090UnstableGrowth from '../images/cards/nakka/en/EN1090UnstableGrowth.jpg'
import NakkaCardBack from '../images/cards/nakka/NakkaCardBack.jpg'
import EN1003Eagle from '../images/cards/whitelands/en/EN1003Eagle.jpg'
import EN1005Gabriel from '../images/cards/whitelands/en/EN1005Gabriel.jpg'
import EN1011IceGolem from '../images/cards/whitelands/en/EN1011IceGolem.jpg'
import EN1015IcePaladin from '../images/cards/whitelands/en/EN1015IcePaladin.jpg'
import EN1019LunarWendigo from '../images/cards/whitelands/en/EN1019LunarWendigo.jpg'
import EN1022NihilistPenguin from '../images/cards/whitelands/en/EN1022NihilistPenguin.jpg'
import EN1024PaladinOfTheGuard from '../images/cards/whitelands/en/EN1024PaladinOfTheGuard.jpg'
import EN1027ShieldOfDawn from '../images/cards/whitelands/en/EN1027ShieldOfDawn.jpg'
import EN1029SnowGriffin from '../images/cards/whitelands/en/EN1029SnowGriffin.jpg'
import EN1033FortressOfMyjir from '../images/cards/whitelands/en/EN1033FortressOfMyjir.jpg'
import EN1038Blizzard from '../images/cards/whitelands/en/EN1038Blizzard.jpg'
import EN1043IceMeteor from '../images/cards/whitelands/en/EN1043IceMeteor.jpg'
import EN1046Teleportation from '../images/cards/whitelands/en/EN1046Teleportation.jpg'
import EN1047WinterProtects from '../images/cards/whitelands/en/EN1047WinterProtects.jpg'
import WhitelandsCardBack from '../images/cards/whitelands/WhitelandsCardBack.jpg'
import { CombatIcon } from '../locators/CombatIconLocator'
import { CombatResult } from '../locators/CombatResultIconLocator'

import { FactionCardHelp } from './FactionCardHelp'

export class FactionCardDescription extends CardDescription {
  images = {
    [FactionCard.NihilistPenguin]: EN1022NihilistPenguin,
    [FactionCard.LunarWendigo]: EN1019LunarWendigo,
    [FactionCard.ShieldOfDawn]: EN1027ShieldOfDawn,
    [FactionCard.IcePaladin]: EN1015IcePaladin,
    [FactionCard.Eagle]: EN1003Eagle,
    [FactionCard.PaladinOfTheGuard]: EN1024PaladinOfTheGuard,
    [FactionCard.SnowGriffin]: EN1029SnowGriffin,
    [FactionCard.Gabriel]: EN1005Gabriel,
    [FactionCard.IceGolem]: EN1011IceGolem,
    [FactionCard.FortressOfMyjir]: EN1033FortressOfMyjir,
    [FactionCard.IceMeteor]: EN1043IceMeteor,
    [FactionCard.WinterProtects]: EN1047WinterProtects,
    [FactionCard.Teleportation]: EN1046Teleportation,
    [FactionCard.Blizzard]: EN1038Blizzard,
    [FactionCard.DeathCrawler]: EN1052DeathCrawler,
    [FactionCard.Xenodon]: EN1077Xenodon,
    [FactionCard.NakkaArcher]: EN1061NakkaArcher,
    [FactionCard.SenileYhdorian]: EN1073SenileYhdorian,
    [FactionCard.Hexacarias]: EN1056Hexacarias,
    [FactionCard.CarnivorousPlant]: EN1050CarnivorousPlant,
    [FactionCard.Banshee]: EN1062Banshee,
    [FactionCard.Behemoth]: EN1048Behemoth,
    [FactionCard.MountedBanshee]: EN1060MountedBanshee,
    [FactionCard.WrathOfTheForest]: EN1076WrathOfTheForest,
    [FactionCard.TreeOfLife]: EN1081TreeOfLife,
    [FactionCard.Earthquake]: EN1084Earthquake,
    [FactionCard.UnstableGrowth]: EN1090UnstableGrowth,
    [FactionCard.NaturalCamouflage]: EN1089NaturalCamouflage,
    [FactionCard.Mimicry]: EN1087Mimicry,
    [FactionCard.DrunkKnight]: EN1102DrunkKnight,
    [FactionCard.Infantryman]: EN1111Infantryman,
    [FactionCard.Phalanx]: EN1113Phalanx,
    [FactionCard.Ballista]: EN1096Ballista,
    [FactionCard.Champion]: EN1100Champion,
    [FactionCard.GreyHorseman]: EN1105GreyHorseman,
    [FactionCard.SiegeTower]: EN1116SiegeTower,
    [FactionCard.HeroOfTheBattleOfNerz]: EN1110HeroOfTheBattleOfNerz,
    [FactionCard.TheSeneschal]: EN1119TheSeneschal,
    [FactionCard.AvalonFortress]: EN1127AvalonFortress,
    [FactionCard.Warcry]: EN1142Warcry,
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
