export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;
export const CANVAS_PADDING = 10;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';

export const SKIER_JUMP_START = 'skierJumpStart';
export const SKIER_JUMP_CLIMAX = 'skierJumpClimax';
export const SKIER_JUMP_ROLL = 'skierJumpRoll';
export const SKIER_JUMP_ALMOST = 'skierJumpAlmost';
export const SKIER_JUMP_LANDING = 'skierJumpLanding';

export const RHINO_DEFAULT = 'rhinoDefault';
export const RHINO_RUN_LEFT = 'rhinoRunLeft';
export const RHINO_RUN_LEFT_2 = 'rhinoRunLeft2';
export const RHINO_RUN_RIGHT = 'rhinoRunRight';
export const RHINO_RUN_RIGHT_2 = 'rhinoRunRight2';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_LIFT_MOUTH_OPEN = 'rhinoLiftMouthOpen';
export const RHINO_LIFT_EAT_1 = 'rhinoLiftEat1';
export const RHINO_LIFT_EAT_2 = 'rhinoLiftEat2';
export const RHINO_LIFT_EAT_3 = 'rhinoLiftEat3';
export const RHINO_LIFT_EAT_4 = 'rhinoLiftEat4';

export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';

export const RAMP = 'ramp';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_FACTOR = 1.1;
export const SKIER_JUMP_FACTOR = 1.003;

export const RHINO_STARTING_SPEED = 10.5;
export const RHINO_STARTING_NUMBER = 500;
export const RHINO_STARTING_DISTANCE = 200;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP_START]: 'img/skier_jump_1.png',
    [SKIER_JUMP_CLIMAX]: 'img/skier_jump_2.png',
    [SKIER_JUMP_ROLL]: 'img/skier_jump_3.png',
    [SKIER_JUMP_ALMOST]: 'img/skier_jump_4.png',
    [SKIER_JUMP_LANDING]: 'img/skier_jump_5.png',

    [RHINO_DEFAULT]: 'img/rhino_default.png',
    [RHINO_RUN_LEFT]: 'img/rhino_run_left.png',
    [RHINO_RUN_LEFT_2]: 'img/rhino_run_left_2.png',
    [RHINO_RUN_RIGHT]: 'img/rhino_run_right.png',
    [RHINO_RUN_RIGHT_2]: 'img/rhino_run_right_2.png',
    [RHINO_LIFT]: 'img/rhino_lift.png',
    [RHINO_LIFT_MOUTH_OPEN]: 'img/rhino_lift_mouth_open.png',
    [RHINO_LIFT_EAT_1]: 'img/rhino_lift_eat_1.png',
    [RHINO_LIFT_EAT_2]: 'img/rhino_lift_eat_2.png',
    [RHINO_LIFT_EAT_3]: 'img/rhino_lift_eat_3.png',
    [RHINO_LIFT_EAT_4]: 'img/rhino_lift_eat_4.png',

    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1]: 'img/rock_1.png',
    [ROCK2]: 'img/rock_2.png',
    [RAMP]: 'img/jump_ramp.png'
};

export const CHARACTER_DIRECTIONS = {
    CRASH: 0,
    LEFT: 1,
    LEFT_DOWN: 2,
    DOWN: 3,
    RIGHT_DOWN: 4,
    RIGHT: 5
};

export const SKIER_DIRECTION_ASSET = {
    [CHARACTER_DIRECTIONS.CRASH]: SKIER_CRASH,
    [CHARACTER_DIRECTIONS.LEFT]: SKIER_LEFT,
    [CHARACTER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
    [CHARACTER_DIRECTIONS.DOWN]: SKIER_DOWN,
    [CHARACTER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
    [CHARACTER_DIRECTIONS.RIGHT]: SKIER_RIGHT
};

export const KEYS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACEBAR: 32,
    ENTER: 13
};

export const GAME_STATE = {
    RUNNING: 0,
    PAUSED: 1,
    OVER: 2
};

export const TEXT_POSITION = {
    CENTER: 0,
    CENTER_TOP: 1,
    CENTER_BOTTOM: 2,
    LEFT: 3,
    LEFT_TOP: 4,
    LEFT_BOTTOM: 5,
    RIGHT: 6,
    RIGHT_TOP: 7,
    RIGHT_BOTTOM: 8
}