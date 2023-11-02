import { Container, Graphics, Assets } from 'pixi.js';
import { manifest } from '../assets/assets';
import { IScene, Manager } from '../managers/GameManager';
import { GameScene } from './GameScene';

export class LoaderScene extends Container implements IScene {
	// For creating the loader bar graphics...
	private loaderBar: Container;
	private loaderBarBoder: Graphics;
	private loaderBarFill: Graphics;

	constructor() {
		super();

		const loaderBarWidth = Manager.width * 0.8;

		// Create the loader bar fill graphics
		this.loaderBarFill = new Graphics();
		this.loaderBarFill.beginFill(0x008800, 1);
		this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
		this.loaderBarFill.endFill();
		this.loaderBarFill.scale.x = 0;

		// Create the loader bar border graphics
		this.loaderBarBoder = new Graphics();
		this.loaderBarBoder.lineStyle(10, 0x0, 1);
		this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

		// Combine the fill and border into the loader bar
		this.loaderBar = new Container();
		this.loaderBar.addChild(this.loaderBarFill);
		this.loaderBar.addChild(this.loaderBarBoder);
		this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
		this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
		this.addChild(this.loaderBar);

		// Initialize the loader and start loading assets
		this.initializeLoader().then(() => {
			this.gameLoaded();
		});
	}
	// private methods region
	private async initializeLoader(): Promise<void> {
		await Assets.init({ manifest: manifest });

		const bundleIds = manifest.bundles.map((bundle) => bundle.name);

		await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
	}

	private downloadProgress(progressRatio: number): void {
		// Update the loader bar fill based on download progress
		this.loaderBarFill.scale.x = progressRatio;
	}

	private gameLoaded(): void {
		// Change scene to the game scene when the game is loaded
		Manager.changeScene(new GameScene());
	}
	// endregion

	// public methods region
	public update(): void {
		// To be a scene we must have the update method even if we don't use it.
	}
	// endregion
}
