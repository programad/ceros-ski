import 'babel-polyfill';
import * as Mocks from './Mocks';
import { Game } from '../Core/Game';
import { gameManager } from '../Core/GameManager'

let canvas, game;

beforeEach(() => {
    canvas = Mocks.CANVAS;
    game = new Game(canvas);
	game.assetManager = Mocks.ASSET_MANAGER;
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

    test('should update the game window', () => {

        gameManager.updateTimer = jest.fn();

        game.load().then(() => {
            game.updateGameWindow();

            expect(gameManager.updateTimer).toBeCalled();
        });
    });
});