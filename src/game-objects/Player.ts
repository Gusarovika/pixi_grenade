import { World } from '../game/World';
import { ObservablePoint, Texture, AnimatedSprite } from 'pixi.js';
import { Grenade } from './Grenade';
import { Aim } from './Aim';
import { Character } from './Character';
import { grenadeConfig, aimConfig, playerConfig } from '../gameConfig';

export class Player extends Character {
	private aim: Aim;

	constructor(world: World, x: number, y: number, scale: { x: number; y: number }) {
		super(world, x, y, scale); // Вызываем конструктор базового класса
		// this.scale.set(-0.18, 0.18);

		this.aim = new Aim(this.x, this.y, this.world, aimConfig.scale);
		this.setAim();
	}
	onPlayer() {
		console.log('PLAYER RECEIVED EVENT');
	}

	throwGrenade(
		position: ObservablePoint,
		power: number,
		texture: Texture,
		explosion: AnimatedSprite,
		damage: number
	) {
		const grenade = new Grenade(this.x, this.y, this.world, texture, damage, grenadeConfig.scale);

		this.world.createGameObject(grenade);

		const endPosition = grenade.launch(position, power, explosion);
		this.aim.position.set(endPosition.x, endPosition.y);
		this.toggleAim(true);
		// const aim = new Aim(this.x, this.y, thiss.world, aimConfig.scale);

		if (!this.world.gameObjects.includes(this.aim)) this.world.createGameObject(this.aim);
		console.log('throw grenade', this.world);

		this.switchAnimation(playerConfig.animations.throw, false);
	}

	setAim() {
		// this.aim = new Aim(this.x, this.y, this.world, Texture.from(Textures.Aim), aimConfig.scale);
		this.aim.alpha = 0;
		this.aim.zIndex = 1;
		// this.world.createGameObject(this.aim);
	}
	toggleAim(isActive: boolean): void {
		// const opacity = isActive ? 1 : 0;
		this.aim.isVisible = isActive;
	}
	override idle() {
		this.switchAnimation(playerConfig.animations.idle, true);
	}
}
