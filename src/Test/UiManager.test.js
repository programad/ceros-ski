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

describe('ui manager tests', () => {

    test('should be initialized', () => {
        expect(uiManager).toBeDefined();
    });

    test('should initialize game over screen', () => {

        uiManager.setGameOverScreen = jest.fn();

        uiManager.init();

        expect(uiManager.setGameOverScreen).toBeCalled();
    });

    test('should draw game over', () => {

        uiManager.drawScreen = jest.fn();

        uiManager.drawGameOver();

        expect(uiManager.drawScreen).toBeCalled();
    });

    test('should draw text', () => {
        let testText = new UiText('testing', '50px Sans-Serif', '#567567', Constants.TEXT_POSITION.CENTER);

        uiManager.canvas.drawText = jest.fn();

        uiManager.drawText(testText);

        expect(uiManager.canvas.drawText).toBeCalled();
    });
});