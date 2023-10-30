// import { Resource } from './../ENUMS';
import { Container, Sprite } from 'pixi.js';
import { Player } from '../game-objects/Player';
import { EventManager } from '../managers/EventManager';
import { GameObject } from '../game-objects/GameObject';
import { Enemy } from '../game-objects/Enemy';
import EventEmitter from 'eventemitter3';

const EE = new EventEmitter();
enum GameState {
	Charge,
	GrenadeLaunched,
	PlayerTurn,
}

export class World extends Container {
	private player: Player;
	private enemy: Enemy;
	private floor: Sprite;
	// public width: number;

	private gameState: GameState;
	public eventManager: EventManager;
	public grenade: GameObject | null = null;
	public gameObjects: GameObject[] = []; // Список брошенных гранат

	// With getters but not setters, these variables become read-only

	constructor(eventManager: EventManager, width: number, height: number) {
		super();
		// const playerTexture = Texture.from('PlayerIdle');
		// const enemyTexture = Texture.from('EnemyIdle');
		// console.log('player text', playerTexture);

		this.player = new Player(this, width * 0.7, height * 0.5);
		this.enemy = new Enemy(this, width * 0.35, height * 0.46);
		this.floor = Sprite.from('floor');
		this.eventManager = eventManager;
		this.width = width;
		this.height = height;
		// this.skew.set(0, 0);
		// this.grenade = grenade
		// EE.on('ledp', () => {
		// 	console.log('EEE', this, SystemManager);
		// });
		this.eventMode = 'dynamic';
		this.on('ledp', (text) => {
			console.log('DDDEEE', text);
		});
		this.gameState = GameState.PlayerTurn;
		this.eventManager.subscribe('explosion', this.onExplosion, this);
		this.eventManager.subscribe('throw', this.onThrow, this);
	}

	init() {
		this.setBackground();
		this.createGameObject(this.player);
		this.player.setAnimation('PlayerIdle');
		this.createGameObject(this.enemy);

		this.enemy.setAnimation('EnemyIdle');

		// this.gameObjects.push(this.player);
		console.log('init', this);
	}
	restart() {}
	onExplosion() {
		this.gameState = GameState.PlayerTurn;
		this.player.toggleAim(false);
		this.emit('player', 'fff');
		EE.emit('player', ' send to player ');
	}
	createGameObject(go: GameObject) {
		this.addChild(go);
		this.gameObjects.push(go);
	}
	removeGameObject(go: GameObject): void {
		this.gameObjects = this.gameObjects.filter((elem: GameObject) => {
			return elem !== go;
		});
	}
	setBackground() {
		this.floor.anchor.set(0.5);
		this.floor.x = 400;
		this.floor.y = 600;
		// this.floor.pivot.set(0.5, 0.5);
		this.floor.scale.set(1, 1);
		this.addChild(this.floor);
	}
	onThrow(power: number) {
		this.gameState = GameState.GrenadeLaunched;
		// console.log('TROE', this.player);
		const finalPos = this.calculateGrenadeFinalPosition(
			this.player.x,
			this.player.y,
			this.enemy.x,
			this.enemy.y,
			power
		);
		this.player.throwGrenade(finalPos);
	}

	testCollision(object1: GameObject, object2: GameObject): boolean {
		const bounds1 = object1.getBounds();
		const bounds2 = object2.getBounds();

		return (
			bounds1.x < bounds2.x + bounds2.width &&
			bounds1.x + bounds1.width > bounds2.x &&
			bounds1.y < bounds2.y + bounds2.height &&
			bounds1.y + bounds1.height > bounds2.y
		);
	}

	update() {
		if (this.gameState === GameState.GrenadeLaunched && this.grenade) {
			let isCollide: boolean = this.testCollision(this.enemy, this.grenade);
			if (isCollide) {
				isCollide = false;

				console.log('Collision');
			}
		}
	}
	calculateGrenadeFinalPosition(
		playerX: number,
		playerY: number,
		enemyX: number,
		enemyY: number,
		throwPower: number
	): { x: number; y: number } {
		const deltaX = enemyX - playerX;
		const deltaY = enemyY - playerY;

		// Расчет угла между игроком и врагом
		const throwAngle = Math.atan2(deltaY, deltaX);

		// Финальные координаты гранаты
		const finalX = playerX + throwPower * Math.cos(throwAngle);
		const finalY = playerY + throwPower * Math.sin(throwAngle);

		return { x: finalX, y: finalY };
	}
}
