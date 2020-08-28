import * as Constants from '../Constants';
import { Entity } from './Entity';
import { intersectTwoRects, Rect } from '../Core/Utils';
import { AnimationController } from '../Core/AnimationController';
import { randomInt } from '../Core/Utils';

export class Skier extends Entity {
    jumpAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_ALMOST];
    frontFlipAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_CLIMAX, Constants.SKIER_JUMP_ROLL, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_LANDING];
    backFlipAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_ROLL, Constants.SKIER_JUMP_CLIMAX, Constants.SKIER_JUMP_LANDING];

    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    isJumping = false;

    constructor(x, y) {
        super(x, y);

        this.animationController = new AnimationController();
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        if (this.isJumping) {
            this.assetName = this.animationController.getCurrentFrame();
            this.move();
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
        }
    }

    update() {
        this.move();

        this.animationController.update();

        this.isJumping = this.animationController.playing;

        this.updateAsset();
    }

    move() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    checkCrash(direction) {
        if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(direction);
        }
    }

    turnLeft() {
        this.checkCrash(Constants.SKIER_DIRECTIONS.LEFT);
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        } else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        this.checkCrash(Constants.SKIER_DIRECTIONS.RIGHT);
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        } else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
        if (!this.isJumping) {
            this.checkCrash(this.direction);

            this.setDirection(this.direction);

            if (this.direction !== Constants.SKIER_DIRECTIONS.CRASH) {
                this.isJumping = true;
                this.animationController.play(this.jumpAnimation);

                this.updateAsset();
            }
        }
    }

    flip() {
        this.checkCrash(this.direction);

        this.setDirection(this.direction);

        if (this.direction !== Constants.SKIER_DIRECTIONS.CRASH) {
            this.isJumping = true;

            let flipChance = randomInt(0, 10);
            if (flipChance > 7) {
                this.animationController.play(this.backFlipAnimation);
            } else {
                this.animationController.play(this.frontFlipAnimation);
            }

            this.updateAsset();
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if (collision) {
            switch (collision.assetName) {
                case Constants.RAMP:
                    this.handleRampHit();
                    break;
                case Constants.ROCK1:
                    this.handleRockHit();
                    break;
                default:
                    this.handleDefaultHit();
                    break;
            }
        }
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
        this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    }
}