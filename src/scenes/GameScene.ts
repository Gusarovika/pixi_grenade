import { Container } from 'pixi.js';
import { IScene, Manager } from '../managers/GameManager';
// mport { Container, Sprite } from 'pixi.js';
// import { Player } from '../Player';
// import { Textures } from '../ENUMS';
import { EventManager } from '../managers/EventManager';
// import { GameObject } from '../GameObject';
// import { Enemy } from '../Enemy';
// import EventEmitter from 'eventemitter3';
import { UIManager } from '../managers/UIManager';
import { World } from '../game/World';

export class GameScene extends Container implements IScene {
	// private clampy: Sprite;
	// private clampyVelocity: number;
	private world: World; // Контейнер для игрока и гранат
	// private player: Player;
	private uiManager: UIManager;
	private eventManager: EventManager;
	// private floor: Sprite;

	constructor() {
		super();
		this.eventManager = new EventManager();
		// Создаем UI менеджер
		this.uiManager = new UIManager(7, this.eventManager);

		// Создаем контейнер для игрока и гранат
		this.world = new World(this.eventManager, Manager.width, Manager.height);
		// Inside assets.ts we have a line that says `"Clampy from assets.ts!": "./clampy.png",`
		// this.clampy = Sprite.from('Clampy from assets.ts!');

		// this.clampy.anchor.set(0.5);
		// this.clampy.x = Manager.width / 2;
		// this.clampy.y = Manager.height / 2;
		// this.addChisld(this.clampy);

		// this.clampyVelocity = 5;
		// this.floor = new Sprite(Assets.get('floor'));
		// console.log('game scene ', Assets);
		this.startGame();
	}
	public update(): void {
		this.world.update();
	}

	setBackground() {
		// this.floor.anchor.set(0.5);
		// this.floor.x = 0;
		// this.floor.y = 0;
		// // this.floor.pivot.set(0.5, 0.5);
		// this.floor.scale.set(1, 1);
		// // this.addChild(this.floor);
		// console.log('floofr', this.floor);
	}
	public startGame() {
		// Начальная инициализация игры
		this.addChild(this.world);
		this.addChild(this.uiManager);
		// this.setBackground();
		// this.addChild(this.floor);

		this.uiManager.init(Manager.width, Manager.height);
		this.world.init();
		// Добавляем игрока в контейнер
		// this.world.addChild(this.player);
	}
}
// const EE = new EventEmitter();
// enum GameState {
// 	Charge,
// 	GrenadeLaunched,
// 	PlayerTurn,
// }

// export class World extends Container implements IScene {
// 	private player: Player;
// 	private enemy: Enemy;
// 	private floor: Sprite;
// 	// public width: number;

// 	private gameState: GameState;
// 	public eventManager: EventManager;
// 	public grenade: GameObject | null = null;
// 	public gameObjects: GameObject[] = []; // Список брошенных гранат

// 	// With getters but not setters, these variables become read-only

// 	constructor(eventManager: EventManager, view: HTMLCanvasElement) {
// 		super();

// 		this.player = new Player(this, view.width * 0.7, view.height * 0.55);
// 		this.enemy = new Enemy(this, view.width * 0.35, view.height * 0.46);
// 		this.floor = Sprite.from(Textures.Floor);
// 		this.eventManager = eventManager;
// 		this.width = view.width;
// 		this.height = view.height;
// 		// this.skew.set(0, 0);
// 		// this.grenade = grenade
// 		// EE.on('ledp', () => {
// 		// 	console.log('EEE', this, SystemManager);
// 		// });
// 		this.eventMode = 'dynamic';
// 		this.on('ledp', (text) => {
// 			console.log('DDDEEE', text);
// 		});
// 		this.gameState = GameState.PlayerTurn;
// 		this.eventManager.subscribe('explosion', this.onExplosion, this);
// 		this.eventManager.subscribe('throw', this.onThrow, this);
// 	}

// 	init() {
// 		this.setBackground();
// 		this.createGameObject(this.player);
// 		this.createGameObject(this.enemy);

// 		// this.enemy.setAnimation(Resource.EnemyIdle);
// 		// this.player.setAnimation(Resource.PlayerIdle);

// 		// this.gameObjects.push(this.player);
// 	}
// 	restart() {}
// 	onExplosion() {
// 		this.gameState = GameState.PlayerTurn;
// 		this.player.toggleAim(false);
// 		this.emit('player', 'fff');
// 		EE.emit('player', ' send to player ');
// 	}
// 	createGameObject(go: GameObject) {
// 		this.addChild(go);
// 		this.gameObjects.push(go);
// 	}
// 	removeGameObject(go: GameObject): void {
// 		this.gameObjects = this.gameObjects.filter((elem: GameObject) => {
// 			return elem !== go;
// 		});
// 	}
// 	setBackground() {
// 		this.floor.anchor.set(0.5);
// 		this.floor.x = 400;
// 		this.floor.y = 750;
// 		// this.floor.pivot.set(0.5, 0.5);
// 		this.floor.scale.set(1, 1);
// 		this.addChild(this.floor);
// 		console.log('floofr', this.width);
// 	}
// 	onThrow(power: number) {
// 		this.gameState = GameState.GrenadeLaunched;
// 		// console.log('TROE', this.player);
// 		const finalPos = this.calculateGrenadeFinalPosition(
// 			this.player.x,
// 			this.player.y,
// 			this.enemy.x,
// 			this.enemy.y,
// 			power
// 		);
// 		this.player.throwGrenade(finalPos);
// 	}

// 	testCollision(object1: GameObject, object2: GameObject): boolean {
// 		const bounds1 = object1.getBounds();
// 		const bounds2 = object2.getBounds();

// 		return (
// 			bounds1.x < bounds2.x + bounds2.width &&
// 			bounds1.x + bounds1.width > bounds2.x &&
// 			bounds1.y < bounds2.y + bounds2.height &&
// 			bounds1.y + bounds1.height > bounds2.y
// 		);
// 	}

// 	update() {
// 		if (this.gameState === GameState.GrenadeLaunched && this.grenade) {
// 			let isCollide: boolean = this.testCollision(this.enemy, this.grenade);
// 			if (isCollide) {
// 				isCollide = false;

// 				console.log('Collision');
// 			}
// 		}
// 	}
// 	calculateGrenadeFinalPosition(
// 		playerX: number,
// 		playerY: number,
// 		enemyX: number,
// 		enemyY: number,
// 		throwPower: number
// 	): { x: number; y: number } {
// 		const deltaX = enemyX - playerX;
// 		const deltaY = enemyY - playerY;

// 		// Расчет угла между игроком и врагом
// 		const throwAngle = Math.atan2(deltaY, deltaX);

// 		// Финальные координаты гранаты
// 		const finalX = playerX + throwPower * Math.cos(throwAngle);
// 		const finalY = playerY + throwPower * Math.sin(throwAngle);

// 		return { x: finalX, y: finalY };
// 	}
// }
