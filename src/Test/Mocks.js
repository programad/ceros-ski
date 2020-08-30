import { Obstacle } from "../Entities/Obstacles/Obstacle";

export const CANVAS = { setDrawOffset: jest.fn(), measureUiText: jest.fn().mockImplementation(() => ({ height: 10, width: 10 })), drawText: jest.fn(), drawImage: jest.fn(), drawOverlay: jest.fn() };
export const ASSET_MANAGER = { loadedAssets: [], loadAssets: jest.fn(), getAsset: jest.fn().mockImplementation(() => ({ width: 0, height: 0 })) };
export const GAME_WINDOW = { left: 0, top: 0, right: 1000, bottom: 1000 };
export const UI_MANAGER = { drawGameOver: jest.fn(), updateUi: jest.fn(), drawPauseScreen: jest.fn(), drawBottomLeftPanel: jest.fn(), drawTopLeftPanel: jest.fn(), drawTopRightPanel: jest.fn() };
export const OBSTACLE_MANAGER = { drawObstacles: jest.fn(), placeNewObstacle: jest.fn(), getObstacles: jest.fn().mockImplementation(() => [new Obstacle(0, 0, true)]), placeInitialObstacles: jest.fn() };
export const SKIER = { draw: jest.fn(), turnLeft: jest.fn(), turnRight: jest.fn(), turnDown: jest.fn(), turnUp: jest.fn(), jump: jest.fn(), update: jest.fn(), stop: jest.fn(), checkIfSkierHitObstacle: jest.fn(), getPosition: jest.fn().mockImplementation(() => ({ x: 1, y: 2 })) };