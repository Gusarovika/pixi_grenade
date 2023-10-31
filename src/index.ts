// Import region
import * as GameConfig from './gameConfig';
import { Manager } from './managers/GameManager';
import { LoaderScene } from './scenes/LoaderScene';
// endregion

// Initialize the game manager from the game configuration.
Manager.initialize(GameConfig.GAME_WIDTH, GameConfig.GAME_HEIGHT, GameConfig.backgroundColor);

// Create a new instance of the LoaderScene class.
const loader: LoaderScene = new LoaderScene();

// Change the current scene in the game manager to the loader scene.
Manager.changeScene(loader);
