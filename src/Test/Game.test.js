import 'babel-polyfill';
import 'jest-canvas-mock';
import * as Constants from '../Constants';
import * as Mocks from './Mocks';
import { Game } from '../Core/Game';
import { gameManager } from '../Core/GameManager'
import { Rhino } from '../Entities/Rhino';

let canvas, game, event;

beforeEach(() => {
    canvas = Mocks.CANVAS;
    game = new Game(canvas);
    game.assetManager = Mocks.ASSET_MANAGER;
    game.uiManager = Mocks.UI_MANAGER;
    game.obstacleManager = Mocks.OBSTACLE_MANAGER;
    game.skier = Mocks.SKIER;
    game.gameWindow = Mocks.GAME_WINDOW;
});

describe('game initialization', () => {

    test('should be initialized', () => {
        expect(window).not.toBeNull();
        expect(window).not.toBeUndefined();
        expect(game.canvas).not.toBeNull();
        expect(game.canvas).not.toBeUndefined();
    });

    test('should be initialized', () => {
        game = new Game(null);

        expect(window).not.toBeNull();
        expect(window).not.toBeUndefined();
        expect(game.canvas).not.toBeNull();
        expect(game.canvas).not.toBeUndefined();
    });

    test('the game should be initialized', () => {
        expect(game).not.toBeNull();
        expect(game).not.toBeUndefined();
    });

    test('should place initial objstacles', () => {
        game.obstacleManager.placeInitialObstacles = jest.fn();

        game.init();

        expect(game.obstacleManager.placeInitialObstacles).toHaveBeenCalled();
    });

    test('should run the game', () => {
        game.canvas.clearCanvas = jest.fn();
        game.updateGameWindow = jest.fn();
        game.drawGameWindow = jest.fn();

        game.run();

        expect(game.canvas.clearCanvas).toHaveBeenCalled();
        expect(game.updateGameWindow).toHaveBeenCalled();
        expect(game.drawGameWindow).toHaveBeenCalled();
    });
});

describe('game update', () => {

    beforeEach(() => {
        game.calculateGameWindow = jest.fn();
        gameManager.updateTimer = jest.fn();
    });

    test('should update gameplay without a rhino', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;

        game.updateGameWindow();

        expect(game.uiManager.updateUi).toHaveBeenCalled();
        expect(game.calculateGameWindow).toHaveBeenCalled();
        expect(gameManager.updateTimer).toHaveBeenCalled();
    });

    test('should update gameplay with a rhino', () => {
        game.rhino = new Rhino(0, 0);
        game.gameState = Constants.GAME_STATE.RUNNING;

        game.updateGameWindow();

        expect(game.uiManager.updateUi).toHaveBeenCalled();
        expect(game.calculateGameWindow).toHaveBeenCalled();
        expect(gameManager.updateTimer).toHaveBeenCalled();
    });


    test('should not update gameplay the timer when paused with a rhino', () => {
        game.rhino = new Rhino(0, 0);
        game.gameState = Constants.GAME_STATE.PAUSED;

        game.updateGameWindow();

        expect(game.uiManager.updateUi).toHaveBeenCalled();
        expect(game.calculateGameWindow).toHaveBeenCalled();
    });

    test('should not update gameplay when paused', () => {
        game.gameState = Constants.GAME_STATE.PAUSED;

        game.updateGameWindow();

        expect(game.uiManager.updateUi).toHaveBeenCalled();
        expect(game.calculateGameWindow).toHaveBeenCalled();
    });

    test('should not update gameplay when the game is over', () => {
        game.gameState = Constants.GAME_STATE.OVER;

        game.updateGameWindow();

        expect(game.uiManager.updateUi).toHaveBeenCalled();
        expect(game.calculateGameWindow).toHaveBeenCalled();
    });

    test('should update when running', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;

        game.updateGameWindow();

        expect(game.uiManager.updateUi).toHaveBeenCalled();
        expect(game.calculateGameWindow).toHaveBeenCalled();
        expect(gameManager.updateTimer).toHaveBeenCalled();
    });

    test('should spawn a rhino', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        game.rhino = null;

        gameManager.getScore = jest.fn().mockImplementation(() => Constants.RHINO_STARTING_NUMBER);

        game.updateGameWindow();

        expect(game.rhino).toBeDefined();
        expect(game.rhino).not.toBeNull();
    });

    test('should not spawn a rhino', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        game.rhino = null;

        gameManager.getScore = jest.fn().mockImplementation(() => Constants.RHINO_STARTING_NUMBER - 10);

        game.updateGameWindow();

        expect(game.rhino).toBeNull();
    });
});

