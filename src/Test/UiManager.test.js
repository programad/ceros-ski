import 'babel-polyfill';
import { UiManager } from "../Core/UiManager";
import * as Constants from '../Constants';
import { UiText } from "../Ui/UiText";
import * as Mocks from './Mocks';

let canvas, uiManager;

beforeEach(() => {
    canvas = Mocks.CANVAS;
    uiManager = new UiManager(canvas);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('ui manager tests', () => {
    test('should be initialized', () => {
        expect(uiManager).toBeDefined();
    });

    test('should initialize game over screen', () => {
        uiManager.setGameOverScreen = jest.fn();

        uiManager.init();

        expect(uiManager.setGameOverScreen).toHaveBeenCalled();
    });

    test('should draw game over', () => {
        uiManager.drawScreen = jest.fn();

        uiManager.drawGameOver();

        expect(uiManager.drawScreen).toHaveBeenCalled();
    });

    test('should draw pause screen', () => {
        uiManager.drawScreen = jest.fn();

        uiManager.drawPauseScreen();

        expect(uiManager.drawScreen).toHaveBeenCalled();
    });

    test('should draw text', () => {
        let testText = new UiText('testing', '50px Sans-Serif', '#567567');

        uiManager.canvas.drawText = jest.fn();

        uiManager.drawText(testText);

        expect(uiManager.canvas.drawText).toHaveBeenCalled();
    });

    test('should updateUi', () => {
        uiManager.updateUi(60, 1000, 1.2);

        expect(uiManager.topLeftPanel[0].text).toEqual('SCORE: 1000');
        expect(uiManager.topLeftPanel[1].text).toEqual('SPEED: x1.20');
        expect(uiManager.topRightPanel[0].text).toEqual('60 FPS');
    });

    test('should draw top left panel', () => {
        uiManager.drawScreen = jest.fn();

        uiManager.drawTopLeftPanel();

        expect(uiManager.drawScreen).toHaveBeenCalled();
    });

    test('should draw top right panel', () => {
        uiManager.drawScreen = jest.fn();

        uiManager.drawTopRightPanel();

        expect(uiManager.drawScreen).toHaveBeenCalled();
    });

    test('should draw bottom left panel', () => {
        uiManager.drawScreen = jest.fn();

        uiManager.drawBottomLeftPanel();

        expect(uiManager.drawScreen).toHaveBeenCalled();
    });

    test('should draw a screen', () => {
        let testText = new UiText('testing', '50px Sans-Serif', '#567567');
        let screen = [testText, testText];

        uiManager.drawScreen(screen, 100, Constants.TEXT_POSITION.CENTER);

        expect(canvas.drawText).toHaveBeenCalledTimes(2);
    });
});