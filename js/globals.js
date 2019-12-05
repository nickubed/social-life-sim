// Constants
const EMOJI = []
const GAME_HEIGHT = 623
const GAME_WIDTH = 350
const LEVEL_INCREMENT = 50
const SCORE_SLOTS = 3
const SPAWN_COORD = [null, 70, 140, 210, 280]
const STARTING_LIFE = 1
const SWITCH_EMOJI_DELAY = 0.2
const USER_SPEED = 220

//Globals
let currentEmoji = 0
let level = 1
let music
let nextTargetWave = 0, nextEmojiSwitch = 0;
let scoreText = 0
let lifeText
let targets
let user
let gameOn = true