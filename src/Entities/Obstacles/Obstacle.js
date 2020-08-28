import * as Constants from '../../Constants';
import { Entity } from '../Entity';
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.TREE,
    Constants.TREE_CLUSTER,
    Constants.ROCK1,
    Constants.ROCK2,
    Constants.RAMP
];

export class Obstacle extends Entity {
    constructor(x, y, canBeRamp) {
        super(x, y);

        let assetIdx = randomInt(0, assetTypes.length - 2);

        if (canBeRamp) {
            assetIdx = randomInt(0, assetTypes.length - 1);
        }

        this.assetName = assetTypes[assetIdx];
    }
}