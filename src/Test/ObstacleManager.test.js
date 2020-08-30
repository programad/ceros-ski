import * as Mocks from './Mocks';
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { randomInt } from '../Core/Utils';

let obstacleManager, canvas, assetManager;

beforeEach(() => {
    obstacleManager = new ObstacleManager();
    canvas = Mocks.CANVAS;
    assetManager = Mocks.ASSET_MANAGER;
});

describe('obstacle manager tests', () => {

    describe('on initialization', () => {
        test('should be initialized', () => {

            expect(obstacleManager).toBeDefined();
        });
    });

    describe('on placing obstacles', () => {
        test('should place initial obstacles', () => {

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeInitialObstacles();
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
        });

        test('should place obstacle', () => {

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeRandomObstacle();
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
        });

        test('should place obstacle on the left', () => {

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeObstacleLeft(Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
        });

        test('should place obstacle on the right', () => {

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeObstacleRight(Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
        });

        test('should place obstacle on the top', () => {

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeObstacleTop(Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
        });

        test('should place obstacle on the bottom', () => {

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeObstacleBottom(Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
        });

        test('should not place new obstacle on the first gamewindow', () => {
            let newGameWindow = { left: -1, top: 0, right: 1000, bottom: 1000 }

            obstacleManager.getObstacleChance = jest.fn().mockImplementation(() => 7);

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeNewObstacle(newGameWindow);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toEqual(obstacleArraySize);
            expect(newObstacleArraySize).toEqual(0);
        });

        test('should not place new obstacle', () => {
            let newGameWindow = { left: -1, top: 0, right: 1000, bottom: 1000 }

            obstacleManager.getObstacleChance = jest.fn().mockImplementation(() => 7);

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeNewObstacle(newGameWindow, Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toEqual(obstacleArraySize);
            expect(newObstacleArraySize).toEqual(0);
        });

        test('should place new obstacle on the left', () => {
            let newGameWindow = { left: -1, top: 0, right: 1000, bottom: 1000 }

            obstacleManager.getObstacleChance = jest.fn().mockImplementation(() => 8);

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeNewObstacle(newGameWindow, Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
            expect(obstacleManager.obstacles[0].x).toBeLessThan(Mocks.GAME_WINDOW.left);
        });

        test('should place new obstacle on the right', () => {
            let newGameWindow = { left: 1, top: 0, right: 1000, bottom: 1000 }

            obstacleManager.getObstacleChance = jest.fn().mockImplementation(() => 8);

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeNewObstacle(newGameWindow, Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
            expect(obstacleManager.obstacles[0].x).toBeGreaterThanOrEqual(Mocks.GAME_WINDOW.right);
        });

        test('should place new obstacle on the top', () => {
            let newGameWindow = { left: 0, top: -1, right: 1000, bottom: 1000 }

            obstacleManager.getObstacleChance = jest.fn().mockImplementation(() => 8);

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeNewObstacle(newGameWindow, Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
            expect(obstacleManager.obstacles[0].y).toBeLessThan(Mocks.GAME_WINDOW.top);
        });

        test('should place new obstacle on the bottom', () => {
            let newGameWindow = { left: 0, top: 1, right: 1000, bottom: 1000 }

            obstacleManager.getObstacleChance = jest.fn().mockImplementation(() => 8);

            let obstacleArraySize = obstacleManager.obstacles.length;
            obstacleManager.placeNewObstacle(newGameWindow, Mocks.GAME_WINDOW);
            let newObstacleArraySize = obstacleManager.obstacles.length;

            expect(newObstacleArraySize).toBeGreaterThan(obstacleArraySize);
            expect(obstacleManager.obstacles[0].y).toBeGreaterThanOrEqual(Mocks.GAME_WINDOW.bottom);
        });

        test('should calculate an open position', () => {
            let openPosition = obstacleManager.calculateOpenPosition(0, 0, 0, 0);

            expect(openPosition).toBeDefined();
            expect(openPosition.x).toBeDefined();
            expect(openPosition.y).toBeDefined();
        });

        test('should return the obstacles', () => {
            obstacleManager.obstacles = ['test'];

            let obstacles = obstacleManager.getObstacles();

            expect(obstacles).toEqual(['test']);
        });
    });

    describe('on drawing obstacles', () => {
        test('should draw obstacles', () => {
            obstacleManager.obstacles = [{ draw: jest.fn() }];

            obstacleManager.drawObstacles(canvas, assetManager);

            expect(obstacleManager.obstacles[0].draw).toHaveBeenCalled();
        });
    });
});