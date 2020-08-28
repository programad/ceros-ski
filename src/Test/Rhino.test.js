import 'babel-polyfill';
import { Rhino } from '../Entities/Rhino';
import * as Constants from '../Constants';

let rhino;

beforeEach(() => {
    rhino = new Rhino(0, 0);
});

describe("Testing Rhino", () => {

    describe("setting directions", () => {
        test("should set right", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });
        test("should set right_down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });
        test("should set down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should set left_down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });
        test("should set left", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT);
        });
    });

    describe("when pressing left key", () => {
        test("skier going right should turn right_down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            rhino.turnLeft();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });

        test("skier going right_down should turn down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            rhino.turnLeft();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });

        test("skier going down should turn left_down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            rhino.turnLeft();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });

        test("skier going left_down should turn left", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            rhino.turnLeft();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT);
        });

        test("skier going left stay going left", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            rhino.turnLeft();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT);
        });
    });

    describe("when pressing right key", () => {
        test("skier going left should turn left_down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            rhino.turnRight();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });

        test("skier going left_down should turn down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            rhino.turnRight();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });

        test("skier going down should turn right_down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            rhino.turnRight();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });

        test("skier going right_down should turn right", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            rhino.turnRight();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });

        test("skier going right stay going right", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            rhino.turnRight();

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });
    });

    describe("when pressing down key", () => {
        test("should go down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            rhino.turnDown(); // for what?

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should go down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            rhino.turnDown(); // for what?

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should go down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            rhino.turnDown(); // for what?

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should go down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            rhino.turnDown(); // for what?

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
        test("should keep going down", () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.DOWN);

            rhino.turnDown(); // for what?

            expect(rhino.direction).toBe(Constants.CHARACTER_DIRECTIONS.DOWN);
        });
    });

    describe('when pressing up key', () => {
        test('should go up', () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT);

            let previousY = rhino.y;

            rhino.turnUp();

            expect(rhino.y).toBeLessThan(previousY);
            expect(rhino.direction).toEqual(Constants.CHARACTER_DIRECTIONS.LEFT);
        });

        test('should go up', () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT);

            let previousY = rhino.y;

            rhino.turnUp();

            expect(rhino.y).toBeLessThan(previousY);
            expect(rhino.direction).toEqual(Constants.CHARACTER_DIRECTIONS.RIGHT);
        });

        test('should not go up', () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);

            let previousY = rhino.y;

            rhino.turnUp();

            expect(rhino.y).toEqual(previousY);
            expect(rhino.direction).toEqual(Constants.CHARACTER_DIRECTIONS.LEFT_DOWN);
        });

        test('should not go up', () => {
            rhino.setDirection(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);

            let previousY = rhino.y;

            rhino.turnUp();

            expect(rhino.y).toEqual(previousY);
            expect(rhino.direction).toEqual(Constants.CHARACTER_DIRECTIONS.RIGHT_DOWN);
        });
    });
});