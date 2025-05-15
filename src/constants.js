export const JOGOS = [
  { id: 1, nome: 'Dragon Age: Origins' },
  { id: 2, nome: 'Dragon Age II' },
  { id: 3, nome: 'Dragon Age: Inquisition' }
];

export const ATTRIBUTES = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  willpower: 'Willpower',
  magic: 'Magic',
  cunning: 'Cunning',
  constitution: 'Constitution'
};

export const CLASSES = {
  1: ['Warrior', 'Rogue', 'Mage'],
  2: ['Warrior', 'Rogue', 'Mage'],
  3: ['Warrior', 'Rogue', 'Mage']
};

export const SPECIALIZATIONS = {
  1: {
    Warrior: ['Berserker', 'Champion',  'Templar', 'Reaver'],
    Rogue: ['Assassin', 'Bard', 'Duelist', 'Ranger'],
    Mage: ['Arcane Warrior', 'Blood Mage', 'Shapeshifter', 'Spirit Healer']
  },
  2: {
    Warrior: ['Berserker',  'Templar', 'Reaver'],
    Rogue: ['Assassin', 'Duelist', 'Shadow'],
    Mage: ['Force Mage', 'Blood Mage', 'Spirit Healer']
  },
  3: {
    Warrior: ['Champion',  'Templar', 'Reaver'],
    Rogue: ['Assassin', 'Artificer', 'Tempest'],
    Mage: ['Knight-Enchanter', 'Necromancer', 'Rift Mage']
  }
}

export const SKILLS = {
  1: {
    Warrior: ['Powerful', 'Threaten', 'Bravery', 'Death Blow', 'Precise Striking', 'Taunt', 'Disengage', 'Perfect Striking'],
    Rogue: ['Dirty Fighting', 'Combat Movement', 'Coup de Grace', 'Feign Death', 'Below the Belt', 'Deadly Strike', 'Lethality', 'Evasion', 'Device Mastery', 'Master Stealth'],
    Mage: ['Arcane Bolt', 'Fireball', 'Stonefist', 'Earthquake', 'Petrify', 'Winters Grasp', 'Cone of Cold', 'Chain Lightning', 'Heal', 'Spell Wisp', 'Mind Blast', 'Drain Life']
  },
  2: {
    Warrior: ['Rally',  'Stonewall', 'Mighty Blow', 'Sunder', 'Scythe', 'Control', 'Might', 'Cleave',  'Pommel Strike', 'Shield Bash'],
    Rogue: ['Pinning Shot', 'Lacerate', 'Backstab', 'Miasmic Flask', 'Rush', 'Blindside', 'Speed', 'Evade', 'Stealth'],
    Mage: ['Fireball', 'Cone of Cold', 'Stonefist',  'Petrify', 'Rock Armor', 'Tempest', 'Spirit Bolt', 'Dispel Magic', 'Mind Blast', 'Heal', 'Horror']
  },
  3: {
    Warrior: ['Shield Wall',  'Shield Bash', 'Shield Breaker', 'Grappling Chain', 'War Cry', 'Charging Bull', 'Trust the Steel'],
    Rogue: ['Sneak Attack', 'Leaping Shot', 'Pincushion', 'Poisoned Weapons', 'Stealth', 'Shadow Strike'],
    Mage: ['Barrier', 'Dispel', 'Energy Barrage', 'Immolate', 'Fire Mine', 'Fade Step', 'Blizzard', ]
  }
}