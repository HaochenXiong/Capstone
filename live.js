tileSize = 50;
numTiles = 9;
uiWidth = 3;
level = 1;
maxHp = 6; 

spritesheet = new Image();
spritesheet.src = './img/spriteSheet.png';
                             
gameState = "loading";  

startingHp = 1; 
numLevels = 6;  
shakeAmount = 0;       
shakeX = 0;                 
shakeY = 0; 

const liveInterval = setInterval(draw, 15);

function startLive(){
    myFont.load().then(function(font){
        document.fonts.add(font);
        document.querySelector('#backButton').style.display = "block"
        showTitle()
        audio.BattleStart.play()
        gameState == "title"
    });	
}

window.addEventListener('keypress', (e) => {
    if(gameState == "title"){                              
        startGame();     
    }else if(gameState == "dead"){                     
        showTitle();                                   
    }else if(gameState == "running"){                  
        if(e.key=="w") livePlayer.tryMove(0, -1);
        if(e.key=="s") livePlayer.tryMove(0, 1);
        if(e.key=="a") livePlayer.tryMove(-1, 0);
        if(e.key=="d") livePlayer.tryMove(1, 0);
    }
})

document.querySelector('#backButton').addEventListener('click', () => {
    document.querySelector('#backButton').style.display = "none"
    clearInterval(liveInterval)
    audio.BattleStart.stop()
    animateDungeon()
    dungeonMovables.forEach(movable => {movable.position.y -= 100})
    liveEnterPage.initiated = false
    audio.Dungeon.play()
})

