let game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "game", {
    init : init,
    preload : preload,
    create : create,
    update : update
  })
  
  function init(){
    
  }

  function preload(){
    //Set physics
    game.physics.startSystem(Phaser.Physics.ARCADE)
    //Load all images
    //Assets via emojipedia.org / Apple
    game.load.image('bg', './assets/images/MessagesBackground.png')
    game.load.image('cryLaughing', './assets/images/cryLaughing.png')
    game.load.image('pleadingFace', './assets/images/pleadingFace.png')
    game.load.image('starEyes', './assets/images/starEyes.png')
    game.load.image('tongueOut', './assets/images/tongueOut.png')
    game.load.image('foxFace', './assets/images/foxFace.png')
    //Load all sounds
    game.load.audio('music', './assets/sounds/iceFishing.mp3')
    game.load.audio('damage', './assets/sounds/phoneDead.mp3')
    game.load.audio('send', './assets/sounds/messageSend.mp3')
    game.load.audio('ruffRyder', './assets/sounds/ruffRyder.mp3')
    //Load font
    game.load.bitmapFont('carrierCommand', './assets/fonts/carrier_command.png', './assets/fonts/carrier_command.xml')

  }

  function create() {
    // Create the background
      let background = game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg')
    //Initialize EMOJI array
      EMOJI.push(new Emoji('cryLaughing', 'cryLaughing'))
      EMOJI.push(new Emoji('pleadingFace', 'pleadingFace'))
    // Setup Sounds & Start background music
      music = game.add.audio('music')
      damage = game.add.audio('damage')
      send = game.add.audio('send')
      ruffRyder = game.add.audio('ruffRyder')
    // Create the user Emoji and place it inside the track
      user = game.add.sprite(Math.floor(GAME_WIDTH / 2), 514, `${EMOJI[currentEmoji].src}`)
      game.physics.arcade.enable(user)
      user.body.collideWorldBounds = true
      user.life = STARTING_LIFE
      user.score = 0

    // Create target Emoji, destroy when they leave the screen
      targets = game.add.group()
      targets.enableBody = true
      targets.physicsBodyType = Phaser.Physics.ARCADE
      targets.createMultiple(5, `${EMOJI[currentEmoji].src}`)
      targets.setAll('outOfBoundsKill', true)
      targets.setAll('checkWorldBounds', true)
      // targets.forEach(t => {
      //   t.body.bounce.set(0.8, 0.8)
      // })

    // Keyboard Listeners
      cursors = game.input.keyboard.createCursorKeys()
    // Initial Text (display life, score)
      initializeText()
      music.play()
  }

  function update(){
    user.body.velocity.set(0)
    //Keyboard detection
    if (cursors.left.isDown) {
      //Move left
      user.body.velocity.x = -USER_SPEED
    }
    else if (cursors.right.isDown){
      //move right
      user.body.velocity.x = USER_SPEED
    }

    //Cycle through emoji catalog--note that this has a slight delay to prevent players from whipping from emoji to emoji too quickly. Needs tuning.
    //holy guac did this line take some figuring out. Thank you phaser.io for your vast catalog of info!
    if(nextEmojiSwitch <= game.time.totalElapsedSeconds() && cursors.up.isDown) {
      nextEmojiSwitch = game.time.totalElapsedSeconds() + SWITCH_EMOJI_DELAY
      currentEmoji++
      if(currentEmoji >= EMOJI.length){
        currentEmoji = 0
      }
      user.loadTexture(`${EMOJI[currentEmoji].src}`)
    }
    //Below cycles backwards.
    else if(nextEmojiSwitch <= game.time.totalElapsedSeconds() && cursors.down.isDown) {
      nextEmojiSwitch = game.time.totalElapsedSeconds() + SWITCH_EMOJI_DELAY
      currentEmoji--
      if(currentEmoji < 0){
        currentEmoji = EMOJI.length - 1
      }
      user.loadTexture(`${EMOJI[currentEmoji].src}`)
    }
  
    //check if level should be incremented.
    if (user.score >= level * LEVEL_INCREMENT){
      level++
      if(level === 3){
        EMOJI.push(new Emoji('starEyes', 'starEyes'))
        postEmojiText()
        setTimeout(removeEmojiText, 2000)
      }
      if(level === 7){
        EMOJI.push(new Emoji('tongueOut', 'tongueOut'))
        postEmojiText()
        setTimeout(removeEmojiText, 2000)
      }
      if(level === 13){
        EMOJI.push(new Emoji('foxFace', 'foxFace'))
        postEmojiText()
        setTimeout(removeEmojiText, 2000)
      }
      if(level === 15){
        music.stop()
        ruffRyder.play()
      }
      updateLevelText()
    }
    updateConstantText()
    //Launch target waves
    if (user.life > 0){
      game.physics.arcade.overlap(user, targets, handleScore)
  
      game.physics.arcade.collide(targets, targets, (a, b) => {
        a.body.velocity.y += 10
        b.body.velocity.y -= 10
      })
      if(nextTargetWave <= game.time.totalElapsedSeconds()){
      spawnTargets()
      nextTargetWave = game.time.totalElapsedSeconds() + Math.random() + ((level / (level * 2)) + 1)
      }
    }
    else if (user.life <= 0) {
      spawnTargets()
      nextTargetWave = game.time.totalElapsedSeconds() / 2
    }
    //Point accrual / collision detect.
  }