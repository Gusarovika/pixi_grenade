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
import { Background } from '../game-objects/Background';

enum GameState {
	Charge,
	GrenadeLaunched,
	PlayerTurn,
	GameEnd,
}

export class World extends Container {
	private player: Player;
	private enemy: Enemy;
	private borderUp: Sprite;
	private borderDown: Sprite;

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
		this.borderUp = Sprite.from(worldConfig.border);
		this.borderDown = Sprite.from(worldConfig.border);

		this.eventManager = eventManager;
		const explosionContainer = new Container();
		explosionContainer.zIndex = 100;
		const upgradedConfig = particles.upgradeConfig(particleSettings, 'particle');

		// this.addChild(explosionContainer);
		this.explosionContainer = explosionContainer;

		this.emitter = new particles.Emitter(explosionContainer, upgradedConfig);

		this.gameState = GameState.PlayerTurn;
		this.eventManager.subscribe('explosion', this.onExplosion, this);
		this.eventManager.subscribe('throw', this.onThrow, this);
		this.eventManager.subscribe('select', this.onSelect, this);
		this.eventManager.subscribe('gameEnd', this.onGameEnd, this);

		this.enemyDamaged = false;
	}

	init() {
		this.setBackground();
		this.addChild(this.explosionContainer);
		this.setBorder(this.borderDown, worldConfig.borderDown);
		this.createGameObject(this.player);
		this.player.setAnimation(playerConfig.animations.idle);
		this.createGameObject(this.enemy);

		this.enemy.setAnimation(enemyConfig.animations.idle);
		this.setBorder(this.borderUp, worldConfig.borderUp);

		// this.gameObjects.push(this.player);
	}
	restart() {}
	onExplosion() {
		this.testCollision();
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
	setBorder(border: Sprite, config: { position: { x: number; y: number }; scale: { x: number; y: number } }) {
		border.anchor.set(0.5);
		border.x = config.position.x;
		border.y = config.position.y;
		border.scale.x = config.scale.x;
		border.scale.y = config.scale.y;
		this.addChild(border);
	}
	setBackground() {
		const textures = [
			Texture.from(worldConfig.tile),
			Texture.from(worldConfig.tile2),
			Texture.from(worldConfig.leftTile),
			Texture.from(worldConfig.rightTile),
		];

		// Создаем фон
		new Background(this, textures, 5, 12, worldConfig.floorPosition.x, worldConfig.floorPosition.y);
	}
	onThrow(params: { power: number; explosion: AnimatedSprite; damage: number }) {
		this.gameState = GameState.GrenadeLaunched;
		this.enemyDamaged = false;

		this.player.throwGrenade(this.enemy.position, params);
		// console.log('throw greande', params.damage);
	}
	onSelect(texture: Texture) {
		if (this.gameState === GameState.PlayerTurn) {
			this.gameState = GameState.Charge;
			this.player.getGrenade(texture);
			// this.player.switchAnimation(playerConfig.animations.throw, false, 4, true);
		}
	}

	onGameEnd() {
		this.gameState = GameState.GameEnd;
	}

	testCollision() {
		if (this.gameState === GameState.GrenadeLaunched && this.grenade) {
			// if bounds
			if (!this.enemyDamaged) {
				let borderCollision = this.borderUp.getBounds().contains(this.player.aim.x, this.player.aim.y);
				if (borderCollision) return;
				let enemyDamaged: boolean = this.enemy.getBounds().contains(this.player.aim.x, this.player.aim.y);
				if (enemyDamaged) {
					this.enemyDamaged = true;
					this.enemy.switchAnimation(enemyConfig.animations.hit, false);

					const health = this.enemy.toggleHealthBar(this.grenade.damage);
					// console.log('test collision', enemyDamaged, health);
					if (health <= 0) {
						this.gameState = GameState.GameEnd;
						this.eventManager.emit('gameEnd', true);
						this.enemy.switchAnimation(enemyConfig.animations.death, false, 0, false);
						this.player.switchAnimation(playerConfig.animations.taunt, true);
					}
				}
			}
		}
	}

	update() {}
}
