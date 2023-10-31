import { AnimatedSprite, Container, Texture, Assets } from 'pixi.js';
import { GrenadeButton } from '../ui/GrenadeButton';
import { EventManager } from './EventManager';
import { uiConfig } from '../uiConfig';

export class UIManager extends Container {
	private grenades: GrenadeButton[] = [];
	private selectedGrenade: GrenadeButton | null = null;
	private eventManager: EventManager;
	// private grenadeAmount: number;
	constructor(eventManager: EventManager) {
		super();

		// this.grenadeAmount = grenadeAmount;
		this.eventManager = eventManager;
		this.eventManager.subscribe('explosion', this.onExplosion, this);
		this.on('ledp', (text) => {
			console.log('UI LISTENER', text);
		});
	}

	selectGrenade(grenadeButton: GrenadeButton): void {
		this.selectedGrenade = grenadeButton;
		grenadeButton.select();
		this.eventManager.emit('select');
	}
	deselectGrenade(power: number): void {
		if (this.selectedGrenade && !this.selectedGrenade.isUsed) {
			console.log('deselectGrenade');
			this.throwSelectedGrenade(power);
			this.selectedGrenade.deselect();
		}
	}

	throwSelectedGrenade(power: number): void {
		// Бросок выбранной гранаты
		if (this.selectedGrenade && !this.selectedGrenade.isBlocked) {
			this.eventManager.emit('throw', {
				power: power,
				texture: this.selectedGrenade.sprite.texture,
				explosion: this.selectedGrenade.explosionEffect,
				damage: this.selectedGrenade.damage,
			});
			this.toggleButtons(true);
		}
	}

	async init(width: number, height: number): Promise<void> {
		const container = new Container();

		this.addChild(container);

		// Устанавливаем позицию контейнера внизу экрана
		container.x = width / 2;
		container.y = height * 0.8;

		// const textureArray = await this.getTexture('grenades');

		// for (let i = 0; i < this.grenadeAmount; i++) {
		// 	// if (i) {
		// 	const texture = textureArray[i];
		// 	console.log(i, this.grenadeAmount);
		// 	const grenadeButton = new GrenadeButton(this, texture, i, explosionContainer);
		// 	grenadeButton.scale.set(0.5, 0.5);

		// 	// Располагаем дочерние элементы в центре контейнера
		// 	grenadeButton.x = i * 80 - (this.grenadeAmount * 80) / 2;
		// 	this.grenades.push(grenadeButton);
		// 	container.addChild(grenadeButton);
		// 	// }
		// }
		uiConfig.grenadeTypes.forEach(async (data, i) => {
			const effectArray = await this.getTexture(`explosion${i}`);
			const explosionContainer = new AnimatedSprite(effectArray);
			const texture = Texture.from(data.texture);
			const grenadeButton = new GrenadeButton(this, texture, data.power, data.damage, explosionContainer);
			grenadeButton.x = i * 80 - (uiConfig.grenadeTypes.length * 80) / 2;
			grenadeButton.scale.set(0.5, 0.5);
			this.grenades.push(grenadeButton);
			container.addChild(grenadeButton);
		});
	}

	toggleButtons(isBlocked: boolean): void {
		this.grenades.forEach((grenade) => {
			grenade.isBlocked = isBlocked;
			grenade.alpha = isBlocked ? 0.2 : 1;
		});
	}

	onExplosion(): void {
		console.log('EXPLOSION UI');
		this.toggleButtons(false);
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
