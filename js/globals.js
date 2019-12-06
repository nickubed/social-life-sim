// Constants
const COORD_DELAY = []
const EMOJI = []
const GAME_HEIGHT = 623
const GAME_WIDTH = 350
const LEVEL_INCREMENT = 50
// const SPAWN_COORD = [0, 70]
const SPAWN_COORD = [0, 70, 140, 210, 280]
const STARTING_LIFE = 5
const SWITCH_EMOJI_DELAY = 0.2
const USER_SPEED = 220

//Globals
let currentEmoji = 0
let delay = 0
let level = 14
let music
let nextTargetWave = 0, nextEmojiSwitch = 0;
let scoreText = 700
let lifeText
let targets
let user