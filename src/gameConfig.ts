/** Configuration for the player character. */
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 800;
export const backgroundColor = 0x6495ed;

export const playerConfig = {
	// Player's scale
	scale: { x: -0.3, y: 0.3 },

	// Player's animations
	animations: {
		idle: 'PlayerIdle',
		taunt: 'PlayerTaunt',
		throw: 'PlayerThrow',
	},
};

/** Configuration for enemy characters. */
export const enemyConfig = {
	// Enemy's scale
	scale: { x: 0.3, y: 0.3 },

	// Enemy's animations
	animations: {
		idle: 'EnemyIdle',
		death: 'EnemyDeath',
		hit: 'EnemyHit',
	},
};

export const progressBarConfig = {
	bg: 'progress_bg',
	fill: 'progress_fill',
	initProgress: 100,
	position: { x: -100, y: -350 },
	scale: { x: 3, y: 3 },
};

export const grenadeConfig = {
	scale: { x: 0.25, y: 0.25 },
};

export const aimConfig = {
	image: 'Aim',
	scale: { x: 0.5, y: 0.5 },
};

export const worldConfig = {
	tile: 'tile',
	tile2: 'tile2',
	leftTile: 'tile_left',
	rightTile: 'tile_right',

	floor: 'floor',
	floorPosition: { x: GAME_WIDTH * 0.1, y: GAME_HEIGHT * 0.2 },
	floorScale: { x: 1.2, y: 1.2 },
	border: 'border',

	borderUp: {
		position: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.33 },
		scale: { x: 0.4, y: 0.4 },
	},
	borderDown: {
		position: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.6 },
		scale: { x: 0.4, y: 0.4 },
	},
	playerPosition: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.65 },
	enemyPosition: { x: GAME_WIDTH * 0.5, y: GAME_HEIGHT * 0.3 },
};
