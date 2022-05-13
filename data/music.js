const audio = {
    Map: new Howl({
        src: './audio/main.mp3',
        html5: true,
        volume: 0.15
    }),
    Dungeon: new Howl({
        src: './audio/dungeon.wav',
        html5: true,
        volume: 0.15
    }),
    BattleStart: new Howl({
        src: './audio/battleStart.wav',
        html5: true,
        volume: 0.15
    }),
    Battle: new Howl({
        src: './audio/battle.wav',
        html5: true,
        volume: 0.15
    })
}