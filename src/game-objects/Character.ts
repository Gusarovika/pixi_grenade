import { World } from '../game/World';
import { Texture, Assets, AnimatedSprite } from 'pixi.js';
import { GameObject } from './GameObject';
// import { Resource } from './ENUMS';

export class Character extends GameObject {
	private animatedSprite: AnimatedSprite | null = null;

	constructor(world: World, x: number, y: number, scale: { x: number; y: number }) {
		super(world, x, y, scale); // Вызываем конструктор базового класса
	}

	async getTexture(animationResource: string): Promise<Texture[]> {
		const sheet = Assets.get(animationResource);
		const resource = Object.keys(sheet.textures).sort();
		const textureArray: Texture[] = [];

		for (let i = 0; i < resource.length; i++) {
			const texture = Texture.from(resource[i]);
			textureArray.push(texture);
		}
		return textureArray;
		// }
	}
	async setAnimation(animationResource: string) {
		const textureArray = await this.getTexture(animationResource);

		this.animatedSprite = new AnimatedSprite(textureArray);
		this.animatedSprite.anchor.set(0.5);
		this.animatedSprite.animationSpeed = 0.5;
		this.animatedSprite.play();

		this.addChild(this.animatedSprite);
	}
	async switchAnimation(animationResource: string, isLoop: boolean) {
		if (this.animatedSprite) {
			const textureArray = await this.getTexture(animationResource);
			// Меняем массив текстур и перезапускаем анимацию
			this.animatedSprite.textures = textureArray;
			this.animatedSprite.gotoAndPlay(0); // Начать анимацию с начала
			this.animatedSprite.loop = isLoop;
			if (!isLoop)
				this.animatedSprite.onComplete = () => {
					this.idle();
				};
		}
	}
	idle() {}
}
