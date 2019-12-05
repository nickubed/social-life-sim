const addToScore = (points) => {
    user.score += points
}
//Initializes all base score, level, and life text
const initializeText = () => {
    scoreText = game.add.bitmapText(GAME_WIDTH - 340, 590, 'carrierCommand', 'Score: ' + user.score, 12)
    scoreText.tint = '0x000000'
    lifeText = game.add.bitmapText(GAME_WIDTH - 100, 590, 'carrierCommand', `Life: ${user.life}`, 12)
    lifeText.tint = '0x000000'
    levelText = game.add.bitmapText(GAME_WIDTH / 2 - 45, 32, 'carrierCommand', `Level: ${level}`, 10)
    levelText.tint = '0x000000'
}

const gameOver = () => {
    user.kill()
    swal({
        title: 'Well Socialed!',
        text: `Your Score: ${user.score} Your Time: ${Math.floor(game.time.totalElapsedSeconds())} seconds`,
        type: 'warning',
        showCancelButton: false,
        closeOnConfirm: true,
        confirmButtonText: 'Try Again!'
    }, () => {
        window.location.reload();
    })
}
//Regularly updates score & life points to the view port
const updateConstantText = () => {
    scoreText.text = `Score: ${user.score}`
    lifeText.text = `Life: ${user.life}`
}
//Updates level text
const updateLevelText = () => {
    levelText.text = `Level: ${level}`
}