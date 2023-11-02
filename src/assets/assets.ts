import type { AssetsManifest } from 'pixi.js';

// prettier-ignore
export const manifest: AssetsManifest = {
	bundles: [
		{
			name: 'texture',
			assets: {
				
			
				"aim": 'aim.png',
				"particle": 'particle.png',
				"progress_fill": 'ui/progress_fill.png',
				"progress_bg":'ui/progress_bg.png',
				"grenade1": 'grenade/image_part_001.png',
				"grenade2": 'grenade/image_part_002.png',
				"grenade3": 'grenade/image_part_003.png',
				"grenade4": 'grenade/image_part_004.png',
				"grenade5": 'grenade/image_part_005.png',
				"grenade6": 'grenade/image_part_006.png',
				"border": "border.png",
				"tile": "background/tile.png",
				"tile2": "background/tile_border.png",
				"tile_left": "background/tile_left.png",
				"tile_right": "background/tile_right.png"


			},
		},
		{
			name: 'resource',
			assets: {
				'EnemyIdle': 'enemy/idle.json',
				'EnemyDeath': 'enemy/death.json',
				'EnemyHit': 'enemy/hit.json',

				"PlayerTaunt": 'player/taunt.json',
				"EnemyTaunt": 'enemy/taunt.json',
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
