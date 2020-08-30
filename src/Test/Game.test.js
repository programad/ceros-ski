import 'babel-polyfill';
import * as Constants from '../Constants';
import * as Mocks from './Mocks';
import { Game } from '../Core/Game';
import { gameManager } from '../Core/GameManager'
import { Rhino } from '../Entities/Rhino';

let canvas, game;

beforeEach(() => {
    canvas = Mocks.CANVAS;
    game = new Game(canvas);
    game.assetManager = Mocks.ASSET_MANAGER;
    game.uiManager = Mocks.UI_MANAGER;
});

describe('game initialization', () => {

    test('window should be initialized', () => {
        expect(window).not.toBeNull();
        expect(window).not.toBeUndefined();
    });

    test('the game should be initialized', () => {
        expect(game).not.toBeNull();
        expect(game).not.toBeUndefined();
    });

    test('should place initial objstacles', () => {
        game.obstacleManager.placeInitialObstacles = jest.fn();

        game.init();

        expect(game.obstacleManager.placeInitialObstacles).toBeCalled();
    });

    test('should run the game', () => {
        game.canvas.clearCanvas = jest.fn();
        game.updateGameWindow = jest.fn();
        game.drawGameWindow = jest.fn();

        game.run();

        expect(game.canvas.clearCanvas).toBeCalled();
        expect(game.updateGameWindow).toBeCalled();
        expect(game.drawGameWindow).toBeCalled();
    });

    test('should load the assets', () => {

        gameManager.updateTimer = jest.fn();

        game.load().then(() => {
            expect(game.assetManager.loadedAssets.length).toBeGreaterThan(0);
        });
    });
});

describe('game update', () => {

    beforeEach(() => {
        game.calculateGameWindow = jest.fn();
    });

    test('should update the game window without a rhino', () => {
        game.load().then(() => {
            game.updateGameWindow();

            expect(gameManager.updateUi).toBeCalled();
            expect(gameManager.updateTimer).toBeCalled();
            expect(game.calculateGameWindow).toBeCalled();
        });
    });

    test('should update the game window with a rhino', () => {
        game.rhino = new Rhino(0, 0);

        game.load().then(() => {
            game.updateGameWindow();

            expect(gameManager.updateUi).toBeCalled();
            expect(game.calculateGameWindow).toBeCalled();
            expect(gameManager.updateTimer).toBeCalled();
        });
    });

    test('should not update', () => {
        game.gameState === Constants.GAME_STATE.PAUSED;

        game.load().then(() => {
            game.updateGameWindow();

            expect(gameManager.updateUi).toBeCalled();
            expect(game.calculateGameWindow).toBeCalled();
            expect(gameManager.updateTimer).not.toBeCalled();
        });
    });

    test('should update when running', () => {
        game.gameState === Constants.GAME_STATE.RUNNING;

        game.load().then(() => {
            game.updateGameWindow();

            expect(gameManager.updateUi).toBeCalled();
            expect(game.calculateGameWindow).toBeCalled();
            expect(gameManager.updateTimer).toBeCalled();
        });
    });
});

describe('game drawing', () => {
    test('should draw the game window', () => {
        game.drawUi = jest.fn();

        game.load().then(() => {
            game.drawGameWindow();

            expect(game.drawUi).toBeCalled();
        });
    });

    test('should draw the game window with rhino', () => {
        game.rhino = new Rhino(0, 0);
        game.rhino.draw = jest.fn();

        game.load().then(() => {
            game.drawGameWindow();

            expect(game.rhino.draw).toBeCalled();
        });
    });

    test('should draw game over', () => {
        game.gameState === Constants.GAME_STATE.OVER;

        game.load().then(() => {
            game.drawGameWindow();

            expect(game.uiManager.drawGameOver).toBeCalled();
        });
    });
});