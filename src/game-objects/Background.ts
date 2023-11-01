import { Texture } from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import { World } from '../game/World';

export class Background {
	private world: World;
	private textures: Texture[];
	private numColumns: number;
	private numRows: number;
	private x: number;
	private y: number;

	constructor(world: World, textures: Texture[], numColumns: number, numRows: number, x: number, y: number) {
		this.world = world;
		this.textures = textures;
		this.numColumns = numColumns;
		this.numRows = numRows;
		this.x = x;
		this.y = y;
		this.init();
	}

	private init() {
		const tile = this.textures[0];
		const tile2 = this.textures[1];
		const leftTile = this.textures[2];
		const rightTile = this.textures[3];

		const tilemap = new CompositeTilemap();
		tilemap.scale.set(0.2, 0.2);
		tilemap.x = this.x;
		tilemap.y = this.y;

		for (let i = 0; i < this.numColumns; i++) {
			let j = 0;
			for (j = 0; j < this.numRows; j++) {
				const offsetX = j % 2 === 0 ? tile.width / 2 : 0;
				console.log(i, offsetX, i * tile.width - offsetX, (j * tile.height) / 2);
				tilemap.tile(tile, i * tile.width + offsetX, (j * tile.height) / 2);
				if (i === 0 && j % 2 === 0 && j !== 0) {
					tilemap.tile(leftTile, i * tile.width, (j * tile.height) / 2);
				}
				if (i === this.numColumns - 1 && j % 2 !== 0) {
					tilemap.tile(rightTile, i * tile.width + tile.width, (j * tile.height) / 2);
				}
				if (j === this.numRows - 1) {
					tilemap.tile(tile2, i * tile.width, (j * tile.height) / 2 + tile.height / 2);
				}
			}
		}

		this.world.addChild(tilemap);
	}
}
