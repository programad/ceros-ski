import 'babel-polyfill';
import 'jest-canvas-mock';
import * as Constants from '../Constants';
import { Canvas } from "../Core/Canvas";

let canvasWidth = 1920;
let canvasHeight = 1080;
let font1 = '10px Sans-Serif';

let canvas;

beforeEach(() => {
    canvas = new Canvas(canvasWidth, canvasHeight);
});

describe('canvas tests', () => {
    describe('on initializing', () => {
        test('should be defined', () => {
            expect(canvas).toBeDefined();
            expect(canvas.width).toEqual(canvasWidth);
            expect(canvas.height).toEqual(canvasHeight);
        });

        test('should clear the canvas', () => {
            canvas.ctx.clearRect = jest.fn();

            canvas.clearCanvas();

            expect(canvas.ctx.clearRect).toBeCalled();
        });

        test('should set the draw offset', () => {

            canvas.setDrawOffset(10, 20);

            expect(canvas.drawOffset.x).toEqual(10);
            expect(canvas.drawOffset.y).toEqual(20);
        });

        test('should draw image', () => {
            canvas.ctx.drawImage = jest.fn();
            canvas.setDrawOffset(10, 20);

            canvas.drawImage('img/skier_crash.png', 0, 0, 30, 40)

            expect(canvas.ctx.drawImage).toBeCalled();
        });

        test('should measure a text', () => {

            let textSize = canvas.measureUiText('12345', font1);

            expect(textSize.width).toBeGreaterThan(0);
            expect(textSize.height).toBeGreaterThan(0);
        });

        test('should draw an overlay', () => {
            canvas.ctx.fillRect = jest.fn();
            canvas.drawOverlay();

            expect(canvas.ctx.fillRect).toBeCalled();
        });

        test('should draw a text on the top left', () => {
            canvas.ctx.fillText = jest.fn();

            canvas.drawText('test', font1, '#000000', Constants.TEXT_POSITION.LEFT_TOP, 1, 10);

            expect(canvas.ctx.fillText).toHaveBeenCalledWith('test', 10, 10);
        });

        test('should draw a text on the center', () => {
            canvas.ctx.fillText = jest.fn();

            canvas.drawText('test', font1, '#000000', Constants.TEXT_POSITION.CENTER, 1, 10);

            expect(canvas.ctx.fillText).toHaveBeenCalledWith('test', 960, 535);
        });

        test('should draw a text on top right', () => {
            canvas.ctx.fillText = jest.fn();

            canvas.drawText('test', font1, '#000000', Constants.TEXT_POSITION.RIGHT_TOP, 1, 10);

            expect(canvas.ctx.fillText).toHaveBeenCalledWith('test', 1910, 10);
        });

        test('should draw a text on bottom left', () => {
            canvas.ctx.fillText = jest.fn();

            canvas.drawText('test', font1, '#000000', Constants.TEXT_POSITION.LEFT_BOTTOM, 1, 10);

            expect(canvas.ctx.fillText).toHaveBeenCalledWith('test', 10, 1070);
        });
    });
});