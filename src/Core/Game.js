import * as Constants from '../Constants';
import { AssetManager } from './AssetManager';
import { Canvas } from './Canvas';
import { Skier } from '../Entities/Skier';
import { ObstacleManager } from '../Entities/Obstacles/ObstacleManager';
import { Rect } from './Utils';
import { gameManager } from './GameManager';
import { Rhino } from '../Entities/Rhino';
import { UiManager } from "../Core/UiManager";

export class Game {
    gameWindow = null;
    lastFrame = -1;

    constructor(canvas) {
        this.assetManager = new AssetManager();
        this.canvas = canvas || new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino = null;
        this.obstacleManager = new ObstacleManager();
        this.uiManager = new UiManager(this.canvas);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        gameManager.updateTimer();

        this.skier.update();

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        this.checkRhinoSpawn();
        if (this.rhino) {
            this.rhino.update();
            this.rhino.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        }
    }

    drawGameWindow() {
        let gameState = gameManager.getGameState();

        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        if (this.rhino) {
            this.rhino.draw(this.canvas, this.assetManager);
        }

        if (gameState !== Constants.GAME_STATE.OVER) {
            this.skier.draw(this.canvas, this.assetManager);
            this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        }
        else{
            this.uiManager.drawGameOver();
        }
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        switch (event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACEBAR:
                this.skier.jump();
                event.preventDefault();
                break;
        }
    }

    checkRhinoSpawn() {
        if (!this.rhino) {
            let totalTimer = gameManager.getTotalTimer();
            if (totalTimer >= Constants.RHINO_STARTING_TIMER) {
                this.rhino = new Rhino(this.skier.x, this.skier.y - Constants.RHINO_STARTING_DISTANCE);
                this.rhino.chase(this.skier);
            }
        }
    }
}