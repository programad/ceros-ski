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
});