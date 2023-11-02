import { World } from '../game/World';
import { Texture, Assets, AnimatedSprite } from 'pixi.js';
import { GameObject } from './GameObject';

export class Character extends GameObject {
	private animatedSprite: AnimatedSprite | null = null;

	constructor(world: World, x: number, y: number, scale: { x: number; y: number }) {
		super(world, x, y, scale);
	}

	// Load and return an array of textures for the animation.
	async getTexture(animationResource: string): Promise<Texture[]> {
		const sheet = Assets.get(animationResource);
		const resource = Object.keys(sheet.textures).sort();
		const textureArray: Texture[] = [];

		for (let i = 0; i < resource.length; i++) {
			const texture = Texture.from(resource[i]);
			textureArray.push(texture);
		}
		return textureArray;
	}

	// Set the animation of the character using a given animation resource.
	async setAnimation(animationResource: string): Promise<void> {
		const textureArray = await this.getTexture(animationResource);

		this.animatedSprite = new AnimatedSprite(textureArray);
		this.animatedSprite.anchor.set(0.5, 0.7);
		this.animatedSprite.animationSpeed = 0.5;
		this.animatedSprite.play();

		this.addChild(this.animatedSprite);
	}

	// Switch the animation of the character using a given animation resource.
	async switchAnimation(animationResource: string, isLoop: boolean, needIdle: boolean = true): Promise<void> {
		if (this.animatedSprite) {
			const textureArray = await this.getTexture(animationResource);
			this.animatedSprite.textures = textureArray;
			this.animatedSprite.play();

			this.animatedSprite.loop = isLoop;
			if (needIdle) {
				this.animatedSprite.onComplete = () => {
					this.idle();
				};
			} else {
				this.animatedSprite.onComplete = () => {
					this.animatedSprite && this.animatedSprite.stop();
				};
			}
		}
	}

	// An empty method intended for implementing character idling.
	idle() {}
}
