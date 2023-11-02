import { AnimatedSprite, Container, Texture, Assets } from 'pixi.js';
import { GrenadeButton } from '../ui/GrenadeButton';
import { EventManager } from './EventManager';
import { uiConfig, tutorConfig } from '../configs/uiConfig';
import { Tutorial } from '../ui/Tutorial';
import { GameEvent } from '../configs/gameEvent';

export class UIManager extends Container {
	private grenades: GrenadeButton[] = [];
	private selectedGrenade: GrenadeButton | null = null;
	private eventManager: EventManager;
	private tutorial: Tutorial;
	private isGameEnd: boolean = false;

	constructor(eventManager: EventManager) {
		super();
		this.tutorial = new Tutorial();
		this.eventManager = eventManager;
		this.eventManager.subscribe(GameEvent.explosion, this.onExplosion, this);
		this.eventManager.subscribe(GameEvent.gameEnd, this.onGameEnd, this);
	}

	async init(): Promise<void> {
		const container = new Container();
		this.addChild(container);
		container.x = uiConfig.grenadesX;
		container.y = uiConfig.grenadesY;

		uiConfig.grenadeTypes.forEach(async (data, i) => {
			const effectArray = await this.getTexture(`explosion${i}`);
			const explosionContainer = new AnimatedSprite(effectArray);
			const texture = Texture.from(data.texture);
			const grenadeButton = new GrenadeButton(
				this,
				texture,
				data.power,
				data.damage,
				explosionContainer,
				uiConfig.maxPower
			);
			grenadeButton.x = i * 80 - (uiConfig.grenadeTypes.length * 80) / 2;
			grenadeButton.scale.set(0.5, 0.5);
			this.grenades.push(grenadeButton);
			container.addChild(grenadeButton);
		});

		this.tutorial.x = tutorConfig.tutorialX;
		this.tutorial.y = tutorConfig.tutorialY;
		this.addChild(this.tutorial);
	}

	// private methods region
	private throwSelectedGrenade(power: number, damage: number): void {
		if (this.selectedGrenade && !this.selectedGrenade.isBlocked) {
			this.eventManager.emit(GameEvent.throw, {
				power: power,
				explosion: this.selectedGrenade.explosionEffect,
				damage: damage,
			});
			this.toggleButtons(true);
		}
	}

	private toggleButtons(isBlocked: boolean): void {
		this.grenades.forEach((grenade) => {
			grenade.isBlocked = isBlocked;
			grenade.alpha = isBlocked ? 0.2 : 1;
		});
	}

	private async getTexture(animationResource: string): Promise<Texture[]> {
		const sheet = Assets.get(animationResource);
		const resource = Object.keys(sheet.textures).sort();
		const textureArray: Texture[] = [];

		for (let i = 0; i < resource.length; i++) {
			const texture = Texture.from(resource[i]);
			textureArray.push(texture);
		}
		return textureArray;
	}
	//endregion

	// public methods region
	public selectGrenade(grenadeButton: GrenadeButton): void {
		if (grenadeButton.isUsed) return;
		this.selectedGrenade = grenadeButton;
		grenadeButton.select();
		this.eventManager.emit(GameEvent.select, this.selectedGrenade.sprite.texture);
		this.grenades.forEach((grenadeButton) => {
			if (!grenadeButton.isSelected) grenadeButton.isBlocked = true;
		});
		this.tutorial.selectGrenade(grenadeButton);
	}

	public deselectGrenade(power: number, damage: number): void {
		if (this.selectedGrenade && !this.selectedGrenade.isUsed) {
			this.throwSelectedGrenade(power, damage);
			this.selectedGrenade.deselect();
			this.tutorial.deselectGrenade();
		}
	}
	//endregion

	// event handlers region
	private onExplosion(): void {
		if (this.isGameEnd) return;
		this.toggleButtons(false);
		this.tutorial.onExplosion();
		if (this.grenades.every((grenade) => grenade.isUsed)) {
			this.tutorial.setGameOver(false);
			this.eventManager.emit(GameEvent.gameEnd, false);
		}
	}

	private onGameEnd(isWin: boolean) {
		this.isGameEnd = true;
		if (isWin) {
			this.tutorial.setGameOver(true);
		}
		this.grenades.forEach((grenade) => (grenade.isBlocked = true));
	}
	//endregion
}
