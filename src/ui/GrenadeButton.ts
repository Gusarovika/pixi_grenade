import { Texture, Ticker, Sprite, AnimatedSprite, ObservablePoint, Container } from 'pixi.js';
import { UIManager } from '../managers/UIManager';
import { Tween, Easing, Group } from 'tweedle.js';

export class GrenadeButton extends Container {
	protected isOver: boolean = false;

	private _isSelected: boolean = false;
	private _isBlocked: boolean = false;
	private scaleTween: Tween<ObservablePoint>;

	public power: number = 0;
	public isUsed: boolean = false;
	public sprite: Sprite;
	public maxPower: number = 0;
	public damage: number = 0;
	public explosionEffect: AnimatedSprite;
	public get isSelected() {
		return this._isSelected;
	}
	public set isSelected(value) {
		if (value !== this._isSelected) {
			this._isSelected = value;
			const group = new Group();
			group.add(this.scaleTween);
			if (this._isSelected) {
				this.update(group);
			} else {
				this.scaleTween.to({ x: 1, y: 1 }, 100).repeat(0);
				const scaleDownTween = new Tween(this.scale).to({ x: 0.5, y: 0.5 }, 100).start();
				const alphaTween = new Tween(this.sprite).to({ alpha: 0.5 }, 100).start();
				group.add(scaleDownTween);
				group.add(alphaTween);
			}
		}
	}
	public get isBlocked() {
		return this._isBlocked;
	}
	public set isBlocked(value) {
		const group = new Group();
		if (value !== this._isBlocked) {
			if (this.isUsed) return;
			this._isBlocked = value;
			const alpha = this._isBlocked ? 0.5 : 1;
			const alphaTween = new Tween(this.sprite).to({ alpha: alpha }, 200).start();
			group.add(alphaTween);
			new Ticker().add(() => {
				group.update();
			});
		}
	}
	constructor(
		private uiManager: UIManager,
		texture: Texture,
		power: number,
		damage: number,
		explosionEffect: AnimatedSprite,
		maxPower: number
	) {
		super();
		this.sprite = new Sprite(texture);
		this.uiManager = uiManager;
		this.power = power;
		this.maxPower = maxPower;
		this.explosionEffect = explosionEffect;
		this.scaleTween = new Tween<ObservablePoint>(this.sprite.scale);
		this.damage = damage;
		this.eventMode = 'static';
		this.isOver = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.addChild(this.sprite);
		this.subscribeEvents();
	}

	// private methods region
	private subscribeEvents() {
		this.on('pointerdown', this.onDown);
		this.on('pointerup', this.onUp);

		this.on('pointerupoutside', this.onUp);
		this.on('pointerover', this.onOver.bind(this));
		this.on('pointerout', this.onOut.bind(this));
	}

	private onDown(): void {
		this.uiManager.selectGrenade(this);
	}

	private onUp(): void {
		if (this.isSelected) {
			this.uiManager.deselectGrenade(this.power * 4, this.damage);
		}
	}

	private onOver(): void {
		if (this.isOver || this.isUsed || this.isBlocked) return;
		this.isOver = true;
		this.scale.set(this.scale.x + 0.1, this.scale.y + 0.1);
	}

	private onOut(): void {
		if ((this.isSelected && this.isOver) || this.isUsed || this.isBlocked) return;
		this.isOver = false;
		this.scale.set(this.scale.x - 0.1, this.scale.y - 0.1);
	}

	private update(group: Group): void {
		this.scaleTween
			.to({ x: this.sprite.scale.x + 0.1, y: this.sprite.scale.y + 0.1 }, 1000)
			.easing(Easing.Cubic.Out)
			.yoyo(true)
			.repeat(Infinity)
			.start();
		const updateTicker = new Ticker();

		updateTicker.add((delta: number) => {
			group.update();
			if (this.isSelected && this.power < this.maxPower) {
				this.power += delta;
			}
		});
		updateTicker.start();
		if (!this.isSelected) {
			updateTicker.stop();
		}
	}

	// public methods region
	public select(): void {
		if (this.isUsed || this.isBlocked) return;
		this.isSelected = true;
	}

	public deselect(): void {
		if (!this.isUsed) this.isUsed = true;

		this.isSelected = false;
	}
}
