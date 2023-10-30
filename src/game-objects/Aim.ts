import { World } from '../game/World';
import { Texture, Sprite } from 'pixi.js';
// import { Grenade } from './Grenade';
import { GameObject } from './GameObject';
// import Textures from './textures';

export class Aim extends GameObject {
	protected texture: Texture; // Текстура объекта
	protected sprite: Sprite; // Спрайт объекта
	// private throwPower: number = 0; // Сила броска
	// private grenades: Grenade[] = []; // Список брошенных гранат

	constructor(x: number, y: number, world: World, texture: Texture) {
		super(world, x, y); // Вызываем конструктор базового класса
		this.texture = texture;
		this.sprite = new Sprite(this.texture);
		this.sprite.anchor.set(0.5);
		this.position.set(x, y);
	}
}
