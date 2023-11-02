import { World } from '../game/World';
import { Texture, Sprite, Ticker } from 'pixi.js';
import { GameObject } from './GameObject';
import { aimConfig } from '../configs/gameConfig';
import { Tween, Group } from 'tweedle.js';

export class Aim extends GameObject {
	protected sprite: Sprite;
	tween: Tween<this>;
	protected _isVisible: boolean;
	public set isVisible(v: boolean) {
		if (this._isVisible !== v) {
			this._isVisible = v;
			const alpha = this._isVisible ? 1 : 0;
			this.tween.to({ alpha: alpha }, 500).start();
			const group = new Group();
			group.add(this.tween);
			new Ticker().add(() => {
				group.update();
			});
		}
	}

	public get isVisible(): boolean {
		return this._isVisible;
	}

	constructor(x: number, y: number, world: World, scale: { x: number; y: number }) {
		super(world, x, y, scale);
		this.sprite = new Sprite(Texture.from(aimConfig.image));
		this._isVisible = false;
		this.sprite.anchor.set(0.5, 1);

		this.addChild(this.sprite);
		this.tween = new Tween(this);
	}
}
