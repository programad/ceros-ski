import 'babel-polyfill';
import * as Constants from '../Constants';
import { AssetManager } from "../Core/AssetManager";

let assetManager;

beforeEach(() => {
    assetManager = new AssetManager();
});

describe('asset manager tests', () => {
    describe('on initializing', () => {
        test('should be defined', () => {
            expect(assetManager).toBeDefined();
        });

        test('should load assets', () => {
            assetManager.loadAssets(Constants.ASSETS).then(() =>{
                expect(assetManager.loadedAssets.length).toBeGreaterThan(0);
            });
        });

        test('should load a single asset', () => {
            assetManager.loadSingleAsset('img/skier_crash.png', 'skierCrash').then(() =>{
                expect(assetManager.loadedAssets.length).toEqual(1);
            });
        });

        test('should return a single asset', () => {
            assetManager.loadSingleAsset('img/skier_crash.png', 'skierCrash').then(() =>{

                let asset = assetManager.getAsset('skierCrash');
                
                expect(asset).toEqual('img/skier_crash.png');
            });
        });
    });
});