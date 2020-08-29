import { Obstacle } from "../Entities/Obstacles/Obstacle";

describe('obstacle tests', () => {

    describe('on initialization', () => {
        test('should be initialized', () => {

            let obstacle = new Obstacle(0, 0, true);
            
            expect(obstacle).toBeDefined();
        });
        test('should be initialized', () => {

            let obstacle = new Obstacle(0, 0, false);
            
            expect(obstacle).toBeDefined();
        });
    });
});