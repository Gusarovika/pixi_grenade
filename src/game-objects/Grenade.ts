import { Texture, Ticker, Sprite, ObservablePoint, AnimatedSprite } from 'pixi.js';
// import * as particles from '@pixi/particle-emitter';

import { GameObject } from './GameObject';
import { World } from '../game/World';
import { Tween, Group, Easing } from 'tweedle.js';
// import * as particleSettings from '../particle-emitters/emitter.json';

export class Grenade extends GameObject {
	// private landPosition: { x: number; y: number };
	protected texture: Texture; // Текстура объекта
	protected sprite: Sprite; // Спрайт объекта
	// private isThrown: boolean = false;
	public isExploded: boolean = false;
	private power: number = 0;
	public damage: number = 0;
	private explosionEffect?: AnimatedSprite; // Сделаем свойство необязательным
	// private stage: PIXI.Container;

	constructor(x: number, y: number, world: World, texture: Texture, damage: number, scale: { x: number; y: number }) {
		super(world, x, y, scale);
		this.texture = texture;
		this.sprite = new Sprite(this.texture);
		this.sprite.anchor.set(0.5);
		this.addChild(this.sprite);
		this.damage = damage;
		// this.position.set(x, y);
		this.scale.set(0.4, 0.4);
		// this.landPosition = landPosition;
		// this.stage = stage;
	}

	launch(targetPosition: ObservablePoint, power: number, explosion: AnimatedSprite): { x?: number; y?: number } {
		this.power = power;
		this.explosionEffect = explosion;

		const time = 1000;
		const landPosition = this.calculateGrenadeFinalPosition(
			this.x,
			this.y,
			targetPosition.x,
			targetPosition.y,
			this.power
		);
		if (!this.isExploded) {
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
				Group.shared.update();
			});
			throwAnimation.start();
			this.world.grenade = this;
		}
		return landPosition;
	}
	explode() {
		if (!this.isExploded) {
			// Воспроизвести визуальный эффект взрыва
			// const explosionContainer = new Container();
			// explosion.anchor.set(0.5);
			// explosionContainer.position.set(this.x, this.y);
			// this.parent.addChild(explosion);
			// // Удалить гранату
			this.world.eventManager.emit('explosion', 5);
			// this.stage.toggleUi(false);
			this.world.removeGameObject(this);
			// this.world.addChild(explosionContainer);
			// const upgradedConfig = particles.upgradeConfig(particleSettings, 'particle');

			// // const emitter = new particles.Emitter(explosionContainer, upgradedConfig);
			// const emitter = new particles.Emitter(explosionContainer, upgradedConfig);
			// emitter.autoUpdate = true; // If you keep it false, you have to update your particles yourself.
			this.world.explosionContainer.position.set(this.position.x, this.position.y);
			this.world.emitter.emit = true;
			this.world.emitter.autoUpdate = true;

			// emitter.playOnceAndDestroy();
			this.parent.removeChild(this);
			this.isExploded = true;
			this.setExplosionEffect();
			// this.world.eventManager.publish();
			// this.emit('explosion', this.power);
			// // Сгенерировать событие взрыва для дополнительных действий
			// explosion.emit('explosion');
		}
	}
	private setExplosionEffect() {
		if (this.explosionEffect) {
			// for (let i = 0; i < 50; i++) {
			// create an explosion AnimatedSprite

			this.explosionEffect.x = this.x;
			this.explosionEffect.y = this.y;
			this.explosionEffect.anchor.set(0.5);
			// this.explosionEffect.rotation = Math.random() * Math.PI;
			// this.explosionEffect.scale. set(0.75 + Math.random() * 0.5);
			this.explosionEffect.loop = false;
			this.explosionEffect.play();
			this.world.addChild(this.explosionEffect);
			this.explosionEffect.onComplete = () => {
				if (this.explosionEffect) {
					this.world.removeChild(this.explosionEffect);
					this.explosionEffect.destroy();
				}
			};
			// }
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
