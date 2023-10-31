import { World } from '../game/World';
import { Texture, Sprite, Ticker } from 'pixi.js';
// import { Grenade } from './Grenade';
import { GameObject } from './GameObject';
// import Textures from './textures';
import { aimConfig } from '../gameConfig';
import { Tween, Group } from 'tweedle.js';

export class Aim extends GameObject {
	// protected texture: Texture; // Текстура объекта
	protected sprite: Sprite;
	tween: Tween<this>; // Спрайт объекта
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
		super(world, x, y, scale); // Вызываем конструктор базового класса
		this.sprite = new Sprite(Texture.from(aimConfig.image));
		this._isVisible = false;

		this.addChild(this.sprite);
		this.tween = new Tween(this);
	}
}
