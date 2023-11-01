import { AnimatedSprite, Container, Texture, Assets } from 'pixi.js';
import { GrenadeButton } from '../ui/GrenadeButton';
import { EventManager } from './EventManager';
import { uiConfig } from '../uiConfig';
import { Tutorial } from '../ui/Tutorial'; // Import UiLogic

export class UIManager extends Container {
	private grenades: GrenadeButton[] = [];
	private selectedGrenade: GrenadeButton | null = null;
	private eventManager: EventManager;
	private tutorial: Tutorial; // Create a UiLogic instance
	private isGameEnd: boolean = false;
	// private grenadeAmount: number;
	constructor(eventManager: EventManager) {
		super();
		// this.isGameEnd = false;
		this.tutorial = new Tutorial();
		this.eventManager = eventManager;
		this.eventManager.subscribe('explosion', this.onExplosion, this);
		this.eventManager.subscribe('gameEnd', this.onGameEnd, this);
	}

	selectGrenade(grenadeButton: GrenadeButton): void {
		if (grenadeButton.isUsed) return;
		this.selectedGrenade = grenadeButton;
		grenadeButton.select();
		this.eventManager.emit('select', this.selectedGrenade.sprite.texture);
		this.grenades.forEach((grenadeButton) => {
			if (!grenadeButton.isSelected) grenadeButton.isBlocked = true;
		});
		this.tutorial.selectGrenade(grenadeButton);
	}
	deselectGrenade(power: number, damage: number): void {
		if (this.selectedGrenade && !this.selectedGrenade.isUsed) {
			this.throwSelectedGrenade(power, damage);
			this.selectedGrenade.deselect();
			this.tutorial.deselectGrenade();
		}
	}

	throwSelectedGrenade(power: number, damage: number): void {
		// Бросок выбранной гранаты
		if (this.selectedGrenade && !this.selectedGrenade.isBlocked) {
			this.eventManager.emit('throw', {
				power: power,
				explosion: this.selectedGrenade.explosionEffect,
				damage: damage,
			});
			this.toggleButtons(true);
		}
	}

	async init(): Promise<void> {
		const container = new Container();

		this.addChild(container);

		// Устанавливаем позицию контейнера внизу экрана
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
		this.tutorial.x = uiConfig.tutor.tutorialX;
		this.tutorial.y = uiConfig.tutor.tutorialY;
		this.addChild(this.tutorial);
	}

	toggleButtons(isBlocked: boolean): void {
		this.grenades.forEach((grenade) => {
			grenade.isBlocked = isBlocked;
			grenade.alpha = isBlocked ? 0.2 : 1;
		});
	}

	onExplosion(): void {
		if (this.isGameEnd) return;
		this.toggleButtons(false);
		this.tutorial.onExplosion();
		if (this.grenades.every((grenade) => grenade.isUsed)) {
			this.tutorial.setGameOver(false);
			this.eventManager.emit('gameEnd', false);
		}
	}

	onGameEnd(isWin: boolean) {
		this.isGameEnd = true;
		if (isWin) {
			this.tutorial.setGameOver(true);
		}
		this.grenades.forEach((grenade) => (grenade.isBlocked = true));
	}

	async getTexture(animationResource: string): Promise<Texture[]> {
		const sheet = Assets.get(animationResource);
		const resource = Object.keys(sheet.textures).sort();
		const textureArray: Texture[] = [];

		for (let i = 0; i < resource.length; i++) {
			const texture = Texture.from(resource[i]);
			textureArray.push(texture);
		}
		return textureArray;
	}

	setAnimatedSprite(textureArray: Texture[]): AnimatedSprite {
		return new AnimatedSprite(textureArray);
	}
}
