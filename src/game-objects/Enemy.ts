import { World } from '../game/World';
// import { Texture, Assets, AnimatedSprite } from 'pixi.js';
import { Character } from './Character';
// import { Resource } from './ENUMS';

export class Enemy extends Character {
	// private animatedSprite: AnimatedSprite | null = null;
	constructor(world: World, x: number, y: number) {
		super(world, x, y); // Вызываем конструктор базового класса
		this.scale.set(0.15, 0.15);

		// console.log(animatedSprite);

		// this.animatedSprite = new AnimatedSprite([]);
		// this.addChild(this.animatedSprite);
	}
	// async setAnimation() {
	// 	const sheet = await Assets.load(Resource.EnemyIdle);
	// 	const resource = Object.keys(sheet.textures).sort();
	// 	const textureArray: Texture[] = [];
	// 	console.log(Object.keys(sheet.textures).sort());

	// 	for (let i = 0; i < resource.length; i++) {
	// 		const texture = Texture.from(resource[i]);

	// 		textureArray.push(texture);
	// 	}

	// 	this.animatedSprite = new AnimatedSprite(textureArray);
	// 	this.animatedSprite.anchor.set(0.5);
	// 	this.animatedSprite.animationSpeed = 0.5;
	// 	this.animatedSprite.play();

	// 	// Добавляем animatedSprite на сцену
	// 	this.addChild(this.animatedSprite);
	// }
	// switchAnimation(newTextureArray: Texture[]) {
	// 	if (this.animatedSprite) {
	// 		// Меняем массив текстур и перезапускаем анимацию
	// 		this.animatedSprite.textures = newTextureArray;
	// 		this.animatedSprite.gotoAndPlay(0); // Начать анимацию с начала
	// 	}
	// }
}
