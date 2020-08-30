import * as Constants from '../Constants';

class GameManager {
    isPaused = false;
    gameState = Constants.GAME_STATE.RUNNING;
    lastCalledTime = performance.now();
    currentFrame = 0;
    animationFrameDuration = 10;
    fps = 0;
    score = 0;
    speedModifier = 1;

    constructor() {
        this.totalTimer = 0;
        this.timer = 0;
    }

    updateTimer() {
        this.timer++;
        this.totalTimer++;

        let delta = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();

        if (this.timer >= this.animationFrameDuration) {
            this.resetTimer();
            this.currentFrame++;
            this.fps = Math.floor(1 / delta);
        }
    }

    getSpeedModifier(){
        return this.speedModifier;
    }

    increaseSpeedModifier(){
        this.speedModifier *= 1.01;
    }    

    getFps(){
        return this.fps;
    }

    getCurrentFrame() {
        return this.currentFrame;
    }

    getScore(){
        return this.score;
    }

    incrementScore() {
        this.score++;
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

    getGameState() {
        return this.gameState;
    }

    gameOver() {
        this.gameState = Constants.GAME_STATE.OVER;
    }

    pause() {
        if (this.gameState !== Constants.GAME_STATE.OVER) {
            this.isPaused = !this.isPaused;

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