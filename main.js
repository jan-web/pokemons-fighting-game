import Pokemon from "./pokemon.js";
import random from './utils.js';


const player1 = new Pokemon({
	name: 'Pikachu',
	type: 'electric',
	hp: 100,
	selectors: 'character',
});
const player2 = new Pokemon({
	name: 'Charmander',
	type: 'fire',
	hp: 100,
	selectors: 'enemy',
});


function $getElById(id){
	return document.getElementById(id);
}
const $btn = $getElById('btn-kick');
const $btnBall = $getElById('btn-ball');

const jolts = document.querySelector('.jolts');
const balls = document.querySelector('.balls');
const control = document.querySelector('.control');
const $logs = document.querySelector('#logs');


//Слушатель кнопки
control.addEventListener('click', function (e) {
	let target = e.target;
	console.log('Kick!', target.id);
	kickCount(target.id);
	player1.changeHP(random(20), $btn, $btnBall, function(count) {
		console.log('Some change after changeHP ', count);
		let log = generateLog(player1, player2, count);
		insertLog(log);

	});
	player2.changeHP(random(20),$btn, $btnBall, function(count) {
		console.log('Some change after changeHP ', count);
		console.log(generateLog(player1, player2, count));
		let log = generateLog(player1, player2, count);
		insertLog(log);
	});


});

function insertLog(log) {
	const $p = document.createElement('p');
	$p.innerText = log;
	$logs.prepend($p);
}

//Ф. подсчета остатка кликов по кнопкам различных атак
const kickCount = kickFun();
function kickFun () {
	let trunderKick = 6;
	let fireBall = 6;
	return function (id){
		if(id === 'btn-kick'){
			if (trunderKick > 1) {
				trunderKick--;
				console.log('Количество нанесённых ударов типа Trunder Jolt = ', 6 - trunderKick);
				jolts.textContent = trunderKick;
				}
			else {
				jolts.textContent = 0;
				console.log('Количество нанесённых ударов типа Trunder Jolt = ', 6 );
				$btn.disabled = true;
				}
		}
		if(id === 'btn-ball'){
			if (fireBall > 1) {
				fireBall--;
				console.log('Количество нанесённых ударов типа Fire Ball = ', 6 - fireBall);
				balls.textContent = fireBall;
			}
			else {
				balls.textContent = 0;
				console.log('Количество нанесённых ударов типа Fire Ball = ', 6);
				$btnBall.disabled = true;
			}
		}

	};
}

function generateLog(player1, player2, count) {

	const {name, hp: { current, total }} = player1;
	const {name: enemyName } = player2;

	const logs = [
		`${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага.`,
		`${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага.`,
		`${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
		`${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар.`,
		`${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
		`${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар.`,
		`${name} высморкался, но неожиданно ${enemyName} провел дробящий удар.`,
		`${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника`,
		`${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника.`,
		`${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику.`
	];

	return `${logs[random(logs.length) - 1]} -${count} [${current}/${total}]` ;
}
