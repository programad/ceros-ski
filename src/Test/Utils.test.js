import { randomInt, intersectTwoRects, Rect } from "../Core/Utils";

describe('utils tests', () => {
    test('should generate a rectangle', () => {
        let rect = new Rect(1, 2, 3, 4);

        expect(rect).toBeDefined();
        expect(rect.left).toEqual(1);
        expect(rect.top).toEqual(2);
        expect(rect.right).toEqual(3);
        expect(rect.bottom).toEqual(4);
    });

    test('should intersect both rectangles', () => {
        let rect1 = new Rect(1, 2, 3, 4);
        let rect2 = new Rect(1, 2, 3, 4);

        let intersect = intersectTwoRects(rect1, rect2);

        expect(intersect).toBeTruthy();
    });

    test('should return a random int', () => {

        let r = randomInt(1, 5);

        expect(r).toBeDefined();
        expect(r).toBeGreaterThanOrEqual(1);
        expect(r).toBeLessThanOrEqual(5);
    });
});