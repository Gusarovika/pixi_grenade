import { Container, Sprite, Texture, AnimatedSprite } from 'pixi.js';
import { Player } from '../game-objects/Player';
import { EventManager } from '../managers/EventManager';
import { GameObject } from '../game-objects/GameObject';
import { Enemy } from '../game-objects/Enemy';
import { Grenade } from '../game-objects/Grenade';
import { worldConfig, enemyConfig, playerConfig, borderConfig } from '../configs/gameConfig';
import * as particles from '@pixi/particle-emitter';
import * as particleSettings from '../particle-emitters/emitter.json';
import { Background } from '../game-objects/Background';
import { GameEvent } from '../configs/gameEvent';

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

	private enemyDamaged: boolean = false;
	public explosionContainer: Container;
	private gameState: GameState;
	public eventManager: EventManager;
	public grenade: Grenade | null = null;
	public gameObjects: GameObject[] = [];
	public emitter: particles.Emitter;

	constructor(eventManager: EventManager) {
		super();

		this.enemy = new Enemy(this, worldConfig.enemyPosition.x, worldConfig.enemyPosition.y, enemyConfig.scale);
		this.player = new Player(this, worldConfig.playerPosition.x, worldConfig.playerPosition.y, playerConfig.scale);
		this.borderUp = Sprite.from(borderConfig.border);
		this.borderDown = Sprite.from(borderConfig.border);

		this.eventManager = eventManager;
		const explosionContainer = new Container();
		explosionContainer.zIndex = 100;
		const upgradedConfig = particles.upgradeConfig(particleSettings, 'particle');

		this.explosionContainer = explosionContainer;
		this.emitter = new particles.Emitter(explosionContainer, upgradedConfig);
		this.gameState = GameState.PlayerTurn;
		this.eventManager.subscribe(GameEvent.explosion, this.onExplosion, this);
		this.eventManager.subscribe(GameEvent.throw, this.onThrow, this);
		this.eventManager.subscribe(GameEvent.select, this.onSelect, this);
		this.eventManager.subscribe(GameEvent.gameEnd, this.onGameEnd, this);

		this.enemyDamaged = false;
	}

	init(): void {
		this.setBackground();
		this.addChild(this.explosionContainer);
		this.setBorder(this.borderDown, borderConfig.borderDown);
		this.createGameObject(this.player);
		this.player.setAnimation(playerConfig.animations.idle);
		this.createGameObject(this.enemy);

		this.enemy.setAnimation(enemyConfig.animations.idle);
		this.setBorder(this.borderUp, borderConfig.borderUp);
	}

	// private methods region
	private onExplosion(): void {
		this.testCollision();
		if (this.gameState === GameState.GrenadeLaunched) {
			this.gameState = GameState.PlayerTurn;
			this.player.toggleAim(false);
		}
	}

	private setBorder(
		border: Sprite,
		config: { position: { x: number; y: number }; scale: { x: number; y: number } }
	): void {
		border.anchor.set(0.5);
		border.x = config.position.x;
		border.y = config.position.y;
		border.scale.x = config.scale.x;
		border.scale.y = config.scale.y;
		this.addChild(border);
	}

	private setBackground(): void {
		new Background(this, 5, 12, worldConfig.floorPosition.x, worldConfig.floorPosition.y);
	}

	// check if grenade collided with border or enemy
	private testCollision(): void {
		if (this.gameState === GameState.GrenadeLaunched && this.grenade) {
			if (!this.enemyDamaged) {
				let borderCollision = this.borderUp.getBounds().contains(this.player.aim.x, this.player.aim.y);
				if (borderCollision) {
					this.enemy.switchAnimation(enemyConfig.animations.taunt, false);
					return;
				}
				let enemyDamaged: boolean = this.enemy.getBounds().contains(this.player.aim.x, this.player.aim.y);
				if (enemyDamaged) {
					this.enemyDamaged = true;
					const health = this.enemy.toggleHealthBar(this.grenade.damage);
					if (health > 0) {
						this.enemy.switchAnimation(enemyConfig.animations.hit, false);
					} else {
						this.gameState = GameState.GameEnd;
						this.eventManager.emit(GameEvent.gameEnd, true);
						this.enemy.switchAnimation(enemyConfig.animations.death, false, false);
						this.player.switchAnimation(playerConfig.animations.taunt, true);
					}
				} else {
					this.enemy.switchAnimation(enemyConfig.animations.taunt, false);
				}
			}
		}
	}
	// endregion

	// public methods region
	public createGameObject(go: GameObject): void {
		this.addChild(go);
		this.gameObjects.push(go);
	}
	public removeGameObject(go: GameObject): void {
		this.gameObjects = this.gameObjects.filter((elem: GameObject) => {
			return elem !== go;
		});
	}
	// endregion

	// region event handlers
	private onThrow(params: { power: number; explosion: AnimatedSprite; damage: number }): void {
		this.gameState = GameState.GrenadeLaunched;
		this.enemyDamaged = false;
		this.player.throwGrenade(this.enemy.position, params);
	}

	private onSelect(texture: Texture): void {
		if (this.gameState === GameState.PlayerTurn) {
			this.gameState = GameState.Charge;
			this.player.getGrenade(texture);
		}
	}

	private onGameEnd(): void {
		this.gameState = GameState.GameEnd;
	}
	// endregion
}
