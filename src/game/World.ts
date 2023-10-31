// import { Resource } from './../ENUMS';
import { Container, Sprite, Texture, AnimatedSprite } from 'pixi.js';
import { Player } from '../game-objects/Player';
import { EventManager } from '../managers/EventManager';
import { GameObject } from '../game-objects/GameObject';
import { Enemy } from '../game-objects/Enemy';
import { Grenade } from '../game-objects/Grenade';
import { worldConfig, enemyConfig, playerConfig } from '../gameConfig';
import * as particles from '@pixi/particle-emitter';
import * as particleSettings from '../particle-emitters/emitter.json';

enum GameState {
	Charge,
	GrenadeLaunched,
	PlayerTurn,
	GameEnd,
}

export class World extends Container {
	private player: Player;
	private enemy: Enemy;
	private floor: Sprite;
	// public width: number;
	private enemyDamaged: boolean = false;
	public explosionContainer: Container;
	private gameState: GameState;
	public eventManager: EventManager;
	public grenade: Grenade | null = null;
	public gameObjects: GameObject[] = []; // Список брошенных гранат
	public emitter: particles.Emitter;
	// With getters but not setters, these variables become read-only

	constructor(eventManager: EventManager) {
		super();

		this.enemy = new Enemy(this, worldConfig.enemyPosition.x, worldConfig.enemyPosition.y, enemyConfig.scale);
		this.player = new Player(this, worldConfig.playerPosition.x, worldConfig.playerPosition.y, playerConfig.scale);
		this.floor = Sprite.from(worldConfig.floor);
		this.eventManager = eventManager;
		const explosionContainer = new Container();
		explosionContainer.zIndex = 100;
		const upgradedConfig = particles.upgradeConfig(particleSettings, 'particle');

		this.addChild(explosionContainer);
		// explosionContainer.position.set(400, 400);
		this.explosionContainer = explosionContainer; // Store a reference for later use

		this.emitter = new particles.Emitter(explosionContainer, upgradedConfig);
		// this.emitter.autoUpdate = true;
		// this.emitter.emit = true;

		this.gameState = GameState.PlayerTurn;
		this.eventManager.subscribe('explosion', this.onExplosion, this);
		this.eventManager.subscribe('throw', this.onThrow, this);
		this.eventManager.subscribe('select', this.onSelect, this);

		this.enemyDamaged = false;
	}

	init() {
		this.setBackground();
		this.addChild(this.explosionContainer);
		this.createGameObject(this.player);
		this.player.setAnimation(playerConfig.animations.idle);
		this.createGameObject(this.enemy);

		this.enemy.setAnimation(enemyConfig.animations.idle);

		// this.gameObjects.push(this.player);
	}
	restart() {}
	onExplosion() {
		if (this.gameState === GameState.GrenadeLaunched) {
			this.gameState = GameState.PlayerTurn;
			this.player.toggleAim(false);
		}
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
		this.floor.x = worldConfig.floorPosition.x;
		this.floor.y = worldConfig.floorPosition.y;
		this.floor.scale = worldConfig.floorScale;
		this.addChild(this.floor);
	}
	onThrow(params: { power: number; texture: Texture; explosion: AnimatedSprite; damage: number }) {
		this.gameState = GameState.GrenadeLaunched;
		this.enemyDamaged = false;

		this.player.throwGrenade(this.enemy.position, params.power, params.texture, params.explosion, params.damage);
	}
	onSelect() {
		if (this.gameState === GameState.PlayerTurn) {
			this.gameState = GameState.Charge;
		}
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
			if (!this.enemyDamaged) {
				let enemyDamaged: boolean = this.testCollision(this.enemy, this.grenade);
				if (enemyDamaged) {
					this.enemyDamaged = true;
					const health = this.enemy.toggleHealthBar(this.grenade.damage);
					if (health <= 0) {
						this.gameState = GameState.GameEnd;
						this.enemy.switchAnimation(enemyConfig.animations.death, false);
						this.player.switchAnimation(playerConfig.animations.jump, false);
					}
				}
			}
		}
	}
}
