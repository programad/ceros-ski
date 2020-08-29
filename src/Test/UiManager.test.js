import { UiManager } from "../Core/UiManager";
import * as Constants from '../Constants';
import { UiText } from "../Ui/UiText";

let uiManager;

describe('ui manager tests', () => {
    let initializeTests = () => {
        uiManager = new UiManager({});
    };

    beforeEach(() => {
        initializeTests();
    });

    test('should be initialized', () => {
        expect(uiManager).toBeDefined();
    });

    test('should draw game over', () => {

        uiManager.drawText = jest.fn();

        uiManager.drawGameOver();

        expect(uiManager.drawText).toBeCalled();
    });

    test('should draw text', () => {
        let testText = new UiText('testing', '50px Sans-Serif', '#567567', Constants.TEXT_POSITION.CENTER);

        uiManager.canvas.drawText = jest.fn();

        uiManager.drawText(testText);

        expect(uiManager.canvas.drawText).toBeCalled();
    });
});