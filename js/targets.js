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
        let target = targets.create(SPAWN_COORD[Math.floor(Math.random() * 5)], 80, EMOJI[Math.floor(Math.random() * EMOJI.length)].src)
        target.body.velocity.y = (Math.floor(Math.random() * 50) + ((level / 2) * 25))
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