import { UiText } from "../Ui/UiText";
import * as Constants from '../Constants';

export class UiManager {

    centerMessageFont = '50px Sans-Serif';
    sideFont = '20px Sans-Serif';

    constructor(canvas) {
        this.canvas = canvas;
        this.gameOverText = new UiText('GAME OVER', this.centerMessageFont, '#567567', Constants.TEXT_POSITION.CENTER);
    }

    drawGameOver(){
        this.drawText(this.gameOverText);
    }

    drawText(textObject) {
        this.canvas.drawText(textObject.text, textObject.font, textObject.color, textObject.position);
    }
}