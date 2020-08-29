import * as Constants from '../Constants';
import { Entity } from './Entity';
import { intersectTwoRects, Rect } from '../Core/Utils';
import { gameManager } from '../Core/GameManager';

export class Character extends Entity {
    name = '';
    canMove = true;
    speedX = 1;
    speedY = 1;
    diagonalFactor = 1;
    isJumping = false;

    constructor(x, y) {
        super(x, y);
    }

    getBounds(obj, asset) {
        return new Rect(
            obj.x - asset.width / 2,
            obj.y - asset.height / 2,
            obj.x + asset.width / 2,
            obj.y - asset.height / 4
        );
    }

    setDirection(direction) {
        this.direction = direction;
    }

    update() {
        if (this.canMove) {
            this.move();
        }

        this.animationController.update();

        this.isJumping = this.animationController.playing;

        this.updateAsset();
    }

    moveLeft() {
        if (this.canMove) {
            this.x -= this.speedX * gameManager.getSpeedModifier();
        }
    }

    moveLeftDown() {
        if (this.canMove) {
            this.x -= this.speedX * this.diagonalFactor * gameManager.getSpeedModifier();
            this.y += this.speedY * this.diagonalFactor * gameManager.getSpeedModifier();
        }
    }

    moveDown() {
        if (this.canMove) {
            this.y += this.speedY * gameManager.getSpeedModifier();
        }
    }

    moveRightDown() {
        if (this.canMove) {
            this.x += this.speedX * this.diagonalFactor * gameManager.getSpeedModifier();
            this.y += this.speedY * this.diagonalFactor * gameManager.getSpeedModifier();
        }
    }

    moveRight() {
        if (this.canMove) {
            this.x += this.speedX * gameManager.getSpeedModifier();
        }
    }

    moveUp() {
        if (this.canMove) {
            this.y -= this.speedY * gameManager.getSpeedModifier();
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        this.myAsset = assetManager.getAsset(this.assetName);
        this.myBounds = this.getBounds(this, this.myAsset);

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();

            const obstacleBounds = this.getBounds(obstaclePosition, obstacleAsset);

            return intersectTwoRects(this.myBounds, obstacleBounds);
        });

        if (collision) {
            switch (collision.assetName) {
                case Constants.RAMP:
                    this.handleRampHit();
                    break;
                case Constants.ROCK1:
                    this.handleRockHit();
                    break;
                case Constants.ROCK2:
                    this.handleRockHit();
                    break;
                default:
                    this.handleDefaultHit(collision.assetName);
                    break;
            }
        }
    }

    stop() {
        this.canMove = false;
    }
}