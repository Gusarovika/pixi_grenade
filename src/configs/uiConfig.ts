import { GAME_WIDTH, GAME_HEIGHT } from './gameConfig';
import { TextStyle } from 'pixi.js';

// Configuration for grenades
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
];

export type GrenadeType = (typeof GRENADE_TYPES)[number];

// Configuration for tutor
export const tutorConfig = {
	textColor: '#00ff99',
	tutorialX: GAME_WIDTH / 2,
	tutorialY: GAME_HEIGHT * 0.1,
	style: new TextStyle({
		fontFamily: 'Tahoma',
		fontSize: 25,
		fontStyle: 'normal',
		fontWeight: 'bold',
		fill: ['ffffff'],
		letterSpacing: 8,
		lineJoin: 'round',
		miterLimit: 1,
		stroke: '#000000',
		strokeThickness: 6,
		dropShadow: true,
		dropShadowAlpha: 0.3,
		dropShadowColor: '#000000',
		dropShadowBlur: 2,
	}),
	tap: 'Tap and hold the greande',
	win: 'YOU WIN!',
	loose: 'YOU LOOSE :(',
	hold: 'Hold to power up',
	power: 'power: ',
};

// Configuration for uiScreen
export const uiConfig = {
	grenadeTypes: GRENADE_TYPES,
	maxPower: 100,
	grenadesX: GAME_WIDTH * 0.5,
	grenadesY: GAME_HEIGHT * 0.85,
};
