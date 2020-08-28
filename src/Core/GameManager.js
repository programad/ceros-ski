class GameManager {
    constructor() {
        this.timer = 0;
    }

    updateTimer() {
        this.timer++;
    }

    getTimer(){
        return this.timer;
    }

    resetTimer(){
        this.timer = 0;
    }
}

export let gameManager = new GameManager();