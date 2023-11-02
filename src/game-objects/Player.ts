import { World } from '../game/World';
import { ObservablePoint, Texture, AnimatedSprite } from 'pixi.js';
import { Grenade } from './Grenade';
import { Aim } from './Aim';
import { Character } from './Character';
import { grenadeConfig, aimConfig, playerConfig } from '../configs/gameConfig';

export class Player extends Character {
	public aim: Aim;
	public grenade: Grenade | null = null;

	constructor(world: World, x: number, y: number, scale: { x: number; y: number }) {
		super(world, x, y, scale);
		this.aim = new Aim(this.x, this.y, this.world, aimConfig.scale);
		this.aim.alpha = 0;
	}

	// Public methods region
	public getGrenade(texture: Texture): void {
		this.grenade = new Grenade(this.x, this.y, this.world, texture, 0, grenadeConfig.scale);

		this.world.createGameObject(this.grenade);
	}

	public throwGrenade(
		position: ObservablePoint,
		params: { power: number; explosion: AnimatedSprite; damage: number }
	): void {
		if (this.grenade) {
			this.grenade.damage = params.damage;
			const endPosition = this.grenade.launch(position, params.power, params.explosion);
			this.aim.position.set(endPosition.x, endPosition.y);
			this.toggleAim(true);
			if (!this.world.gameObjects.includes(this.aim)) this.world.createGameObject(this.aim);
		}

		this.switchAnimation(playerConfig.animations.throw, false);
	}

	public toggleAim(isActive: boolean): void {
		this.aim.isVisible = isActive;
	}

	public override idle(): void {
		this.switchAnimation(playerConfig.animations.idle, true);
	}
	// endregion
}
