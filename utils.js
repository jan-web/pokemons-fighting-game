
// Получаем случайное число от 1 до num
export function random(max, min = 0) {
	const num = max - min;
	return Math.ceil(Math.random() * num) + min;
}
const $logs = document.querySelector('#logs');
export function insertLog(log) {
	const $p = document.createElement('p');
	$p.innerText = log;
	$logs.prepend($p);
}

//Ф. подсчета остатка кликов по кнопкам различных атак
// const kickCount = kickFun();
export function kickFun (maxCount, btn) {
	const btnName = btn.innerText;
	btn.innerText = btnName + ' ' + maxCount;
	return function (){
		if (maxCount > 1) {
			maxCount--;
			btn.innerText = btnName + ' ' + maxCount;
		} else {
			btn.innerText = btnName + ' ' + 0;
			btn.disabled = true;
		}

	};
}

export function generateLog(player1, player2, count) {

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
