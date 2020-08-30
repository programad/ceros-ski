import { UiText } from "../Ui/UiText";
import * as Constants from '../Constants';
import { gameManager } from './GameManager';

export class UiManager {
    bigFont = '50px Sans-Serif';
    smallFont = '20px Sans-Serif';
    uiColor = '#567567';
    accentColor = '#560123';

    pauseScreen = [];
    pauseScreenHeight = 0;

    gameOverScreen = [];
    gameOverScreenHeight = 0;

    topLeftPanel = [];
    topLeftPanelHeight = 0;

    topRightPanel = [];
    topRightPanelHeight = 0;

    bottomLeftPanel = [];
    bottomLeftPanelHeight = 0;

    constructor(canvas) {
        this.canvas = canvas;
        this.gameOverText = new UiText('GAME OVER', this.bigFont, this.uiColor);
        this.pressToRestartMessage = new UiText('press ENTER to restart', this.smallFont, this.uiColor);
        this.highScoreText = new UiText('HIGHSCORE: 000', this.bigFont, this.accentColor);
        this.pausedText = new UiText('PAUSED', this.bigFont, this.uiColor);
        this.fpsText = new UiText('FPS: 00', this.smallFont, this.uiColor);
        this.scoreText = new UiText('SCORE: 000', this.smallFont, this.uiColor);
        this.speedModifier = new UiText('SPEED: x0', this.smallFont, this.uiColor);
        this.pauseKey = new UiText('ENTER to pause', this.smallFont, this.uiColor);
        this.unpauseKey = new UiText('press ENTER to unpause', this.smallFont, this.uiColor);
        this.jumpKey = new UiText('SPACE BAR to jump', this.smallFont, this.uiColor);

        this.init();
    }

    init() {
        this.setPauseScreen();
        this.setGameOverScreen();
        this.setTopLeftPanel();
        this.setTopRightPanel();
        this.setBottomLeftPanel();
    }

    setPauseScreen() {
        this.pauseScreen.push(this.pausedText);
        this.pauseScreen.push(this.unpauseKey);

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
        let alreadyHasHighScore = this.gameOverScreen.filter(uiText => uiText.text.indexOf('HIGH') > -1).length > 0;

        if (gameManager.isNewHighScore() && !alreadyHasHighScore) {
            this.highScoreText.text = 'HIGHSCORE: ' + gameManager.getHighScore();
            this.gameOverScreen.push(this.highScoreText);
            this.gameOverScreenHeight = this.calculateScreenHeight(this.gameOverScreen);
        }

        this.drawScreen(this.gameOverScreen, this.gameOverScreenHeight, Constants.TEXT_POSITION.CENTER);
    }

    setTopLeftPanel() {
        this.topLeftPanel.push(this.scoreText);
        this.topLeftPanel.push(this.speedModifier);

        this.topLeftPanelHeight = this.calculateScreenHeight(this.topLeftPanel);
    }

    setTopRightPanel() {
        this.topRightPanel.push(this.fpsText);

        this.topRightPanelHeight = this.calculateScreenHeight(this.topRightPanel);
    }

    setBottomLeftPanel() {
        this.bottomLeftPanel.push(this.pauseKey);
        this.bottomLeftPanel.push(this.jumpKey);

        this.bottomLeftPanelHeight = this.calculateScreenHeight(this.bottomLeftPanel);
    }

    updateUi(fps, score, speedModifier) {
        this.topLeftPanel[0].text = 'SCORE: ' + score;
        this.topLeftPanel[1].text = 'SPEED: x' + speedModifier.toFixed(2);

        this.topRightPanel[0].text = fps + ' FPS';
    }

    updateGameOverScreen(highScore) {
        this.gameOverScreen[2].text = 'HIGHSCORE: ' + highScore;
    }

    drawTopLeftPanel() {
        this.drawScreen(this.topLeftPanel, this.topLeftPanelHeight, Constants.TEXT_POSITION.LEFT_TOP);
    }

    drawTopRightPanel() {
        this.drawScreen(this.topRightPanel, this.topRightPanelHeight, Constants.TEXT_POSITION.RIGHT_TOP);
    }

    drawBottomLeftPanel() {
        this.drawScreen(this.bottomLeftPanel, this.bottomLeftPanelHeight, Constants.TEXT_POSITION.LEFT_BOTTOM);
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