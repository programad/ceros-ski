import * as Constants from '../Constants';
import { Character } from './Character';
import { randomInt } from '../Core/Utils';
import { AnimationController } from '../Core/AnimationController';

export class Skier extends Character {
    name = 'skier';
    jumpAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_ALMOST];
    frontFlipAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_CLIMAX, Constants.SKIER_JUMP_ROLL, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_LANDING];
    backFlipAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_ROLL, Constants.SKIER_JUMP_CLIMAX, Constants.SKIER_JUMP_LANDING];

    assetName = Constants.SKIER_DOWN;

    direction = Constants.CHARACTER_DIRECTIONS.DOWN;
    speedX = Constants.SKIER_STARTING_SPEED;
    speedY = Constants.SKIER_STARTING_SPEED;
    diagonalFactor = Constants.SKIER_DIAGONAL_FACTOR;

    constructor(x, y) {
        super(x, y);

        this.animationController = new AnimationController(this.name);
    }

    updateAsset() {
        if (this.isJumping) {
            this.assetName = this.animationController.getCurrentFrame();
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
        }
    }

    move() {        
        this.calculateSpeed();

        switch (this.direction) {
            case Constants.CHARACTER_DIRECTIONS.LEFT_DOWN:
                this.moveLeftDown();
                break;
            case Constants.CHARACTER_DIRECTIONS.DOWN:
                this.moveDown();
                break;
            case Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN:
                this.moveRightDown();
                break;
        }
    }

    calculateSpeed() {
        if (this.isJumping) {
            this.speedY *= Constants.SKIER_JUMP_FACTOR;
        }
        else {
            this.speedY = Constants.RHINO_STARTING_SPEED * 1;
        }
    }

    checkCrash(direction) {
        if (this.direction === Constants.CHARACTER_DIRECTIONS.CRASH) {
            this.setDirection(direction);
        }
    }

    turnLeft() {
        this.checkCrash(Constants.CHARACTER_DIRECTIONS.LEFT);
        if (this.direction === Constants.CHARACTER_DIRECTIONS.LEFT) {
            this.moveLeft();
        } else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        this.checkCrash(Constants.CHARACTER_DIRECTIONS.RIGHT);
        if (this.direction === Constants.CHARACTER_DIRECTIONS.RIGHT) {
            this.moveRight();
        } else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if (this.direction === Constants.CHARACTER_DIRECTIONS.LEFT || this.direction === Constants.CHARACTER_DIRECTIONS.RIGHT) {
            this.moveUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);
    }

    jump() {
        if (!this.isJumping) {
            this.checkCrash(this.direction);

            this.setDirection(this.direction);

            if (this.direction !== Constants.CHARACTER_DIRECTIONS.CRASH) {
                this.isJumping = true;
                this.animationController.play(this.jumpAnimation);

                this.updateAsset();
            }
        }
    }

    flip() {
        this.checkCrash(this.direction);

        this.setDirection(this.direction);

        if (this.direction !== Constants.CHARACTER_DIRECTIONS.CRASH) {
            this.isJumping = true;

            let flipChance = this.getFlipChance();
            if (flipChance > 7) {
                this.animationController.play(this.backFlipAnimation);
            } else {
                this.animationController.play(this.frontFlipAnimation);
            }

            this.updateAsset();
        }
    }

    getFlipChance() {
        return randomInt(0, 10)
    }

    handleRampHit() {
        this.flip();
    }

    handleRockHit() {
        if (!this.isJumping) {
            this.handleDefaultHit();
        }
    }

    handleDefaultHit() {
        this.setDirection(Constants.CHARACTER_DIRECTIONS.CRASH);
    }
}