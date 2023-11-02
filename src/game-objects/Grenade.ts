import { Texture, Ticker, Sprite, ObservablePoint, AnimatedSprite } from 'pixi.js';
import { GameObject } from './GameObject';
import { World } from '../game/World';
import { Tween, Group, Easing } from 'tweedle.js';

export class Grenade extends GameObject {
	protected texture: Texture;
	protected sprite: Sprite;
	public isExploded: boolean = false;
	private power: number = 0;
	public damage: number = 0;
	private explosionEffect?: AnimatedSprite;

	constructor(x: number, y: number, world: World, texture: Texture, damage: number, scale: { x: number; y: number }) {
		super(world, x, y, scale);
		this.texture = texture;
		this.sprite = new Sprite(this.texture);
		this.sprite.anchor.set(0.5);
		this.addChild(this.sprite);
		this.damage = damage;
	}

	// Private methods region
	private calculateGrenadeFinalPosition(
		startX: number,
		startY: number,
		targetX: number,
		targetY: number,
		throwPower: number
	): { x: number; y: number } {
		const deltaX = targetX - startX;
		const deltaY = targetY - startY;

		// Calculate the angle between the player and the enemy
		const throwAngle = Math.atan2(deltaY, deltaX);

		// Final grenade coordinates
		const finalX = startX + throwPower * Math.cos(throwAngle);
		const finalY = startY + throwPower * Math.sin(throwAngle);
		console.log(targetX, targetY, finalX, finalY, throwPower);

		return { x: finalX, y: finalY };
	}

	private setExplosionEffect(): void {
		if (this.explosionEffect) {
			this.explosionEffect.x = this.x;
			this.explosionEffect.y = this.y;
			this.explosionEffect.anchor.set(0.5);
			this.explosionEffect.loop = false;
			this.explosionEffect.play();
			this.world.addChild(this.explosionEffect);
			this.explosionEffect.onComplete = () => {
				if (this.explosionEffect) {
					this.world.removeChild(this.explosionEffect);
					this.explosionEffect.destroy();
				}
			};
		}
	}
	// End of private methods region

	// Public methods region
	public launch(
		targetPosition: ObservablePoint,
		power: number,
		explosion: AnimatedSprite
	): { x?: number; y?: number } {
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
				.to({ x: this.x - distance }, time / 3)
				.easing(Easing.Cubic.Out)
				.start();
			moveYTween.onComplete(() => {
				new Tween(this)
					.to({ x: this.x + distance }, (time * 2) / 3)
					.easing(Easing.Cubic.In)
					.start();
			});

			const moveXTween = new Tween(this)
				.to({ y: landPosition.y, angle: 360 }, time * 1.01)
				.easing(Easing.Cubic.Out)
				.start();
			moveXTween.onComplete(() => {
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

	public explode(): void {
		if (!this.isExploded) {
			this.world.eventManager.emit('explosion', 5);
			this.world.removeGameObject(this);

			this.world.explosionContainer.position.set(this.position.x, this.position.y);
			this.world.emitter.emit = true;
			this.world.emitter.autoUpdate = true;

			this.parent.removeChild(this);
			this.isExploded = true;
			this.setExplosionEffect();
		}
	}
	// endregion
}
