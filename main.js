
import Game from './game.js';

	const game = new Game();
	game.resetGame();

	game.startBtn.addEventListener('click', () => {
		game.startBtn.remove();
		game.startGame();
	});

	game.resetBtn.addEventListener('click', () => {
		game.resetGame();
		game.resetBtn.remove();
	})









