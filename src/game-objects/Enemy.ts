import { enemyConfig } from '../configs/gameConfig';
import { Ticker } from 'pixi.js';
import { World } from '../game/World';
import { Character } from './Character';
import { ProgressBar } from '@pixi/ui';
import { progressBarConfig } from '../configs/gameConfig';

const config = progressBarConfig;

export class Enemy extends Character {
	healthBar: ProgressBar;

	constructor(world: World, x: number, y: number, scale: { x: number; y: number }) {
		super(world, x, y, scale);
		this.healthBar = new ProgressBar({ bg: config.bg, fill: config.fill, progress: config.initProgress });
		this.healthBar.scale.set(config.scale.x, config.scale.y);
		this.healthBar.y = this.x + config.position.y;
		this.healthBar.x = this.y + config.position.x;

		this.world.addChild(this.healthBar);
		this.healthBar.progress = config.initProgress;
	}

	// public methods region
	// toggle the health bar when the enemy is damaged.
	public toggleHealthBar(damage: number): number {
		const ticker = new Ticker();
		ticker.add(() => {
			this.healthBar.progress -= 1;
			damage -= 1;
			if (damage <= 0) {
				ticker.stop();
			}
		});
		ticker.start();

		return this.healthBar.progress - damage;
	}

	// Override of the idle method for the enemy character.
	public override idle(): void {
		this.switchAnimation(enemyConfig.animations.idle, true);
	}
	//endregion
}
