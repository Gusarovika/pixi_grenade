import * as PIXI from 'pixi.js';
import { UIManager } from './managers/UIManager';

export class GrenadeButton extends PIXI.Sprite {
	// private buttonMode: boolean = false;
	private isSelected: boolean = false;
	public isUsed: boolean = false;
	public isBlocked: boolean = false;
	private power: number = 0;
	// private updat: boolean = false;

	constructor(private uiManager: UIManager) {
		const texture = PIXI.Texture.from('grenade.png');
		super(texture);

		this.on('pointerdown', (targt: any) => {
			console.log('pointerdown', targt);
			this.uiManager.selectGrenade(this);
		});
		this.on('pointerup', () => {
			if (this.isSelected) this.uiManager.deselectGrenade(this.power * 4);
		});
		this.on('pointerupoutside', () => {
			if (this.isSelected) this.uiManager.deselectGrenade(this.power * 4);
		});
		this.eventMode = 'static';
	}
	update(): void {
		const throwAnimation = new PIXI.Ticker();
		throwAnimation.add((delta: number) => {
			if (this.isSelected) {
				this.power += delta;
			}
		});
		throwAnimation.start();
	}

	select() {
		if (this.isUsed || this.isBlocked) return;
		// this.uiManager.selectGrenade(this);
		console.log('select', this.isSelected, this.isBlocked);
		this.isSelected = true;
		this.update();
		// this.isUsed = true;
		// Выделение выбранной гранаты
		// this.isUsed = true;
		this.tint = 0xff0000;
	}

	deselect() {
		// if (this.isBlocked) return;
		console.log('deselect', this.power);
		// this.power = 0;
		if (!this.isUsed) this.isUsed = true;

		// Снятие выделения с гранаты
		this.isSelected = false;
		// this.isUsed = false;
		// this.uiManager.throwSelectedGrenade();
		this.tint = 0x0000ff;
	}
}
