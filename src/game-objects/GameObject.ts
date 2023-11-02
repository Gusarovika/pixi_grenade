import { Container } from 'pixi.js';
import { World } from '../game/World';

export class GameObject extends Container {
	world: World;

	constructor(world: World, x: number, y: number, scale: { x: number; y: number }) {
		super();

		this.world = world;
		this.position.set(x, y);
		this.pivot.set(0.5, 0.5);
		this.scale.set(scale.x, scale.y);
	}
}
