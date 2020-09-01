import Pokemon from "./pokemon.js";
import random from './utils.js';


const player1 = new Pokemon({
	name: 'Pikachu',
	type: 'electric',
	hp: 500,
	selectors: 'character',
});
console.log(player1);

const $btn = $getElById('btn-kick');
const $btnBall = $getElById('btn-ball');

const jolts = document.querySelector('.jolts');
const balls = document.querySelector('.balls');
const control = document.querySelector('.control');
const $logs = document.querySelector('#logs');

const character = {
	name: 'Picachu',
	defaultHP: 100,
	damageHP: 100,
	elHP: $getElById('health-character'),
	elProgressbar: $getElById('progressbar-character'),
	renderHP,
	changeHP,
	renderHPLife,
	renderProgressbarHP
};

const enemy = {
	name: 'Charmander',
	defaultHP: 100,
	damageHP: 100,
	elHP: $getElById('health-enemy'),
	elProgressbar: $getElById('progressbar-enemy'),
	renderHP,
	changeHP,
	renderHPLife,
	renderProgressbarHP
};
function $getElById(id){
	return document.getElementById(id);
}
//Слушатель кнопки
control.addEventListener('click', function (e) {
	let target = e.target;
	console.log('Kick!', target.id);
	kickCount(target.id);
	character.changeHP(random(20));
	enemy.changeHP(random(20));

});

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


// Функция запуска игры
function init () {
	console.log('Start Game');
	character.renderHP();
	enemy.renderHP();

}
// Вызываем 2 функции рендиринга - табло и прогресс бар
function renderHP() {
	this.renderHPLife();
	this.renderProgressbarHP();
}

//Записываем в табло величину повреждения персонажа / величину жизни по умолчанию
function renderHPLife() {
	let {damageHP, defaultHP} = this;
	this.elHP.innerText = damageHP + ' / ' + defaultHP;
}

//Меняем длину прогресс бар в зависимости от величины повреждения персонажа
function renderProgressbarHP() {
	let {damageHP} = this;
	this.elProgressbar.style.width = damageHP + '%';
}

//Запрос в генератор сообщений о ходе битвы. Проверяем у кого меньше жизни то person проиграл & дизеблим кнопку. Если нет - отнимаем жизнью. Рендирим новые значения в табло.
function changeHP(count) {
	let {name, defaultHP} = this;
	this.damageHP -= count;
	let damageHP = this.damageHP;

	const log = this === enemy ? generateLog(this, character, count, damageHP, defaultHP ) : generateLog(this, enemy, count, damageHP, defaultHP);
	const $p = document.createElement('p');
	$p.innerText = log;
	// $logs.insertBefore($p, $logs.children[0]); // Устаревшая техника вставки
	$logs.prepend($p);
	if(damageHP <= 0) {
		this.renderHP();
		damageHP = 0;
		$btn.disabled = true;
		$btnBall.disabled = true;
		alert('Бедный '+name+' проиграл бой');
	} else {
		this.renderHP();
	}
}



function generateLog(firstPerson, secondPerson, count, damageHP, defaultHP) {

	const logs = [
		`${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.`,
		`${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.`,
		`${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
		`${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.`,
		`${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
		`${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.`,
		`${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.`,
		`${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника`,
		`${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.`,
		`${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.`
	];

	return `${logs[random(logs.length) - 1]} -${count} [${damageHP}/${defaultHP}]` ;
}


// Запуск игры
init();
