// region import
import { Container } from 'pixi.js';
import { IScene } from '../managers/GameManager';
import { EventManager } from '../managers/EventManager';
import { UIManager } from '../managers/UIManager';
import { World } from '../game/World';
// endregion

// Create the GameScene class, which represents the main game scene.
export class GameScene extends Container implements IScene {
	private world: World; // Container for the player and grenades
	private uiManager: UIManager; // UI manager for the game
	private eventManager: EventManager; // Event manager for handling game events

	constructor() {
		super();
		this.eventManager = new EventManager();
		this.uiManager = new UIManager(this.eventManager); // Create the UI manager.
		this.world = new World(this.eventManager); // Create the game world container.
		this.startGame(); // Initialize and start the game.
	}
	// private methods region

	private startGame(): void {
		this.addChild(this.world);
		this.addChild(this.uiManager);
		this.uiManager.init();
		this.world.init();
	}

	//endregion

	// public methods region
	public update(): void {}
	//endregion
}
