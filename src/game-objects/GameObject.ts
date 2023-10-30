import { Container } from 'pixi.js';
import { World } from '../game/World';

export class GameObject extends Container {
	// protected texture: Texture; // Текстура объекта
	// protected sprite: Sprite; // Спрайт объекта
	world: World;

	constructor(world: World, x: number, y: number) {
		super();

		// this.texture = texture;
		// this.sprite = new Sprite(this.texture);

		this.world = world;
		this.position.set(x, y);
		this.pivot.set(0.5, 0.5);
	}
}
