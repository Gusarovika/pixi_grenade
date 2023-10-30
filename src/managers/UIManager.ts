import * as PIXI from 'pixi.js';
import { GrenadeButton } from '../GrenadeButton';
import { EventManager } from './EventManager';

export class UIManager extends PIXI.Container {
	private grenades: GrenadeButton[] = [];
	private selectedGrenade: GrenadeButton | null = null;
	private eventManager: EventManager;
	private grenadeAmount: number;
	constructor(grenadeAmount: number, eventManager: EventManager) {
		super();

		this.grenadeAmount = grenadeAmount;
		this.eventManager = eventManager;
		this.eventManager.subscribe('explosion', this.onExplosion, this);
		this.on('ledp', (text) => {
			console.log('UI LISTENER', text);
		});
	}

	selectGrenade(grenadeButton: GrenadeButton): void {
		this.selectedGrenade = grenadeButton;
		grenadeButton.select();
	}
	deselectGrenade(power: number): void {
		if (this.selectedGrenade && !this.selectedGrenade.isUsed) {
			this.throwSelectedGrenade(power);
			this.selectedGrenade.deselect();
		}
	}

	throwSelectedGrenade(power: number): void {
		// Бросок выбранной гранаты
		if (this.selectedGrenade && !this.selectedGrenade.isBlocked) {
			this.eventManager.emit('throw', power);
			this.toggle(true);
		}
	}

	init(width: number, height: number): void {
		const container = new PIXI.Container();

		this.addChild(container);

		// Устанавливаем позицию контейнера внизу экрана
		container.x = width / 2;
		container.y = height * 0.8;

		for (let i = 0; i < this.grenadeAmount; i++) {
			const grenadeButton = new GrenadeButton(this);
			grenadeButton.scale.set(0.5, 0.5);

			// Располагаем дочерние элементы в центре контейнера
			grenadeButton.x = i * 80 - (this.grenadeAmount * 80) / 2;
			this.grenades.push(grenadeButton);
			container.addChild(grenadeButton);
			// console.log('greande button', grenadeButton);
		}
	}
	toggle(isBlocked: boolean): void {
		this.grenades.forEach((grenade) => {
			grenade.isBlocked = isBlocked;
		});
	}

	onExplosion(): void {
		console.log('EXPLOSION UI');
		this.toggle(false);
	}
}
