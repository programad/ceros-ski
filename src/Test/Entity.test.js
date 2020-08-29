import { Entity } from "../Entities/Entity";

let entity, canvas;

beforeEach(() => {
    entity = new Entity(0, 0);
    canvas = {};
});

describe('entity tests', () => {
    test('should be initialized', () => {
        expect(entity).toBeDefined();
        expect(entity).not.toBeNull();
    });

    test('should return assetName', () => {
        entity.assetName = 'test';

        let result = entity.getAssetName();

        expect(result).toBeDefined();
        expect(result).toEqual('test');
    });

    test('should return position', () => {
        entity.x = 2;
        entity.y = 4;

        let result = entity.getPosition();

        expect(result).toBeDefined();
        expect(result.x).toEqual(2);
        expect(result.y).toEqual(4);
    });
});