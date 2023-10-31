import { Texture, Ticker, Sprite, AnimatedSprite, ObservablePoint, Container } from 'pixi.js';
import { UIManager } from '../managers/UIManager';
import { Tween, Easing, Group } from 'tweedle.js';

export class GrenadeButton extends Container {
	// private buttonMode: boolean = false;
	private _isSelected: boolean = false;
	public isUsed: boolean = false;
	public _isBlocked: boolean = false;
	private power: number = 0;
	public sprite: Sprite;
	// private isOver: boolean = false;
	public explosionEffect: AnimatedSprite;
	public get isSelected() {
		return this._isSelected;
	}
	public damage: number = 0;
	scaleTween: Tween<ObservablePoint>;
	protected isOver: boolean = false;
	public set isSelected(value) {
		if (value !== this._isSelected) {
			console.log('selected', this._isSelected);
			this._isSelected = value;
			const group = new Group();
			group.add(this.scaleTween);
			if (this._isSelected) {
				this.update(group);
			} else {
				console.log('STOP TWEEN', this.sprite.scale.x);
				this.scaleTween.to({ x: 0.8, y: 0.8 }, 100).repeat(0);
				const scaleDownTween = new Tween(this.scale).to({ x: 0.5, y: 0.5 }, 100).start();
				const alphaTween = new Tween(this.sprite).to({ alpha: 0.5 }, 100).start();
				group.add(scaleDownTween);
				group.add(alphaTween);
				// updateTicker.stop();
			}
		}
	}
	public get isBlocked() {
		return this._isBlocked;
	}
	public set isBlocked(value) {
		if (value !== this._isBlocked) {
			if (this.isUsed) return;
			this._isBlocked = value;
			this.sprite.alpha = this._isBlocked ? 0.5 : 1;
		}
	}
	// private updat: boolean = false;
	constructor(
		private uiManager: UIManager,
		texture: Texture,
		power: number,
		damage: number,
		explosionEffect: AnimatedSprite
	) {
		// const texture = PIXI.Texture.from('grenade.png');
		super();
		this.sprite = new Sprite(texture);
		this.uiManager = uiManager;
		this.power = power;
		this.explosionEffect = explosionEffect;
		this.scaleTween = new Tween<ObservablePoint>(this.sprite.scale);
		this.damage = damage;
		this.eventMode = 'static';
		this.isOver = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.addChild(this.sprite);

		this._subscribeEvents();
	}

	private _subscribeEvents() {
		this.on('pointerdown', this.onDown);
		this.on('pointerup', this.onUp);

		this.on('pointerupoutside', this.onUp);
		this.on('pointerover', () => {
			this.onOver();
		});
		this.on('pointerout', this.onOut.bind(this));
	}

	onDown() {
		this.uiManager.selectGrenade(this);
	}
	onUp() {
		if (this.isSelected) {
			console.log('desalect');

			this.uiManager.deselectGrenade(this.power * 4);
		}
	}
	onOver() {
		if (this.isOver || this.isUsed) return;
		this.isOver = true;
		this.scale.set(this.scale.x + 0.1, this.scale.y + 0.1);
	}
	onOut() {
		if ((this.isSelected && this.isOver) || this.isUsed) return;
		this.isOver = false;
		this.scale.set(this.scale.x - 0.1, this.scale.y - 0.1);
	}
	update(group: Group): void {
		this.scaleTween
			.to({ x: this.sprite.scale.x + 0.1, y: this.sprite.scale.y + 0.1 }, 1000)
			.easing(Easing.Cubic.Out)
			.yoyo(true)
			.repeat(Infinity)
			.onRepeat(() => {
				console.log('REPAET', this.power);
			})
			.start();
		const updateTicker = new Ticker();
		console.log('GROUP TWEEN', group);

		updateTicker.add((delta: number) => {
			group.update();
			if (this.isSelected) {
				this.power += delta;
				// console.log('delta', this.power);

				// Group.shared.update();
			}
		});
		updateTicker.start();
	}

	select() {
		if (this.isUsed || this.isBlocked) return;
		// this.uiManager.selectGrenade(this);
		console.log('select', this.isSelected, this.isBlocked);
		this.isSelected = true;

		// this.isUsed = true;
		// Выделение выбранной гранаты
		// this.isUsed = true;
		// this.tint = 0xff0000;
	}

	deselect() {
		// if (this.isBlocked) return;
		// console.log('deselect', this.power);
		// this.power = 0;
		if (!this.isUsed) this.isUsed = true;

		// Снятие выделения с гранаты
		this.isSelected = false;
		// this.isUsed = false;
		// this.uiManager.throwSelectedGrenade();
		// this.tint = 0x0000ff;
	}
}
