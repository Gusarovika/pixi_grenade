/** Constants for the types of grenades. */
const GRENADE_TYPES = [
	{
		name: 'grenade1',
		texture: 'grenade1',
		power: 10,
		damage: 20,
	},
	{
		name: 'grenade2',
		texture: 'grenade2',
		power: 10,
		damage: 25,
	},
	{
		name: 'grenade3',
		texture: 'grenade3',
		power: 10,
		damage: 25,
	},
	{
		name: 'grenade4',
		texture: 'grenade4',
		power: 10,
		damage: 25,
	},
	{
		name: 'grenade5',
		texture: 'grenade5',
		power: 10,
		damage: 25,
	},
	{
		name: 'grenade6',
		texture: 'grenade6',
		power: 10,
		damage: 25,
	},
	// Добавьте данные о других гранатах
];

/** Type aliases for grenade types. */
export type GrenadeType = (typeof GRENADE_TYPES)[number];

/** Object to store all configuration values for grenades. */
export const uiConfig = {
	grenadeTypes: GRENADE_TYPES,
};
