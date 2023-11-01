import { Container, Text, TextStyle, Ticker } from 'pixi.js';
import { GrenadeButton } from './GrenadeButton';
// import { uiConfig } from '../uiConfig';

const tutorialStyle = new TextStyle({
	fontFamily: 'Tahoma',
	fontSize: 36,
	fontStyle: 'normal',
	fontWeight: 'bold',
	fill: ['ffffff'],
	letterSpacing: 8,
	lineJoin: 'round',
	miterLimit: 1,
	stroke: '#000000',
	strokeThickness: 6,
	dropShadow: true,
	dropShadowAlpha: 0.3,
	dropShadowColor: '#000000',
	dropShadowBlur: 2,
});
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

	private createTutorialText() {
		this.tutorialText = new Text('Tap and hold the grenade', tutorialStyle);

		this.tutorialText.visible = true;
		this.tutorialText.anchor.set(0.5, 0.5);
		this.addChild(this.tutorialText);
	}

	private createPowerText() {
		this.powerText = new Text('', tutorialStyle);

		this.powerText.visible = false;
		this.tutorialText.anchor.set(0.5, 1);
		this.addChild(this.powerText);
	}

	public selectGrenade(btn: GrenadeButton): void {
		this.showTutorialText();
		this.updatePowerText(btn);
		this.tutorialText.text = 'Hold To Power Up';
		this.powerText.visible = true;
		// this.holdingGrenade = true;
	}

	public deselectGrenade(): void {
		this.powerText.visible = false;
		this.tutorialText.visible = false;
		// this.holdingGrenade = false;
	}

	private showTutorialText() {
		this.tutorialText.visible = true;
	}

	public updatePowerText(btn: GrenadeButton) {
		console.log('updatePowerText', btn);
		this.ticker
			.add(() => {
				this.powerText.text = `Power: ${Math.floor(btn.power)}`;
			})
			.start();
	}

	public onExplosion() {
		this.tutorialText.text = 'Tap and hold the grenade';
		this.tutorialText.visible = true;
	}

	public setGameOver(isWin: boolean) {
		this.tutorialText.text = isWin ? 'YOU WIN!!!' : 'YOU LOOSE';
		this.tutorialText.visible = true;
	}
}
