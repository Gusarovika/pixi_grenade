import { Texture } from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import { World } from '../game/World';
import { worldConfig } from '../configs/gameConfig';
export class Background {
	private world: World;

	private numColumns: number;
	private numRows: number;
	private x: number;
	private y: number;

	constructor(world: World, numColumns: number, numRows: number, x: number, y: number) {
		this.world = world;
		this.numColumns = numColumns;
		this.numRows = numRows;
		this.x = x;
		this.y = y;
		this.init();
	}

	// Private methods region

	//Initialize the background by creating and positioning tiles.
	private init(): void {
		const tile = Texture.from(worldConfig.tile);
		const tile2 = Texture.from(worldConfig.tile2);
		const leftTile = Texture.from(worldConfig.leftTile);
		const rightTile = Texture.from(worldConfig.rightTile);

		const tilemap = new CompositeTilemap();
		tilemap.scale.set(0.2, 0.2);
		tilemap.x = this.x;
		tilemap.y = this.y;

		for (let i = 0; i < this.numColumns; i++) {
			for (let j = 0; j < this.numRows; j++) {
				// Calculate the horizontal offset for every other row to create a staggered pattern.
				const offsetX = j % 2 === 0 ? tile.width / 2 : 0;

				// Place the main tile.
				tilemap.tile(tile, i * tile.width + offsetX, (j * tile.height) / 2);

				if (i === 0 && j % 2 === 0 && j !== 0) {
					// Add the left tile to create a continuous pattern at the left edge.
					tilemap.tile(leftTile, i * tile.width, (j * tile.height) / 2);
				}

				if (i === this.numColumns - 1 && j % 2 !== 0) {
					// Add the right tile to create a continuous pattern at the right edge.
					tilemap.tile(rightTile, i * tile.width + tile.width, (j * tile.height) / 2);
				}

				if (j === this.numRows - 1) {
					// Add the bottom tile to complete the pattern at the bottom.
					tilemap.tile(tile2, i * tile.width, (j * tile.height) / 2 + tile.height / 2);
				}
			}
		}

		this.world.addChild(tilemap);
	}

	// endregion
}
