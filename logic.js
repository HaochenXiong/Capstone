const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 616
canvas.height = 448
c.imageSmoothingEnabled = false;

const collisionMap = []
for (let i = 0; i< collisions.length; i+=54){
    collisionMap.push(
    collisions.slice(i, i + 54)
    )
}

const tutorialMap = []
for (let i = 0; i< tutorial.length; i+=54){
    tutorialMap.push(
    tutorial.slice(i, i + 54)
    )
}

const dungeonTutoMap = []
for (let i = 0; i< dungeonTuto.length; i+=54){
    dungeonTutoMap.push(
    dungeonTuto.slice(i, i + 54)
    )
}

const dungeonEnterMap = []
for (let i = 0; i< dungeonEnter.length; i+=54){
    dungeonEnterMap.push(
    dungeonEnter.slice(i, i + 54)
    )
}

const boundaries = []
const offset = {
    x: -700,
    y: -620
}

collisionMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 2625)
        boundaries.push(
            new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

const tutorialBoard = []

tutorialMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 2625)
        tutorialBoard.push(
            new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

const dungeonTutoPort = []

dungeonTutoMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 2625)
        dungeonTutoPort.push(
            new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

const dungeonEnterPort = []

dungeonEnterMap.forEach((row, i)=> {
    row.forEach((symbol, j) => {
        if (symbol === 2625)
        dungeonEnterPort.push(
            new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

const image = new Image()
image.src = './img/groundMap.png'

const playerImage = new Image()
playerImage.src = './img/cRightTwo.png'

const foreImage = new Image()
foreImage.src = './img/Foreground.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 -  16.5,
        y: canvas.height / 2 -  24
    },
    image: playerImage,
    frames: {
        max:4
    }
})

const background = new Sprite({
    position: {
        x : offset.x,
        y : offset.y
    },
    image : image
})

const foreground = new Sprite({
    position: {
        x : offset.x,
        y : offset.y
    },
    image : foreImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, foreground, ...tutorialBoard, ...dungeonTutoPort, ...dungeonEnterPort]

function rectangularCollision({rec1, rec2}){
    return (
        rec1.position.x + rec1.width >= rec2.position.x
        && rec1.position.x <= rec2.position.x + rec2.width
        && rec1.position.y <= rec2.position.y + rec2.height
        && rec1.position.y + rec1.height >= rec2.position.y
    )
}

const dungeonEnterPage = {
    initiated: false
}

function animate() {
    const animationId = window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(b => {
        b.draw()
    })
    tutorialBoard.forEach(b => {
        b.draw()
    })
    dungeonTutoPort.forEach(b => {
        b.draw()
    })
    dungeonEnterPort.forEach(b => {
        b.draw()
    })
    player.draw()
    foreground.draw()
    
    let moving = true
    player.moving = false

    if (dungeonEnterPage.initiated) return

    // Tutorial Board
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < tutorialBoard.length; i++){
            const tutorial = tutorialBoard[i] 
            const overlappingArea = (Math.min(player.position.x + player.width,
                tutorial.position.x + tutorial.width) - Math.max(player.position.x,
                tutorial.position.x)) * 
                (Math.min(player.position.y + player.height,
                tutorial.position.y + tutorial.height) - Math.max(player.position.y,
                tutorial.position.y))
            if (rectangularCollision({
                rec1: player,
                rec2: tutorial
                }) &&
                overlappingArea > (player.width * player.height) / 2
            ) {
                document.querySelector('#tutorialBoard').style.display = "block"
                break
            }
        }
    }

    // Dungeon Board
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < dungeonTutoPort.length; i++){
            const dungeonTuto = dungeonTutoPort[i] 
            const overlappingArea = (Math.min(player.position.x + player.width,
                dungeonTuto.position.x + dungeonTuto.width) - Math.max(player.position.x,
                dungeonTuto.position.x)) * 
                (Math.min(player.position.y + player.height,
                dungeonTuto.position.y + dungeonTuto.height) - Math.max(player.position.y,
                dungeonTuto.position.y))
            if (rectangularCollision({
                rec1: player,
                rec2: dungeonTuto
                }) &&
                overlappingArea > (player.width * player.height) / 2
            ) {
                document.querySelector('#dungeonBoard').style.display = "block"
                break
            }
        }
    }

    //Dungeon Entery
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < dungeonEnterPort.length; i++){
            const dungeonEnter = dungeonEnterPort[i] 
            const overlappingArea = (Math.min(player.position.x + player.width,
                dungeonEnter.position.x + dungeonEnter.width) - Math.max(player.position.x,
                dungeonEnter.position.x)) * 
                (Math.min(player.position.y + player.height,
                dungeonEnter.position.y + dungeonEnter.height) - Math.max(player.position.y,
                dungeonEnter.position.y))
            if (rectangularCollision({
                rec1: player,
                rec2: dungeonEnter
                }) &&
                overlappingArea > (player.width * player.height) / 2
            ) {
                console.log('dungeon')
                window.cancelAnimationFrame(animationId)
                audio.Map.stop()
                dungeonEnterPage.initiated = true
                gsap.to('#blackScreen', {
                    opacity: 1,
                    duration: 1,
                    onComplete(){
                        animateDungeon()
                        audio.Dungeon.play()
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

    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i] 
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
        movables.forEach(movable => {movable.position.y +=3})
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i] 
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
        movables.forEach(movable => {movable.position.x +=3})
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i] 
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
        movables.forEach(movable => {movable.position.y -=3})
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i] 
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
        movables.forEach(movable => {movable.position.x -=3})
    }
}

animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
        keys.w.pressed = true
        lastKey = 'w'
            break
        case 'a':
        keys.a.pressed = true
        lastKey = 'a'
            break
        case 's':
        keys.s.pressed = true
        lastKey = 's'
            break
        case 'd':
        keys.d.pressed = true
        lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
        keys.w.pressed = false
            break
        case 'a':
        keys.a.pressed = false
            break
        case 's':
        keys.s.pressed = false
            break
        case 'd':
        keys.d.pressed = false
            break
    }
})

let clicked = false
document.querySelector('#tutorialClose').addEventListener('click', () => {
    document.querySelector('#tutorialBoard').style.display = "none"
    if (!clicked) {
        audio.Map.play()
        clicked = true
    }
})

document.querySelector('#dungeonClose').addEventListener('click', () => {
    document.querySelector('#dungeonBoard').style.display = "none"
})


