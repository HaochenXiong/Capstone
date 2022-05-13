const myFont = new FontFace('myFont', 'url(https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2)');

function drawSprite(sprite, x, y){
    c.drawImage(
        spritesheet,
        sprite*512,
        0,
        512,
        512,
        x*tileSize + shakeX,
        y*tileSize + shakeY,
        tileSize,
        tileSize
    );
}

function draw(){
    if(gameState == "running" || gameState == "dead"){  
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        screenshake();  

        for(let i=0;i<numTiles;i++){
            for(let j=0;j<numTiles;j++){
                getTile(i,j).draw();
            }
        }

        for(let i=0;i<monsters.length;i++){
            monsters[i].draw();
        }

        livePlayer.draw();

        drawText("Level: "+level, 12, false, 30, "white");
    }
}

function tick(){
    for(let k=monsters.length-1;k>=0;k--){
        if(!monsters[k].dead){
            monsters[k].update();
        }else{
            monsters.splice(k,1);
        }
    }
    if(livePlayer.dead){    
        gameState = "dead";
    }
}

function showTitle(){                                          
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    gameState = "title";

    drawText("LIVE", 50, true, canvas.height/2 - 35, "white");
    drawText("TILL LEVEL 6", 35, true, canvas.height/2 + 30, "white"); 
    drawText("Press Any Key to Start", 15, true, canvas.height/2 + 80, "yellow");
}

function startGame(){                                           
    level = 1;
    startLevel(startingHp);

    gameState = "running";
}

function startLevel(playerHp){                          
    generateLevel();

    livePlayer = new Player(randomPassableTile());
    livePlayer.hp = playerHp;

    randomPassableTile().replace(Exit);
}

function drawText(text, size, centered, textY, color){
    c.fillStyle = color;
    c.font = size + "px myFont";
    let textX;
    if(centered){
        textX = (canvas.width-c.measureText(text).width)/2;
    }else{
        textX = canvas.width-uiWidth*tileSize+20;
    }

    c.fillText(text, textX, textY);
}

function screenshake(){
    if(shakeAmount){
        shakeAmount--;
    }
    let shakeAngle = Math.random()*Math.PI*2;
    shakeX = Math.round(Math.cos(shakeAngle)*shakeAmount);
    shakeY = Math.round(Math.sin(shakeAngle)*shakeAmount);
}
