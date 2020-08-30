import 'babel-polyfill';
import * as Constants from '../Constants';
import { gameManager } from '../Core/GameManager';

let animationController;

const singleFrameAnimation = [Constants.SKIER_JUMP_START],
    longAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_CLIMAX, Constants.SKIER_JUMP_ROLL, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_LANDING];

describe('game manager tests', () => {
    test('should update the timer', () => {
        let initialTimer = gameManager.getTimer();

        gameManager.updateTimer();
        let finalTimer = gameManager.getTimer();

        expect(finalTimer).toBeGreaterThan(initialTimer);
    });

    test('should reset the timer', () => {
        gameManager.timer = 10;

        gameManager.updateTimer();
        let finalTimer = gameManager.getTimer();

        expect(finalTimer).toEqual(0);
    });

    test('should return total timer', () => {
        gameManager.totalTimer = 10;

        let timer = gameManager.getTotalTimer();

        expect(timer).toEqual(10);
    });

    test('should pause the game', () => {
        gameManager.isPaused = false;
        gameManager.gameState = Constants.GAME_STATE.RUNNING;

        gameManager.pause();

        expect(gameManager.isPaused).toEqual(true);
        expect(gameManager.gameState).toEqual(Constants.GAME_STATE.PAUSED);
    });

    test('should unpause the game', () => {
        gameManager.isPaused = true;
        gameManager.gameState = Constants.GAME_STATE.PAUSED;

        gameManager.pause();

        expect(gameManager.isPaused).toEqual(false);
        expect(gameManager.gameState).toEqual(Constants.GAME_STATE.RUNNING);
    });

    test('should not pause the game', () => {
        gameManager.isPaused = false;
        gameManager.gameState = Constants.GAME_STATE.OVER;

        gameManager.pause();

        expect(gameManager.isPaused).toEqual(false);
    });

    test('should restart the game', () => {
        location.reload = jest.fn();

        gameManager.restart();

        expect(location.reload).toHaveBeenCalled();
    });
});