import Pokemon from "./pokemon.js";
import { random, generateLog, insertLog, kickFun } from './utils.js';
import { pokemons } from './pokemons.js';

// const pikachu = pokemons.find(item => item.name === 'Pikachu');
let person1 = random(5);
let person2 = person1;
while (person2 === person1)
	{
	person2 = random(5);
}
console.log(pokemons[person1].name , pokemons[person2].name);

const player1 = new Pokemon({
	...(pokemons.find(item => item.name === pokemons[person1].name)),
	selectors: 'player1',

});
const $elName1 = document.getElementById('name-player1');
$elName1.innerText = pokemons[person1].name;
const $elImg = document.getElementById('img-player1');

$elImg.src = player1.img;

// const charmander = pokemons.find(item => item.name === pokemons[person2].name);
const player2 = new Pokemon({
	...(pokemons.find(item => item.name === pokemons[person2].name)),
	selectors: 'player2',
});
const $elName2 = document.getElementById('name-player2');
$elName2.innerText = pokemons[person2].name;
const $elImg2 = document.getElementById('img-player2');

$elImg2.src = player2.img;
const $control = document.querySelector('.control');

player1.attacks.forEach(item => {
	// console.log(item);
	const $btn = document.createElement('button');
	$btn.classList.add('button');
	$btn.innerText = item.name;
	const kickCount = kickFun(item.maxCount, $btn);
	$btn.addEventListener('click', () => {
		kickCount();
	player2.changeHP(random(20), $control, function(count) {
		let log = generateLog(player2, player1  , count);
		insertLog(log);
		});

	});

	$control.append($btn);
});



player2.attacks.forEach(item => {
	// console.log(item);
	const $btn = document.createElement('button');
	$btn.classList.add('button');
	$btn.innerText = item.name;
	const kickCount = kickFun(item.maxCount, $btn);
	$btn.addEventListener('click', () => {
		kickCount();
	player1.changeHP(random(20), $control, function(count) {
		let log = generateLog(player1, player2, count);
		insertLog(log);
		});
	});

	$control.append($btn);
});

//Вспомогательная ф. получения эл. по id
// function $getElById(id){
// 	return document.getElementById(id);
// }
// const $btn = $getElById('btn-kick');
// const $btnBall = $getElById('btn-ball');
// const control = document.querySelector('.control');
// const jolts = document.querySelector('.jolts');
// const balls = document.querySelector('.balls');






