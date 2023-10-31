/** Configuration for the player character. */
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 800;
export const backgroundColor = 0x6495ed;

export const playerConfig = {
	// Player's initial position
	initialPosition: { x: 100, y: 400 },

	// Player's scale
	scale: { x: -0.18, y: 0.18 },

	// Player's animations
	animations: {
		idle: 'PlayerIdle',
		jump: 'PlayerJump',
		throw: 'PlayerThrow',
	},
};

/** Configuration for enemy characters. */
export const enemyConfig = {
	// Enemy's initial position
	initialPosition: { x: 500, y: 400 },

	// Enemy's scale
	scale: { x: 0.15, y: 0.15 },

	// Enemy's animations
	animations: {
		idle: 'EnemyIdle',
		death: 'EnemyDeath',
	},
};

export const progressBarConfig = {
	bg: 'progress_bg',
	fill: 'progress_fill',
	initProgress: 100,
	position: { x: -200, y: -400 },
	scale: { x: 4, y: 4 },
};

export const grenadeConfig = {
	scale: { x: 0.3, y: 0.3 },
};

export const aimConfig = {
	image: 'Aim',
	scale: { x: 0.3, y: 0.3 },
};
export const worldConfig = {
	floor: 'floor',
	floorPosition: { x: GAME_WIDTH / 2, y: GAME_HEIGHT * 0.9 },
	floorScale: { x: 1.2, y: 1.2 },
	playerPosition: { x: GAME_WIDTH * 0.7, y: GAME_HEIGHT * 0.5 },
	enemyPosition: { x: GAME_WIDTH * 0.35, y: GAME_HEIGHT * 0.46 },
};
