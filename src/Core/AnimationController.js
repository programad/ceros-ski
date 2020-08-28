import { gameManager } from '../Core/GameManager';

export class AnimationController {
    playing = false;
    loop = false;
    animationFrames = [];
    animationFrameDuration = 8;

    constructor(name) {
        this.lastFrame = gameManager.getCurrentFrame();
        this.name = name;
    }

    update() {
        let currentFrame = gameManager.getCurrentFrame();
        if (currentFrame > this.lastFrame) {
            this.lastFrame = currentFrame;
            this.currentFrameIndex++;

            if (this.loop) {
                this.currentFrameIndex = (this.currentFrameIndex % this.animationFrames.length + this.animationFrames.length) % this.animationFrames.length;
            } else {
                if (this.currentFrameIndex >= this.animationFrames.length) {
                    this.currentFrameIndex = this.animationFrames.length - 1;
                    this.playing = false;
                }
            }

            this.currentFrame = this.animationFrames[this.currentFrameIndex];
        }
    }

    play(assets, loop) {
        if (assets) {
            this.loop = loop ? loop : false;
            this.playing = true;
            this.animationFrames = assets;
            this.currentFrameIndex = 0;
            this.animationInterval = this.animationFrameDuration;

            this.currentFrame = this.animationFrames[this.currentFrameIndex];
        }
    }

    getCurrentFrame() {
        return this.animationFrames[this.currentFrameIndex];
    }
}