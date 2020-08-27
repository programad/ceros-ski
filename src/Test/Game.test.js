import 'babel-polyfill';
import { Game } from '../Core/Game';

let game;

describe('game initialization', () => {
  let initializeTests = () => {
    game = new Game({});
  };

  beforeEach(() => {
    initializeTests();
  });

  test('the game should be initialized', () => {
    expect(game).not.toBeNull();
    expect(game).not.toBeUndefined();
  });
});
