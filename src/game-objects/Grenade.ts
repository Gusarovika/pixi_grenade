import { Texture, Ticker, Sprite, ParticleContainer, ObservablePoint } from 'pixi.js';
import * as particles from '@pixi/particle-emitter';

import { GameObject } from './GameObject';
import { World } from '../game/World';
import { Tween, Group, Easing } from 'tweedle.js';
import * as particleSettings from '../emitter.json';

export class Grenade extends GameObject {
	// private landPosition: { x: number; y: number };
	protected texture: Texture; // Текстура объекта
	protected sprite: Sprite; // Спрайт объекта
	// private isThrown: boolean = false;
	public isExploded: boolean = false;
	private power: number = 0;
	// private stage: PIXI.Container;

	constructor(x: number, y: number, world: World, texture: Texture) {
		super(world, x, y);
		this.texture = texture;
		this.sprite = new Sprite(this.texture);
		this.sprite.anchor.set(0.5);
		this.addChild(this.sprite);
		// this.position.set(x, y);
		this.scale.set(0.4, 0.4);
		// this.landPosition = landPosition;
		// this.stage = stage;
	}

	launch(targetPosition: ObservablePoint, power: number) {
		this.power = power;
		if (!this.isExploded) {
			const time = 1000;
			const landPosition = this.calculateGrenadeFinalPosition(
				this.x,
				this.y,
				targetPosition.x,
				targetPosition.y,
				this.power
			);
			const distance = Math.sqrt((landPosition.x - this.x) ** 2 + (landPosition.y - this.y) ** 2);
			const moveYTween = new Tween(this)
				.to({ y: this.y - distance }, time / 2)
				.easing(Easing.Cubic.Out)
				.start();
			moveYTween.onComplete(() => {
				new Tween(this)
					.to({ y: landPosition.y }, time / 2)
					.easing(Easing.Cubic.In)
					.start();
			});

			const moveXTween = new Tween(this).to({ x: landPosition.x, angle: 360 }, time * 1.01).start();
			moveXTween.onComplete(() => {
				console.log('Explosion', this.x, this.y, landPosition.x, landPosition.y);

				this.explode();
			});

			const throwAnimation = new Ticker();
			throwAnimation.add(() => {
				// console.log('update', this.y);

				Group.shared.update();
			});
			throwAnimation.start();
			this.world.grenade = this;
		}
	}
	explode() {
		if (!this.isExploded) {
			// Воспроизвести визуальный эффект взрыва
			const explosionContainer = new ParticleContainer();
			// explosion.anchor.set(0.5);
			explosionContainer.position.set(this.x, this.y);
			// this.parent.addChild(explosion);
			// // Удалить гранату
			this.world.eventManager.emit('explosion', 5);
			// this.stage.toggleUi(false);
			this.world.removeGameObject(this);
			this.world.addChild(explosionContainer);
			const upgradedConfig = particles.upgradeConfig(particleSettings, 'particle');

			const emitter = new particles.Emitter(explosionContainer, upgradedConfig);
			emitter.autoUpdate = true; // If you keep it false, you have to update your particles yourself.
			emitter.updateSpawnPos(10, 0);
			emitter.emit = true;
			this.parent.removeChild(this);
			this.isExploded = true;
			// this.world.eventManager.publish();
			// this.emit('explosion', this.power);
			// // Сгенерировать событие взрыва для дополнительных действий
			// explosion.emit('explosion');
		}
	}

	update() {
		// Дополнительные обновления состояния гранаты, если необходимо
	}

	private calculateGrenadeFinalPosition(
		startX: number,
		startY: number,
		targetX: number,
		targetY: number,
		throwPower: number
	): { x: number; y: number } {
		const deltaX = targetX - startX;
		const deltaY = targetY - startY;

		// Расчет угла между игроком и врагом
		const throwAngle = Math.atan2(deltaY, deltaX);

		// Финальные координаты гранаты
		const finalX = startX + throwPower * Math.cos(throwAngle);
		const finalY = startY + throwPower * Math.sin(throwAngle);

		return { x: finalX, y: finalY };
	}
}
