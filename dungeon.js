const dungeonCollisionMap = []
for (let i = 0; i< dungeonCollisions.length; i+=54){
    dungeonCollisionMap.push(
    dungeonCollisions.slice(i, i + 54)
    )
}

const liveEnterMap = []
for (let i = 0; i< liveEnter.length; i+=54){
    liveEnterMap.push(
    liveEnter.slice(i, i + 54)
    )
}

const liveTutoMap = []
for (let i = 0; i< liveTuto.length; i+=54){
    liveTutoMap.push(
    liveTuto.slice(i, i + 54)
    )
}

const knightTalkMap = []
for (let i = 0; i< knightTalk.length; i+=54){
    knightTalkMap.push(
    knightTalk.slice(i, i + 54)
    )
}

const dungeonBoundaries = []
const dungeonOffset = {
    x: -1360,
    y: -1300
}

dungeonCollisionMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 281)
        dungeonBoundaries.push(
            new Boundary({position: {
                x: j * Boundary.width + dungeonOffset.x,
                y: i * Boundary.height + dungeonOffset.y
                }
            })
        )
    })
})

const liveEnterPort = []

liveEnterMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 281)
        liveEnterPort.push(
            new Boundary({position: {
                x: j * Boundary.width + dungeonOffset.x,
                y: i * Boundary.height + dungeonOffset.y
                }
            })
        )
    })
})

const knightTalkPort = []

knightTalkMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 281)
        knightTalkPort.push(
            new Boundary({position: {
                x: j * Boundary.width + dungeonOffset.x,
                y: i * Boundary.height + dungeonOffset.y
                }
            })
        )
    })
})

const liveTutoPort = []

liveTutoMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 281)
        liveTutoPort.push(
            new Boundary({position: {
                x: j * Boundary.width + dungeonOffset.x,
                y: i * Boundary.height + dungeonOffset.y
                }
            })
        )
    })
})

const dungeonImage = new Image()
dungeonImage.src = './img/dungeonMap.png'

const dungeonForeImage = new Image()
dungeonForeImage.src = './img/dungeonForeground.png'

const dungeonBackground = new Sprite({
    position: {
        x : dungeonOffset.x,
        y : dungeonOffset.y
    },
    image : dungeonImage
})

const dungeonForeground = new Sprite({
    position: {
        x : dungeonOffset.x,
        y : dungeonOffset.y
    },
    image : dungeonForeImage
})

const dungeonMovables = [dungeonBackground, ...dungeonBoundaries, dungeonForeground, ...liveEnterPort, ...liveTutoPort, ...knightTalkPort]


const liveEnterPage = {
    initiated: false
}

function animateDungeon(){
    const animationId = window.requestAnimationFrame(animateDungeon)
    dungeonBackground.draw()
    dungeonBoundaries.forEach(b => {
        b.draw()
    })
    liveEnterPort.forEach(b => {
        b.draw()
    })
    liveTutoPort.forEach(b => {
        b.draw()
    })
    knightTalkPort.forEach(b => {
        b.draw()
    })
    player.draw()
    dungeonForeground.draw()

    let moving = true
    player.moving = false

    if (liveEnterPage.initiated) return

        //Live Till Level 6 Entery
        if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
            for (let i = 0; i < liveEnterPort.length; i++){
                const liveEnter = liveEnterPort[i] 
                const overlappingArea = (Math.min(player.position.x + player.width,
                    liveEnter.position.x + liveEnter.width) - Math.max(player.position.x,
                    liveEnter.position.x)) * 
                    (Math.min(player.position.y + player.height,
                    liveEnter.position.y + liveEnter.height) - Math.max(player.position.y,
                    liveEnter.position.y))
                if (rectangularCollision({
                    rec1: player,
                    rec2: liveEnter
                    }) &&
                    overlappingArea > (player.width * player.height) / 2
                ) {
                    window.cancelAnimationFrame(animationId)
                    audio.Dungeon.stop()
                    liveEnterPage.initiated = true
                    gsap.to('#blackScreen', {
                        opacity: 1,
                        duration: 1,
                        onComplete(){
                            startLive()
                            gsap.to('#blackScreen', {
                                opacity: 0,
                                duration: 1
                            })
                        }
                    })
                    break
                }
            }
        }
        
        //Live Tutorial
        if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
            for (let i = 0; i < liveTutoPort.length; i++){
                const liveTuto = liveTutoPort[i] 
                const overlappingArea = (Math.min(player.position.x + player.width,
                    liveTuto.position.x + liveTuto.width) - Math.max(player.position.x,
                    liveTuto.position.x)) * 
                    (Math.min(player.position.y + player.height,
                    liveTuto.position.y + liveTuto.height) - Math.max(player.position.y,
                    liveTuto.position.y))
                if (rectangularCollision({
                    rec1: player,
                    rec2: liveTuto
                    }) &&
                    overlappingArea > (player.width * player.height) / 2
                ) {
                    document.querySelector('#liveBoard').style.display = "block"
                    break
                }
            }
        }

        //Talk with Knight
        if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
            for (let i = 0; i < knightTalkPort.length; i++){
                const knightTalk = knightTalkPort[i] 
                const overlappingArea = (Math.min(player.position.x + player.width,
                    knightTalk.position.x + knightTalk.width) - Math.max(player.position.x,
                    knightTalk.position.x)) * 
                    (Math.min(player.position.y + player.height,
                    knightTalk.position.y + knightTalk.height) - Math.max(player.position.y,
                    knightTalk.position.y))
                if (rectangularCollision({
                    rec1: player,
                    rec2: knightTalk
                    }) &&
                    overlappingArea > (player.width * player.height) / 2
                ) {
                    document.querySelector('#knightBoard').style.display = "block"
                    break
                }
            }
        }

    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        for (let i = 0; i < dungeonBoundaries.length; i++){
            const boundary = dungeonBoundaries[i] 
            if (rectangularCollision({
                rec1: player,
                rec2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                }}
            })) {
                moving = false
                break
            }
        }

        if (moving)
        dungeonMovables.forEach(movable => {movable.position.y +=3})
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        for (let i = 0; i < dungeonBoundaries.length; i++){
            const boundary = dungeonBoundaries[i] 
            if (rectangularCollision({
                rec1: player,
                rec2: {...boundary, position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                }}
            })) {
                moving = false
                break
            }
        }

        if (moving)
        dungeonMovables.forEach(movable => {movable.position.x +=3})
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        for (let i = 0; i < dungeonBoundaries.length; i++){
            const boundary = dungeonBoundaries[i] 
            if (rectangularCollision({
                rec1: player,
                rec2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                }}
            })) {
                moving = false
                break
            }
        }

        if (moving)
        dungeonMovables.forEach(movable => {movable.position.y -=3})
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        for (let i = 0; i < dungeonBoundaries.length; i++){
            const boundary = dungeonBoundaries[i] 
            if (rectangularCollision({
                rec1: player,
                rec2: {...boundary, position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y
                }}
            })) {
                moving = false
                break
            }
        }

        if (moving)
        dungeonMovables.forEach(movable => {movable.position.x -=3})
    }
}

document.querySelector('#liveClose').addEventListener('click', () => {
    document.querySelector('#liveBoard').style.display = "none"
})

document.querySelector('#knightClose').addEventListener('click', () => {
    document.querySelector('#knightBoard').style.display = "none"
})