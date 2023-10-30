import { World } from '../game/World';
import { ObservablePoint, Texture } from 'pixi.js';
import { Grenade } from './Grenade';
import { Aim } from './Aim';
import { Textures, Resource } from '../ENUMS';
import { Character } from './Character';

import EventEmitter from 'eventemitter3';
const EE = new EventEmitter();
export class Player extends Character {
	private aim: Aim;

	constructor(world: World, x: number, y: number) {
		super(world, x, y); // Вызываем конструктор базового класса
		this.scale.set(-0.18, 0.18);

		this.aim = new Aim(this.x, this.y, this.world, Texture.from(Textures.Aim));
		this.setAim();

		EE.on('player', this.onPlayer, this);
		this.eventMode = 'dynamic';
		// this.on('player', this.onPlayer, this);
	}
	onPlayer() {
		console.log('PLAYER RECEIVED EVENT');
	}
	onLep(text: string) {
		console.log('LEDP PLAYER', text);
	}
	throwGrenade(position: ObservablePoint, power: number) {
		const grenade = new Grenade(this.x, this.y, this.world, Texture.from(Textures.Grenade));

		this.world.createGameObject(grenade);
		this.world.emit('ledp', 'player world');

		grenade.launch(position, power);
		this.aim.position.set(position.x, position.y);
		this.toggleAim(true);
		this.switchAnimation(Resource.PlayerThrow, false);
	}

	setAim() {
		// this.aim = new Aim(this.x, this.y, this.world, Texture.from(Textures.Aim));
		this.aim.alpha = 0;
		this.world.createGameObject(this.aim);
	}
	toggleAim(isActive: boolean): void {
		const opacity = isActive ? 255 : 0;
		this.aim.alpha = opacity;
	}
	override idle() {
		this.switchAnimation('PlayerIdle', true);
	}
}
