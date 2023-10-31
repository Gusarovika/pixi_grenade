import type { AssetsManifest } from 'pixi.js';

// prettier-ignore
export const manifest: AssetsManifest = {
	bundles: [
		{
			name: 'texture',
			assets: {
				"Player": 'player.png',
				"Enemy": 'enemy.png',
				"grenade": 'grenade.png',
				"Aim": 'cross.png',
				"floor": 'floor.png',
				"particle": 'particle.png',
				"progress_fill": 'ui/progress_fill.png',
				"progress_bg":'ui/progress_bg.png',
				"grenade1": 'grenade/image_part_001.png',
				"grenade2": 'grenade/image_part_002.png',
				"grenade3": 'grenade/image_part_003.png',
				"grenade4": 'grenade/image_part_004.png',
				"grenade5": 'grenade/image_part_005.png',
				"grenade6": 'grenade/image_part_006.png'

			},
		},
		{
			name: 'resource',
			assets: {
				'EnemyIdle': 'enemy/idle.json',
				'EnemyDeath': 'enemy/death.json',
				"PlayerJump": 'player/jump.json',
				'PlayerIdle': 'player/idle.json',
				'PlayerThrow': 'player/throw.json',
				'grenades': 'grenade/texture.json',
				"explosion1": 'explosion/mc.json',
				"explosion2": 'explosion/texture1.json',
				"explosion3": 'explosion/texture2.json',
				"explosion4": 'explosion/texture3.json',
				"explosion5": 'explosion/texture4.json',
				"explosion0": 'explosion/texture5.json'
			},
		},
	],
};
