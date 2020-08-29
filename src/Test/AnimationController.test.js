import 'babel-polyfill';
import { AnimationController } from '../Core/AnimationController';
import * as Constants from '../Constants';
import { gameManager } from '../Core/GameManager';

let animationController;

const singleFrameAnimation = [Constants.SKIER_JUMP_START],
    longAnimation = [Constants.SKIER_JUMP_START, Constants.SKIER_JUMP_CLIMAX, Constants.SKIER_JUMP_ROLL, Constants.SKIER_JUMP_ALMOST, Constants.SKIER_JUMP_LANDING],
    runLeftAnimation = [Constants.RHINO_RUN_LEFT, Constants.RHINO_RUN_LEFT_2];

describe('no loop animation controller tests', () => {
    let initializeTests = () => {
        animationController = new AnimationController();
    };

    beforeEach(() => {
        initializeTests();
    });

    test('the animator controller should be initialized', () => {
        expect(animationController).not.toBeNull();
        expect(animationController).not.toBeUndefined();
    });

    test('the animation should be played', () => {
        animationController.play(longAnimation);

        expect(animationController.playing).not.toBeFalsy();
    });

    test('the animation should not be played', () => {
        animationController.play();

        expect(animationController.playing).toBeFalsy();
    });

    test('should return the first frame', () => {
        animationController.play(longAnimation);

        let firstFrame = longAnimation[0];
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeDefined();
        expect(frame).toEqual(firstFrame);
    });

    test('should return the second frame', () => {
        animationController.play(longAnimation);

        gameManager.timer = animationController.animationInterval;
        gameManager.getCurrentFrame = jest.fn();
        gameManager.getCurrentFrame.mockReturnValueOnce(1);

        animationController.update();

        let secondFrame = longAnimation[1];
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeDefined();
        expect(frame).toEqual(secondFrame);
    });

    test('should return the last frame', () => {
        animationController.play(longAnimation);

        gameManager.timer = animationController.animationInterval;
        animationController.currentFrameIndex = longAnimation.length - 1;
        animationController.update();

        let lastFrame = longAnimation[longAnimation.length - 1];
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeDefined();
        expect(frame).toEqual(lastFrame);
    });

    test('should return the single frame', () => {
        animationController.play(singleFrameAnimation);

        gameManager.timer = animationController.animationInterval;
        animationController.currentFrameIndex = singleFrameAnimation.length - 1;
        animationController.update();

        let lastFrame = singleFrameAnimation[singleFrameAnimation.length - 1];
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeDefined();
        expect(frame).toEqual(lastFrame);
    });

    test('should return the last frame', () => {
        animationController.play(longAnimation);

        animationController.currentFrameIndex = longAnimation.length - 1;
        gameManager.timer = animationController.animationInterval;
        gameManager.getCurrentFrame = jest.fn();
        gameManager.getCurrentFrame.mockReturnValueOnce(1);

        animationController.update();

        let lastFrame = longAnimation[longAnimation.length - 1];
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeDefined();
        expect(frame).toEqual(lastFrame);
    });

    test('should not return a frame', () => {
        animationController.play(longAnimation);

        animationController.currentFrameIndex = longAnimation.length;
        animationController.update();
        
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeUndefined();
    });
});

describe('when looping animations', () => {
    let initializeTests = () => {
        animationController = new AnimationController();
    };

    beforeEach(() => {
        initializeTests();
    });

    test('should return the first frame', () => {
        gameManager.getCurrentFrame = jest.fn();
        gameManager.getCurrentFrame.mockReturnValueOnce(1);

        animationController.play(runLeftAnimation, true);

        let firstFrame = runLeftAnimation[0];
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeDefined();
        expect(frame).toEqual(firstFrame);
    });

    test('should return the second frame', () => {
        animationController.lastFrame = 1;
        gameManager.getCurrentFrame = jest.fn();
        gameManager.getCurrentFrame.mockReturnValueOnce(2);

        animationController.play(runLeftAnimation, true);

        animationController.update();

        let secondFrame = runLeftAnimation[1];
        let frame = animationController.getCurrentAssetName();

        expect(frame).toBeDefined();
        expect(frame).toEqual(secondFrame);
    });
});