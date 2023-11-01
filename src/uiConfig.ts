/** Constants for the types of grenades. */
import { GAME_WIDTH, GAME_HEIGHT } from './gameConfig';
const GRENADE_TYPES = [
	{
		name: 'grenade1',
		texture: 'grenade1',
		power: 0,
		damage: 15,
	},
	{
		name: 'grenade2',
		texture: 'grenade2',
		power: 0,
		damage: 25,
	},
	{
		name: 'grenade3',
		texture: 'grenade3',
		power: 0,
		damage: 35,
	},
	{
		name: 'grenade4',
		texture: 'grenade4',
		power: 0,
		damage: 30,
	},
	{
		name: 'grenade5',
		texture: 'grenade5',
		power: 0,
		damage: 35,
	},
	{
		name: 'grenade6',
		texture: 'grenade6',
		power: 0,
		damage: 35,
	},
	// Добавьте данные о других гранатах
];

/** Type aliases for grenade types. */
export type GrenadeType = (typeof GRENADE_TYPES)[number];

const tutorConfig = {
	textColor: '#00ff99', // Text color (white)
	tutorialX: GAME_WIDTH / 2, // X-coordinate for tutorial text
	tutorialY: GAME_HEIGHT * 0.1,
	style: {
		fontFamily: 'Arial',
		fontSize: 36,
		fontStyle: 'italic',
		fontWeight: 'bold',
		fill: ['#ffffff', '#00ff99'], // gradient
		stroke: '#4a1850',
		strokeThickness: 5,
		dropShadow: true,
		dropShadowColor: '#000000',
		dropShadowBlur: 4,
	},
};

/** Object to store all configuration values for grenades. */
export const uiConfig = {
	grenadeTypes: GRENADE_TYPES,
	maxPower: 100,
	tutor: tutorConfig,
	grenadesX: GAME_WIDTH * 0.5,
	grenadesY: GAME_HEIGHT * 0.85,
};
