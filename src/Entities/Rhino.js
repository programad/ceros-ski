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

    constructor(x, y) {
        super(x, y);

        this.animationController = new AnimationController(this.name);

        this.animationController.play(this.runLeftAnimation, true);
    }

    updateAsset() {
        this.assetName = this.animationController.getCurrentFrame();
    }

    move() {
        if (this.target) {
            
            let xDiff = Math.abs(this.x - this.target.x);

            if (xDiff < this.speedX) {
                this.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);
            } else if (this.target.x < this.x && this.target.direction !== Constants.CHARACTER_DIRECTIONS.DOWN) {
                this.animationController.play(this.runLeftAnimation, true);
                this.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
            } else if (this.target.x > this.x && this.target.direction !== Constants.CHARACTER_DIRECTIONS.DOWN) {
                this.animationController.play(this.runRightAnimation, true);
                this.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
            }

            this.switchDirection();
        }
    }

    switchDirection() {
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

    turnLeft() {
        if (this.direction === Constants.CHARACTER_DIRECTIONS.LEFT) {
            this.moveLeft();
        } else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
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