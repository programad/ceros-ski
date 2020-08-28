import { gameManager } from '../Core/GameManager';

export class AnimationController {
    playing = false;
    animationFrames = [];
    longAnimationFrameDuration = 8;
    shortAnimationFrameDuration = 24;

    constructor() {
        gameManager.resetTimer();
    }

    update() {
        if (this.animationFrames.length > 0 && gameManager.getTimer() >= this.animationInterval) {
            gameManager.resetTimer();
            this.currentFrameIndex++;

            if (this.currentFrameIndex >= this.animationFrames.length) {
                this.currentFrameIndex = this.animationFrames.length - 1;
                this.currentFrame = this.animationFrames[this.currentFrameIndex];
                this.playing = false;
            } else {
                this.currentFrame = this.animationFrames[this.currentFrameIndex];
            }
        }
    }

    play(assets) {
        if (assets) {
            this.playing = true;
            this.animationFrames = assets;
            this.currentFrameIndex = 0;
            this.animationInterval = this.animationFrames.length > 1 ? this.longAnimationFrameDuration : this.shortAnimationFrameDuration;

            this.currentFrame = this.animationFrames[this.currentFrameIndex];
        }
    }

    getCurrentFrame() {
        return this.animationFrames[this.currentFrameIndex];
    }
}