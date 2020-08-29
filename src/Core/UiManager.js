import { UiText } from "../Ui/UiText";
import * as Constants from '../Constants';

export class UiManager {
    bigFont = '50px Sans-Serif';
    smallFont = '20px Sans-Serif';
    uiColor = '#567567';

    pauseScreen = [];
    pauseScreenHeight = 0;

    gameOverScreen = [];
    gameOverScreenHeight = 0;

    infoPanel = [];
    infoPanelHeight = 0;

    constructor(canvas) {
        this.canvas = canvas;
        this.gameOverText = new UiText('GAME OVER', this.bigFont, this.uiColor);
        this.pressToRestartMessage = new UiText('press ENTER to restart', this.smallFont, this.uiColor);
        this.pausedText = new UiText('PAUSED', this.bigFont, this.uiColor);
        this.fpsText = new UiText('FPS: 00', this.smallFont, this.uiColor);
        this.scoreText = new UiText('SCORE: 000', this.smallFont, this.uiColor);

        this.init();
    }

    init() {
        this.setPauseScreen();
        this.setGameOverScreen();
        this.setInfoPanelRight();
    }

    setPauseScreen() {
        this.pauseScreen.push(this.pausedText);

        this.pauseScreenHeight = this.calculateScreenHeight(this.pauseScreen);
    }

    drawPauseScreen() {            
        this.canvas.drawOverlay();
        this.drawScreen(this.pauseScreen, this.pauseScreenHeight, Constants.TEXT_POSITION.CENTER);
    }

    setGameOverScreen() {
        this.gameOverScreen.push(this.gameOverText);
        this.gameOverScreen.push(this.pressToRestartMessage);

        this.gameOverScreenHeight = this.calculateScreenHeight(this.gameOverScreen);
    }

    drawGameOver() {
        this.drawScreen(this.gameOverScreen, this.gameOverScreenHeight, Constants.TEXT_POSITION.CENTER);
    }

    setInfoPanelRight() {
        this.infoPanel.push(this.fpsText);
        this.infoPanel.push(this.scoreText);

        this.infoPanelHeight = this.calculateScreenHeight(this.infoPanel);
    }

    updateInfoPanel(fps, score) {
        this.infoPanel[0].text = 'FPS: ' + fps;
        this.infoPanel[1].text = 'SCORE: ' + score;
    }

    drawInfoPanelRight() {
        this.drawScreen(this.infoPanel, this.infoPanelHeight, Constants.TEXT_POSITION.RIGHT_TOP);
    }

    drawText(textObject, number) {
        this.canvas.drawText(textObject.text, textObject.font, textObject.color, textObject.position, number);
    }

    drawScreen(textArray, screenHeight, position) {
        for (let i = 0; i < textArray.length; i++) {
            const textObject = textArray[i];

            this.canvas.drawText(textObject.text, textObject.font, textObject.color, position, textArray.length - i, screenHeight);
        }
    }

    calculateScreenHeight(textArray) {
        let screenHeight = 0;

        for (let i = 0; i < textArray.length; i++) {
            const uiText = textArray[i];

            let measures = this.canvas.measureUiText(uiText.text, uiText.font);

            screenHeight += measures.height;
        }

        return screenHeight;
    }
}