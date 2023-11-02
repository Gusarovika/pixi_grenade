import { Container, Text, Ticker } from 'pixi.js';
import { GrenadeButton } from './GrenadeButton';
import { tutorConfig } from '../configs/uiConfig';

export class Tutorial extends Container {
	private tutorialText!: Text;
	private powerText!: Text;
	private ticker: Ticker;
	constructor() {
		super();
		this.createTutorialText();
		this.createPowerText();
		this.ticker = new Ticker();
	}
	// private methods region
	private createTutorialText(): void {
		this.tutorialText = new Text(tutorConfig.tap, tutorConfig.style);

		this.tutorialText.visible = true;
		this.tutorialText.anchor.set(0.5, 0.5);
		this.addChild(this.tutorialText);
	}

	private createPowerText(): void {
		this.powerText = new Text('', tutorConfig.style);

		this.powerText.visible = false;
		this.tutorialText.anchor.set(0.5, 1);
		this.addChild(this.powerText);
	}
	private showTutorialText(): void {
		this.tutorialText.visible = true;
	}
	// endregion

	//public methods
	public selectGrenade(btn: GrenadeButton): void {
		this.showTutorialText();
		this.updatePowerText(btn);
		this.tutorialText.text = tutorConfig.hold;
		this.powerText.visible = true;
	}

	public deselectGrenade(): void {
		this.powerText.visible = false;
		this.tutorialText.visible = false;
	}

	public updatePowerText(btn: GrenadeButton): void {
		this.ticker
			.add(() => {
				this.powerText.text = tutorConfig.power + Math.floor(btn.power);
			})
			.start();
	}

	public onExplosion(): void {
		this.tutorialText.text = tutorConfig.tap;
		this.tutorialText.visible = true;
	}

	public setGameOver(isWin: boolean): void {
		this.tutorialText.text = isWin ? tutorConfig.win : tutorConfig.loose;
		this.tutorialText.visible = true;
	}
	// endregion
}
