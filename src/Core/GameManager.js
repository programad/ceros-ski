import * as Constants from '../Constants';

class GameManager {
    isPaused = false;
    lastCalledTime = performance.now();
    currentFrame = 0;
    animationFrameRate = 8;
    fps;
    gameState = Constants.GAME_STATE.RUNNING;

    constructor() {
        this.totalTimer = 0;
        this.timer = 0;
    }

    updateTimer() {
        this.timer++;
        this.totalTimer++;

        let delta = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();

        if (this.timer >= this.animationFrameRate) {
            this.resetTimer();
            this.currentFrame++;
            this.fps = Math.floor(1 / delta);
        }
    }

    getTotalTimer() {
        return this.totalTimer;
    }

    getTimer() {
        return this.timer;
    }

    resetTimer() {
        this.timer = 0;
    }

    getCurrentFrame() {
        return this.currentFrame;
    }

    getGameState() {
        return this.gameState;
    }

    gameOver() {
        this.gameState = Constants.GAME_STATE.OVER;
    }

    pause() {
        if (this.gameState !== Constants.GAME_STATE.OVER) {
            this.isPaused = !this.isPaused;
            console.log(this.isPaused);

            if (this.isPaused) {
                this.gameState = Constants.GAME_STATE.PAUSED;
            } else {
                this.gameState = Constants.GAME_STATE.RUNNING;
            }
        }
    }

    restart(){
        location.reload();
    }
}

export let gameManager = new GameManager();