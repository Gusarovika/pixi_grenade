// import { Application } from 'pixi.js';
// // import { Player } from './Player';
// import { UIManager } from './UIManager';
// import { EventManager } from './EventManager';
// import { World } from './World';

import { Manager } from './managers/GameManager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(640, 480, 0x6495ed);

// We no longer need to tell the scene the size because we can ask Manager!
const loader: LoaderScene = new LoaderScene();
Manager.changeScene(loader);

// export class Main extends Application {
// 	private world: World; // Контейнер для игрока и гранат
// 	// private player: Player;
// 	private uiManager: UIManager;
// 	private eventManager: EventManager;

// 	constructor() {
// 		let view = document.getElementById('pixi-canvas') as HTMLCanvasElement;

// 		super({
// 			view: view,
// 			width: 800,
// 			height: 800,
// 			antialias: false,
// 			backgroundColor: 0x6495ed,
// 		});

// 		this.ticker.add(() => {
// 			// Обновление игры
// 			this.world.update();
// 		});

// 		// Создаем event менеджер
// 		this.eventManager = new EventManager();
// 		// Создаем UI менеджер
// 		this.uiManager = new UIManager(7, this.eventManager);
// 		// this.uiManager.x = view.width / 2;
// 		// this.uiManager.y = view.height / 2;
// 		// Создаем контейнер для игрока и гранат
// 		this.world = new World(this.eventManager, view);
// 		this.stage.on('ledp', (text: string) => {
// 			console.log('DDDEEE this.stagethis.stage', text);
// 		});
// 	}

// 	startGame() {
// 		// Начальная инициализация игры
// 		this.stage.addChild(this.world);
// 		this.stage.addChild(this.uiManager);
// 		this.uiManager.init(this.view.width, this.view.height);
// 		this.world.init();
// 		// Добавляем игрока в контейнер
// 		// this.world.addChild(this.player);
// 	}
// }

// const main: Main = new Main();

// main.startGame();
