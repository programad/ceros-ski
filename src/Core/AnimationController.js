import { gameManager } from '../Core/GameManager';

export class AnimationController {
    playing = false;
    loop = false;
    assetNames = [];
    currentFrameIndex = 0;

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
                this.currentFrameIndex = (this.currentFrameIndex % this.assetNames.length + this.assetNames.length) % this.assetNames.length;
            } else {
                if (this.currentFrameIndex >= this.assetNames.length) {
                    this.currentFrameIndex = this.assetNames.length - 1;
                    this.playing = false;
                }
            }
        }
    }

    play(assets, loop) {
        if (assets) {
            this.loop = loop ? loop : false;
            this.playing = true;
            this.assetNames = assets;
            this.currentFrameIndex = 0;
        }
    }

    getCurrentAssetName() {
        return this.assetNames[this.currentFrameIndex];
    }
}