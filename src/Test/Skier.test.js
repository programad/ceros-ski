import "babel-polyfill";
import {
  Skier
} from "../Entities/Skier";
import * as Constants from "../Constants";

let skier;

beforeEach(() => {
  skier = new Skier(0, 0);
});

describe("Testing Skier", () => {

  describe("setting directions", () => {
    test("should set right", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
    });
    test("should set right_down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
    });
    test("should set down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });
    test("should set left_down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
    });
    test("should set left", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
    });
  });

  describe("when skier is crashed", () => {
    test("game should not crash when pressing left from crashed state", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

      skier.turnLeft();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
    });

    test("game should not crash when pressing right from crashed state", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

      skier.turnRight();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
    });

    test("game should not crash when pressing down from crashed state", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

      skier.turnDown();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });
  });

  describe("when pressing left key", () => {
    test("skier going right should turn right_down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);

      skier.turnLeft();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
    });

    test("skier going right_down should turn down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

      skier.turnLeft();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });

    test("skier going down should turn left_down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

      skier.turnLeft();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
    });

    test("skier going left_down should turn left", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

      skier.turnLeft();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
    });

    test("skier going left stay going left", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);

      skier.turnLeft();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
    });
  });

  describe("when pressing right key", () => {
    test("skier going left should turn left_down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);

      skier.turnRight();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
    });

    test("skier going left_down should turn down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

      skier.turnRight();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });

    test("skier going down should turn right_down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

      skier.turnRight();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
    });

    test("skier going right_down should turn right", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

      skier.turnRight();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
    });

    test("skier going right stay going right", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);

      skier.turnRight();

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
    });
  });

  describe("when pressing down key", () => {
    test("should go down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);

      skier.turnDown(); // for what?

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });
    test("should go down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

      skier.turnDown(); // for what?

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });
    test("should go down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);

      skier.turnDown(); // for what?

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });
    test("should go down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

      skier.turnDown(); // for what?

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });
    test("should keep going down", () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

      skier.turnDown(); // for what?

      expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });
  });

  describe('when pressing up key', () => {
    test('should go up', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);

      let previousY = skier.y;
      
      skier.turnUp();      

      expect(skier.y).toBeLessThan(previousY);
      expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
    });

    test('should go up', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);

      let previousY = skier.y;
      
      skier.turnUp();

      expect(skier.y).toBeLessThan(previousY);
      expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
    });

    test('should not go up', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

      let previousY = skier.y;
      
      skier.turnUp();

      expect(skier.y).toEqual(previousY);
      expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
    });

    test('should not go up', () => {
      skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

      let previousY = skier.y;
      
      skier.turnUp();

      expect(skier.y).toEqual(previousY);
      expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
    });
  });
});