export const CANVAS = { setDrawOffset: () => jest.fn(), measureUiText: () => jest.fn(), drawText: () => jest.fn() };
export const ASSET_MANAGER = { loadAssets: () => jest.fn(), getAsset: () => ({ width: 0, height: 0 }) };
export const GAME_WINDOW = { left: 0, top: 0, right: 1000, bottom: 1000 };