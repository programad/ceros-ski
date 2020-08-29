import { UiText } from "../Ui/UiText";
import * as Constants from '../Constants';

export class UiManager {

    bigFont = '50px Sans-Serif';
    smallFont = '20px Sans-Serif';
    uiColor = '#567567';

    constructor(canvas) {
        this.canvas = canvas;
        this.gameOverText = new UiText('GAME OVER', this.bigFont, this.uiColor, Constants.TEXT_POSITION.CENTER);
        this.pressToRestartMessage = new UiText('press ENTER to restart', this.smallFont, this.uiColor, Constants.TEXT_POSITION.CENTER);
        this.pausedText = new UiText('PAUSED', this.bigFont, this.uiColor, Constants.TEXT_POSITION.CENTER);
    }

    drawGameOver(){
        this.drawText(this.gameOverText);
        this.drawText(this.pressToRestartMessage);
    }

    drawPaused(){
        this.drawText(this.pausedText);
    }

    drawText(textObject) {
        this.canvas.drawText(textObject.text, textObject.font, textObject.color, textObject.position);
    }
}