import 'babel-polyfill';
import { Character } from '../Entities/Character';

let character;

describe('character initialization', () => {
    let initializeTests = () => {
        character = new Character();
    };

    beforeEach(() => {
        initializeTests();
    });

    test('the character should be initialized', () => {
        expect(character).not.toBeNull();
        expect(character).not.toBeUndefined();
    });
});