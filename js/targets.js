const spawnRefine = (level) => {
    if (level < 3) {
       spawn = Math.floor((Math.random()) + 1)
    }
    else if (level < 5) {
       spawn = Math.floor((Math.random() * 2) + 1)
    }
    else if (level < 7) {
        spawn = Math.floor((Math.random() * 3) + 1)
    }
    else {
        spawn = Math.floor((Math.random() * 4) + 1)
    }
    return spawn
}

const spawnTargets = () => {
    //Decide how many enemies to spawn
    numTargets = spawnRefine(level)
    //Loops through our number of enemies, creates a target at a random x value along a determined y value and sends it downward
    for(let i = 0; i < numTargets; i++){
        //Packs the spawn coordinate into a more usable variable name
        let currentSpawn = SPAWN_COORD[Math.floor(Math.random() * SPAWN_COORD.length)]
        //Packs the coordinates of the currentSpawn into an identifiable index for later access
        let coordIndex = (SPAWN_COORD.indexOf(currentSpawn))
        //Decides where the target will spawn and gives it an emoji
        let target = targets.create(currentSpawn, 80, EMOJI[Math.floor(Math.random() * EMOJI.length)].src)
        //Takes the coordinate that was just used and stores it inside a separate array
        COORD_DELAY.push(SPAWN_COORD[coordIndex])
        //Then removes it from the original array, so that it can't be used again.
        SPAWN_COORD.splice(coordIndex, 1) 
        //Releases the emoji
        target.body.velocity.y = (Math.floor(Math.random() * 75) + ((level / 2) * 25))
        const refillSpawn = () => {
            SPAWN_COORD.push(COORD_DELAY[0])
            COORD_DELAY.splice(0, 1)
        }
        setInterval(refillSpawn(), 500)
    }
}


const handleScore = (userObj, targetObj) => {
    //compares the current name of the userObj to the name of the current target
    if(userObj.key == targetObj.key){
        addToScore(10)
        send.play()
        targetObj.kill()
    }
    else{
        damage.play()
        removeHealth(userObj, targetObj)
        
    }

}

const removeHealth = (userObj, targetObj) => {
    //Check to see if user can afford to lose health
    if(user.life <= 1){
        targetObj.kill()
        user.life--
        gameOver()
    }//If they can, take one HP away
    else{
        targetObj.kill()
        user.life--
    } //Remove the impacting target from the field.
    
}

