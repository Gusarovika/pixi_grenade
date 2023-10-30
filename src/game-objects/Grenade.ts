import { Texture, Ticker, Sprite } from 'pixi.js';
import { GameObject } from './GameObject';
import { World } from '../game/World';
import { Tween, Group, Easing } from 'tweedle.js';

export class Grenade extends GameObject {
	private landPosition: { x: number; y: number };
	protected texture: Texture; // Текстура объекта
	protected sprite: Sprite; // Спрайт объекта
	// private isThrown: boolean = false;
	public isExploded: boolean = false;
	// private stage: PIXI.Container;

	constructor(x: number, y: number, landPosition: { x: number; y: number }, world: World, texture: Texture) {
		super(world, x, y);
		this.texture = texture;
		this.sprite = new Sprite(this.texture);
		this.sprite.anchor.set(0.5);
		this.addChild(this.sprite);
		// this.position.set(x, y);
		this.scale.set(0.4, 0.4);
		this.landPosition = landPosition;
		// this.stage = stage;
	}

	launch() {
		if (!this.isExploded) {
			const time = 1000;
			// console.log('grenade thrown', this.throwPower, this.x, this.y);
			const distance = Math.sqrt((this.landPosition.x - this.x) ** 2 + (this.landPosition.y - this.y) ** 2);
			const moveYTween = new Tween(this)
				.to({ y: this.y - distance }, time / 2)
				.easing(Easing.Cubic.Out)
				.start();
			moveYTween.onComplete(() => {
				new Tween(this)
					.to({ y: this.landPosition.y }, time / 2)
					.easing(Easing.Cubic.In)
					.start();
				// throwAnimation.stop();
			});

			const moveXTween = new Tween(this)
				.to({ x: this.landPosition.x, angle: 360 }, time)
				// .easing(Easing.Quadratic.In)
				.start();
			moveXTween.onComplete(() => {
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
			// const explosion = new PIXI.Sprite(PIXI.Texture.from('путь_к_изображению_взрыва.png'));
			// explosion.anchor.set(0.5);
			// explosion.position.set(this.x, this.y);
			// this.parent.addChild(explosion);
			// // Удалить гранату
			console.log('EXPLODION', this.world);
			this.world.eventManager.emit('explosion', 5);
			// this.stage.toggleUi(false);
			this.world.removeGameObject(this);
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
}
