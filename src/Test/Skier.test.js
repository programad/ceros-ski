import 'babel-polyfill';
import { Skier } from '../Entities/Skier';
import * as Constants from '../Constants';

let skier;

beforeEach(() => {
    skier = new Skier(0, 0);
});

describe("Testing Skier", () => {

    describe("setting directions", () => {
        test("should set right", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });
        test("should set right_down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });
        test("should set down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should set left_down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });
        test("should set left", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT);
        });
    });

    describe("when skier is crashed", () => {
        test("game should not crash when pressing left from crashed state", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.CRASH);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT);
        });

        test("game should not crash when pressing right from crashed state", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.CRASH);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });

        test("game should not crash when pressing down from crashed state", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.CRASH);

            skier.turnDown();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
    });

    describe("when pressing left key", () => {
        test("skier going right should turn right_down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });

        test("skier going right_down should turn down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });

        test("skier going down should turn left_down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });

        test("skier going left_down should turn left", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT);
        });

        test("skier going left stay going left", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            skier.turnLeft();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT);
        });
    });

    describe("when pressing right key", () => {
        test("skier going left should turn left_down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });

        test("skier going left_down should turn down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });

        test("skier going down should turn right_down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });

        test("skier going right_down should turn right", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });

        test("skier going right stay going right", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            skier.turnRight();

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });
    });

    describe("when pressing down key", () => {
        test("should go down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            skier.turnDown(); // for what?

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should go down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            skier.turnDown(); // for what?

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should go down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            skier.turnDown(); // for what?

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should go down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            skier.turnDown(); // for what?

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should keep going down", () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            skier.turnDown(); // for what?

            expect(skier.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
    });

    describe('when pressing up key', () => {
        test('should go up', () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            let previousY = skier.y;

            skier.turnUp();

            expect(skier.y).toBeLessThan(previousY);
            expect(skier.direction).toEqual(Constants.CHARACTER_DIRECTIONS.LEFT);
        });

        test('should go up', () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            let previousY = skier.y;

            skier.turnUp();

            expect(skier.y).toBeLessThan(previousY);
            expect(skier.direction).toEqual(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });

        test('should not go up', () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            let previousY = skier.y;

            skier.turnUp();

            expect(skier.y).toEqual(previousY);
            expect(skier.direction).toEqual(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });

        test('should not go up', () => {
            skier.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            let previousY = skier.y;

            skier.turnUp();

            expect(skier.y).toEqual(previousY);
            expect(skier.direction).toEqual(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });
    });

    describe('on update', () => {
        test('should update to left down asset', () => {

            let previousAssetName = skier.assetName;
            skier.direction = Constants.CHARACTER_DIRECTIONS.LEFT_DOWN;
            skier.move();
            skier.update();
            let nextAssetName = skier.assetName;

            expect(nextAssetName).not.toEqual(previousAssetName);
            expect(nextAssetName).toEqual('skierLeftDown');
        });
        test('should keep the down asset', () => {

            skier.direction = Constants.CHARACTER_DIRECTIONS.DOWN;
            skier.move();
            skier.update();
            let nextAssetName = skier.assetName;

            expect(nextAssetName).toEqual('skierDown');
        });
        test('should update to right down asset', () => {

            let previousAssetName = skier.assetName;
            skier.direction = Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN;
            skier.move();
            skier.update();
            let nextAssetName = skier.assetName;

            expect(nextAssetName).not.toEqual(previousAssetName);
            expect(nextAssetName).toEqual('skierRightDown');
        });
    });

    describe('on updateAsset', () => {
        test('should not change asset', () => {     
            
            let oldAssetName = skier.assetName;
            skier.direction = Constants.CHARACTER_DIRECTIONS.DOWN;
            skier.updateAsset();

            expect(skier.assetName).toEqual(oldAssetName);
        });
        test('should change asset', () => {     
            
            let oldAssetName = skier.assetName;
            skier.direction = Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN;
            skier.updateAsset();

            expect(skier.assetName).not.toEqual(oldAssetName);
        });
    });

    describe('on jump', () => {
        test('should change asset to jump', () => {

            skier.jump();

            expect(skier.assetName).toEqual('skierJumpStart');
        });
        test('should not change asset to jump', () => {

            skier.assetName = Constants.SKIER_JUMP_CLIMAX;
            skier.isJumping = true;
            skier.jump();

            expect(skier.assetName).not.toEqual('skierJumpStart');
        });
        test('should change asset to jump', () => {

            skier.direction = Constants.CHARACTER_DIRECTIONS.DOWN;
            skier.jump();

            expect(skier.assetName).toEqual('skierJumpStart');
        });
        test('should not change asset to jump', () => {

            skier.direction = Constants.CHARACTER_DIRECTIONS.CRASH;
            skier.jump();

            expect(skier.assetName).not.toEqual('skierJumpStart');
        });
    });

    describe('on flip', () => {
        test('should change asset to jump', () => {

            skier.flip();

            expect(skier.assetName).toEqual('skierJumpStart');
        });
        test('should not change asset to jump when crashed', () => {

            skier.direction = Constants.CHARACTER_DIRECTIONS.CRASH;
            skier.flip();

            expect(skier.assetName).not.toEqual('skierJumpStart');
        });

        test('should do a backflip', () => {
            skier.animationController.play = jest.fn();
            
            skier.getFlipChance = jest.fn();
            skier.getFlipChance.mockReturnValueOnce(8);

            skier.flip();

            expect(skier.animationController.play).toHaveBeenCalledWith('backflip', skier.backFlipAnimation);
        });
    });

    describe('on hitting a ramp', () => {
        test('should do a flip', () => {
            skier.flip = jest.fn();
            
            skier.handleRampHit();

            expect(skier.flip).toHaveBeenCalled();
        });
    });

    describe('on hitting a rock', () => {
        test('should crash', () => {
            skier.handleDefaultHit = jest.fn();
            skier.isJumping = false;
            skier.handleRockHit();

            expect(skier.handleDefaultHit).toHaveBeenCalled();
        });
        test('should not crash', () => {
            skier.handleDefaultHit = jest.fn();
            skier.isJumping = true;
            skier.handleRockHit();

            expect(skier.handleDefaultHit).not.toHaveBeenCalled();
        });
    });

    describe('on hitting an obstacle', () => {
        test('should crash', () => {
            
            skier.handleDefaultHit();

            expect(skier.direction).toEqual(Constants.CHARACTER_DIRECTIONS.CRASH);
        });
    });
});