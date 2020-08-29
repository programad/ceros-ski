import * as Constants from "../Constants";

export class Canvas {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    drawOffset = {
        x: 0,
        y: 0
    };
    ctx = null;

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createCanvas();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'skiCanvas';
        canvas.width = this.width * window.devicePixelRatio;
        canvas.height = this.height * window.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext('2d');
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);


        document.body.appendChild(canvas);
    }

    clearCanvas() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    setDrawOffset(x, y) {
        this.drawOffset.x = x;
        this.drawOffset.y = y;
    }

    drawImage(image, x, y, width, height) {
        x -= this.drawOffset.x;
        y -= this.drawOffset.y;

        this.ctx.drawImage(image, x, y, width, height);
    }

    measureUiText(text, font) {
        this.ctx.font = font;
        let measure = this.ctx.measureText(text);
        let fontSize = parseInt(this.ctx.font);
        
        return {
            width: measure.width,
            height: fontSize
        }
    }

    drawOverlay(){
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawText(text, font, color, position, number, screenHeight) {
        let align = 'center';
        this.ctx.font = font;
        this.ctx.textBaseline = 'middle';
        let fontSize = parseInt(this.ctx.font);

        let posX = (this.width / 2);
        let posY = (this.height / 2) - (number * (screenHeight/2));

        switch (position) {
            case Constants.TEXT_POSITION.CENTER:
                break;
            case Constants.TEXT_POSITION.RIGHT_TOP:
                align = 'right';
                posX = this.width - Constants.CANVAS_PADDING;
                posY = number * screenHeight / (screenHeight / fontSize);
                break;
            default:
                break;
        }

        this.ctx.textAlign = align;
        this.ctx.fillStyle = color;

        this.ctx.fillText(text, posX, posY);
    }
}