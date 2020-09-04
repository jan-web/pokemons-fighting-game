import Pokemon from "./pokemon.js";
import { random, generateLog, insertLog, kickFun } from './utils.js';
import { pokemons } from './pokemons.js';
class Game {
	constructor (){

		this.randPerson1 = random(5);
		this.randPerson2 = this.randPerson1;
		this.selectPersons();
		this.control = document.querySelector('.control');
		this.resetPlace = document.querySelector('.resetBtn');
		this.startBtn = document.createElement('button');
		this.resetBtn = document.createElement('button');
		this.logs = document.querySelector('#logs');
		this.player1 = {};
		this.player2 = {};
	}
	selectPersons = () => {
		while (this.randPerson2 === this.randPerson1)
		{
			this.randPerson2 = random(5);
		}
	}
	generateButtons = (player1, player2, control) =>{
		player1.attacks.forEach(item => {
			const $btn = document.createElement('button');
			$btn.classList.add('button');
			$btn.innerText = item.name;

			const kickCount = kickFun(item.maxCount, $btn);
			$btn.addEventListener('click', () => {
					kickCount();
					player2.changeHP(random(20), control, function(count) {
					let log = generateLog(player1, player2, count);
					insertLog(log);
					});
			});

			this.control.append($btn);
		});
	};
	startGame = () => {
		//создание игроков
		// Создаем 1го игрока типа Pokemon используя базу данных pokemons.js
		this.player1 = new Pokemon({
			...(pokemons.find(item => item.name === pokemons[this.randPerson1].name)),
			selectors: 'player1',
		});
		// Вписываем правильное имя перcонажа в табло
		const $elName1 = document.getElementById('name-player1');
		$elName1.innerText = pokemons[this.randPerson1].name;
		const $elImg = document.getElementById('img-player1');
		// Меняем картинку на правильную
		$elImg.src = this.player1.img;

		// Создаем 1го игрока типа Pokemon используя базу данных pokemons.js
		this.player2 = new Pokemon({
			...(pokemons.find(item => item.name === pokemons[this.randPerson2].name)),
			selectors: 'player2',
		});
		// Вписываем правильное имя первоснажа в табло
		const $elName2 = document.getElementById('name-player2');
		$elName2.innerText = pokemons[this.randPerson2].name;
		const $elImg2 = document.getElementById('img-player2');
		// Меняем картинку на правильную
		$elImg2.src = this.player2.img;

		//Создаем кнопки 1му игроку
		this.generateButtons(this.player1, this.player2, this.control);
		//Создаем кнопки 2му игроку
		this.generateButtons(this.player2, this.player1, this.control);

		this.resetBtn.classList.add('button');
		this.resetBtn.innerText = "Reset Game";
		this.resetPlace.append(this.resetBtn);
	}



	resetGame = () => {
		const allButtons = document.querySelectorAll('.control .button');
		allButtons.forEach($item => $item.remove());
		logs.innerHTML = '';


		this.startBtn.classList.add('button');
		this.startBtn.innerText = "Start Game";

		this.control.append(this.startBtn);
	};
}

export default Game;