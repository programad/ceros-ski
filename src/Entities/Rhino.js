import * as Constants from '../Constants';
import { Character } from './Character';
import { intersectTwoRects } from '../Core/Utils';
import { AnimationController } from '../Core/AnimationController';
import { gameManager } from '../Core/GameManager';

export class Rhino extends Character {
    name = 'rhino';
    runLeftAnimation = [Constants.RHINO_RUN_LEFT, Constants.RHINO_RUN_LEFT_2];
    runRightAnimation = [Constants.RHINO_RUN_RIGHT, Constants.RHINO_RUN_RIGHT_2];
    eatingAnimation = [Constants.RHINO_LIFT, Constants.RHINO_LIFT_MOUTH_OPEN, Constants.RHINO_LIFT_EAT_1, Constants.RHINO_LIFT_EAT_2, Constants.RHINO_LIFT_EAT_3, Constants.RHINO_LIFT_EAT_4];

    assetName = Constants.RHINO_DEFAULT;

    direction = Constants.CHARACTER_DIRECTIONS.DOWN;
    speedX  = Constants.RHINO_STARTING_SPEED;
    originalSpeedX = Constants.RHINO_STARTING_SPEED;
    speedY = Constants.RHINO_STARTING_SPEED;
    isEating = false;
    target = null;

    xDiff = 0;

    constructor(x, y) {
        super(x, y);

        this.animationController = new AnimationController(this.name);

        this.animationController.play(this.runLeftAnimation, true);
    }

    updateAsset() {
        this.assetName = this.animationController.getCurrentAssetName();
    }

    move() {
        if (this.target) {
            this.xDiff = Math.abs(this.x - this.target.x);

            if (this.x === this.target.x) {
                this.turnDown();
            } else if (this.target.x < this.x) {
                this.turnLeft();
            } else if (this.target.x > this.x) {
                this.turnRight();
            }

            this.switchDirection();
        }
    }

    switchDirection() {
        switch (this.direction) {
            case Constants.CHARACTER_DIRECTIONS.LEFT_DOWN:
                this.animationController.play(this.runLeftAnimation, true);
                this.moveLeftDown();
                break;
            case Constants.CHARACTER_DIRECTIONS.DOWN:
                this.moveDown();
                break;
            case Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN:
                this.animationController.play(this.runRightAnimation, true);
                this.moveRightDown();
                break;
        }
    }

    moveLeftDown() {
        let amountToMoveX = this.setAmountToMove();

        if (this.canMove) {
            this.x -= amountToMoveX;
            this.y += this.speedY * this.diagonalFactor;
        }
    }

    moveRightDown() {
        let amountToMoveX = this.setAmountToMove();
        
        if (this.canMove) {
            this.x += amountToMoveX;
            this.y += this.speedY * this.diagonalFactor;
        }
    }

    setAmountToMove() {
        let amountToMoveX = this.speedX * this.diagonalFactor;

        if (this.xDiff < amountToMoveX) {
            amountToMoveX = this.xDiff;
        }

        return amountToMoveX;
    }

    turnLeft() {
        if (this.direction !== Constants.CHARACTER_DIRECTIONS.LEFT_DOWN) {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if (this.direction !== Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN) {
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

    chase(target) {
        this.target = target;
    }

    eat() {
        if (!this.isEating) {
            this.isEating = true;
            this.animationController.play(this.eatingAnimation, false);

            this.updateAsset();
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        super.checkIfSkierHitObstacle(obstacleManager, assetManager);

        if (this.target) {
            const targetAsset = assetManager.getAsset(this.target.assetName);

            const targetBounds = this.getBounds(this.target, targetAsset);

            const collision = intersectTwoRects(this.myBounds, targetBounds);

            if (collision) {
                this.stop();
                this.target.stop();

                this.eat();

                gameManager.gameOver();
            }
        }
    }

    handleRampHit() {
        // do nothing
    }

    handleRockHit() {
        // do nothing
    }

    handleDefaultHit() {
        // do nothing
    }
}