describe('game drawing', () => {
    test('should draw the game window', () => {
        game.drawUi = jest.fn();

        game.drawGameWindow();

        expect(game.drawUi).toHaveBeenCalled();
    });

    test('should draw the game window without rhino', () => {
        game.rhino = null;

        game.drawGameWindow();

        expect(game.rhino).toBeNull();
    });

    test('should draw the game window with rhino', () => {
        game.rhino = new Rhino(0, 0);
        game.rhino.draw = jest.fn();

        game.drawGameWindow();

        expect(game.rhino).not.toBeNull();
        expect(game.rhino.draw).toHaveBeenCalled();
    });

    test('should draw game over', () => {
        game.gameState = Constants.GAME_STATE.OVER;
        game.drawGameWindow();

        expect(game.uiManager.drawGameOver).toHaveBeenCalled();
    });

    test('should draw pause screen', () => {
        game.gameState = Constants.GAME_STATE.PAUSED;

        game.drawGameWindow();

        expect(game.skier.draw).toHaveBeenCalled();
        expect(game.obstacleManager.drawObstacles).toHaveBeenCalled();
        expect(game.uiManager.drawPauseScreen).toHaveBeenCalled();
    });

    test('should draw the game running', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;

        game.drawGameWindow();

        expect(game.skier.draw).toHaveBeenCalled();
        expect(game.obstacleManager.drawObstacles).toHaveBeenCalled();
        expect(game.uiManager.drawBottomLeftPanel).toHaveBeenCalled();
    });
});

describe('on pressing a key', () => {

    beforeAll(() => {
        event = { which: 0, preventDefault: jest.fn() };
    });

    test('should go left', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        event.which = Constants.KEYS.LEFT;

        game.handleKeyDown(event);

        expect(game.skier.turnLeft).toHaveBeenCalled();
    });

    test('should go right', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        event.which = Constants.KEYS.RIGHT;

        game.handleKeyDown(event);

        expect(game.skier.turnRight).toHaveBeenCalled();
    });

    test('should go up', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        event.which = Constants.KEYS.UP;

        game.handleKeyDown(event);

        expect(game.skier.turnUp).toHaveBeenCalled();
    });

    test('should go down', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        event.which = Constants.KEYS.DOWN;

        game.handleKeyDown(event);

        expect(game.skier.turnDown).toHaveBeenCalled();
    });

    test('should jump', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        event.which = Constants.KEYS.SPACEBAR;

        game.handleKeyDown(event);

        expect(game.skier.jump).toHaveBeenCalled();
    });

    test('should pause', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        event.which = Constants.KEYS.ENTER;
        gameManager.pause = jest.fn();

        game.handleKeyDown(event);

        expect(gameManager.pause).toHaveBeenCalled();
    });

    test('should unpause', () => {
        game.gameState = Constants.GAME_STATE.PAUSED;
        event.which = Constants.KEYS.ENTER;
        gameManager.pause = jest.fn();

        game.handleKeyDown(event);

        expect(gameManager.pause).toHaveBeenCalled();
    });

    test('should restart', () => {
        game.gameState = Constants.GAME_STATE.OVER;
        event.which = Constants.KEYS.ENTER;
        gameManager.restart = jest.fn();

        game.handleKeyDown(event);

        expect(gameManager.restart).toHaveBeenCalled();
    });
});

describe('on checkings', () => {
    test('should spawn a rhino', () => {
        game.gameState = Constants.GAME_STATE.RUNNING;
        game.rhino = null;

        gameManager.getScore = jest.fn().mockImplementation(() => Constants.RHINO_STARTING_NUMBER);

        game.checkRhinoSpawn();

        expect(game.rhino).toBeDefined();
        expect(game.rhino).not.toBeNull();
    });
});

describe('on calculations', () => {
    test('should calculate game window', () => {
        game.gameWindow = null;

        game.calculateGameWindow();

        expect(game.gameWindow).toBeDefined();
        expect(game.gameWindow).not.toBeNull();
    });
});