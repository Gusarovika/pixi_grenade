// Configuration for game
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 800;
export const backgroundColor = 0x6495ed;

// Configuration for player
export const playerConfig = {
	scale: { x: -0.3, y: 0.3 },

	animations: {
		idle: 'PlayerIdle',
		taunt: 'PlayerTaunt',
		throw: 'PlayerThrow',
	},
};

// Configuration for enemy
export const enemyConfig = {
	scale: { x: 0.3, y: 0.3 },

	animations: {
		idle: 'EnemyIdle',
		death: 'EnemyDeath',
		hit: 'EnemyHit',
		taunt: 'EnemyTaunt',
	},
};
// Configuration for progressbar
export const progressBarConfig = {
	bg: 'progress_bg',
	fill: 'progress_fill',
	initProgress: 100,
	position: { x: 100, y: -280 },
	scale: { x: 1, y: 1 },
};

// Configuration for grenade
export const grenadeConfig = {
	scale: { x: 0.25, y: 0.25 },
};

// Configuration for aim
export const aimConfig = {
	image: 'aim',
	scale: { x: 0.5, y: 0.5 },
};

export const borderConfig = {
	border: 'border',

	borderUp: {
		position: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.33 },
		scale: { x: 0.4, y: 0.4 },
	},
	borderDown: {
		position: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.6 },
		scale: { x: 0.4, y: 0.4 },
	},
};
// Configuration for world objects
export const worldConfig = {
	tile: 'tile',
	tile2: 'tile2',
	leftTile: 'tile_left',
	rightTile: 'tile_right',

	floorPosition: { x: GAME_WIDTH * 0.1, y: GAME_HEIGHT * 0.2 },
	floorScale: { x: 1.2, y: 1.2 },

	playerPosition: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.65 },
	enemyPosition: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.3 },
};
