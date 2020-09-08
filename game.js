import Pokemon from "./pokemon.js";
import { random, generateLog, insertLog, kickFun } from './utils.js';
// import { pokemons } from './pokemons.js';
class Game {
	constructor (){


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
	// Получаем одного персонажа с сервера
	 getRandomPokemon = async () => {
		const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
		const body = await response.json();
		return body;
	  };
	  // Получаем рандомное значение повреждения в зависимости от атаки и персонажей с сервера
	 getRandomDamage = async (id_player1, id_player2, id_attack) => {
		const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${id_player1}&attackId=${id_attack}&player2id=${id_player2}`);
		const body = await response.json();
		return body;
	  };


	generateButtons =  (player1, player2, control) =>{
		player1.attacks.forEach(item => {
			
			const $btn = document.createElement('button');
			$btn.classList.add('button');
			$btn.innerText = item.name;

			const kickCount = kickFun(item.maxCount, $btn);
			$btn.addEventListener('click', async () => {
					kickCount();

					const damageObj = await this.getRandomDamage(player1.id, player2.id, item.id);
					// Добавляем порадение для врага полученное с сервера
					player2.changeHP(damageObj.kick.player2, control, function(count) {
					let log = generateLog(player1, player2, count);
					insertLog(log);
					});
			});

			this.control.append($btn);
		});
	};
	startGame = async() => {
		const randomPokemon1 = await this.getRandomPokemon();
		// Создаем 1го игрока типа Pokemon используя базу данных на сервере
		this.player1 = new Pokemon({
			...(randomPokemon1),
			selectors: 'player1',
		});
		// Вписываем правильное имя перcонажа в табло
		const $elName1 = document.getElementById('name-player1');
		$elName1.innerText = randomPokemon1.name;
		const $elImg = document.getElementById('img-player1');
		// Меняем картинку на правильную
		if (this.player1.img === 'http://sify4321.000webhostapp.com/charmander.png'){
			$elImg.src = 'assets/charmander.png';
		} else {
			$elImg.src = this.player1.img;
		}
		let randomPokemon2 = randomPokemon1;
		while (true)
		{
			randomPokemon2 = await this.getRandomPokemon();
			if (randomPokemon2.name != randomPokemon1.name)
			{
				break;
			}
		}

		// Создаем 2го игрока типа Pokemon используя базу данных на сервере
		this.player2 = new Pokemon({
			...(randomPokemon2),
			selectors: 'player2',
		});
		// Вписываем правильное имя персонажа в табло
		const $elName2 = document.getElementById('name-player2');
		$elName2.innerText = randomPokemon2.name;
		const $elImg2 = document.getElementById('img-player2');
		// Меняем картинку на правильную
		if (this.player2.img === 'http://sify4321.000webhostapp.com/charmander.png'){
			$elImg2.src = 'assets/charmander.png';
		} else {
			$elImg2.src = this.player2.img;
		}

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
		this.startBtn.innerText = "Start New Game";
		this.resetBtn.remove();
		this.control.append(this.startBtn);
	};
}

export default Game;