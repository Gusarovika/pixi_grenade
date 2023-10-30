import type { ResolverManifest } from 'pixi.js';

// prettier-ignore
export const manifest: ResolverManifest = {
	bundles: [
		{
			name: 'texture',
			assets: {
				"Player": 'player.png',
				"Enemy": 'enemy.png',
				"Grenade": 'grenade.png',
				"Aim": 'cross.png',
				"floor": 'floor.png',
			},
		},
		{
			name: 'resource',
			assets: {
				'EnemyIdle': 'enemy/idle.json',
				'PlayerIdle': 'player/idle.json',
				'PlayerThrow': 'player/throw.json',
			},
		},
	],
};
