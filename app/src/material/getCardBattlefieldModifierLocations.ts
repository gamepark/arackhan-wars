import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Attack } from '@gamepark/arackhan-wars/rules/AttackRule'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { Location, MaterialGame } from '@gamepark/rules-api'
import { differenceBy } from 'es-toolkit'
import { CombatIcon } from '../locators/CombatIconLocator'

export function getCardBattlefieldModifierLocations(game: MaterialGame, index: number) {
  const locations: Location[] = []
  const cardRule = getCardRule(game, index)
  const attackCharacteristic = cardRule.attackCharacteristic
  const attacks = new ArackhanWarsRules(game).remind<Attack[]>(Memory.Attacks) ?? []
  const cardAttack = attacks.find(attack => attack.card === index && attack.targets.length === 1)
  const attack = cardAttack ? cardRule.getAttack(cardAttack.targets[0]) : cardRule.attack
  if (attackCharacteristic !== attack) {
    locations.push({ type: LocationType.CombatIcon, id: CombatIcon.Attack, parent: index, x: attack, y: attack - attackCharacteristic })
  }
  const defenseCharacteristic = cardRule.defenseCharacteristic
  const attackers = attacks.filter(attack => attack.targets.includes(index)).map(attack => attack.card)
  const defense = cardRule.getDefense(attackers)
  if (defenseCharacteristic !== defense) {
    locations.push({ type: LocationType.CombatIcon, id: CombatIcon.Defense, parent: index, x: defense, y: defense - defenseCharacteristic })
  }
  const characteristics = cardRule.characteristics
  const nativeAttributes = characteristics?.getAttributes() ?? []
  const attributes = cardRule.attributes
  const cancelledAttributes = differenceBy(nativeAttributes, attributes, attribute => attribute.type)
  let attributeIconPosition = 0
  for (const attribute of cancelledAttributes) {
    locations.push({ type: LocationType.AttributesIcons, id: { ...attribute, cancel: true }, parent: index, x: attributeIconPosition++ })
  }
  const gainedAttributes = differenceBy(attributes, nativeAttributes, attribute => attribute.type)
  for (const attribute of gainedAttributes) {
    locations.push({ type: LocationType.AttributesIcons, id: attribute, parent: index, x: attributeIconPosition++ })
  }
  if (cardRule.loseSkills(cardRule.initialSkills)) {
    locations.push({ type: LocationType.SkillLostIcon, parent: index })
  }
  return locations
}
