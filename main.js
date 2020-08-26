const $btn = document.getElementById('btn-kick');
const character = {
	name: 'Picachu',
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),
	renderHP,
	changeHP,
}

const enemy = {
	name: 'Charmander',
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),
	renderHP,
	changeHP,
}
//Слушатель кнопки
$btn.addEventListener('click', function () {
	console.log('Kick!');
	character.changeHP(random(20));
	enemy.changeHP(random(20));

});
// Функция запуска игры
function init () {
	console.log('Start Game');
	character.renderHP();
	enemy.renderHP();
}
// Вызываем 2 функции рендиринга - табло и прогресс бар
function renderHP() {
	renderHPLife.bind(this)();
	renderProgressbarHP.bind(this)();
}

//Записываем в табло величину повреждения персонажа / величину жизни по умолчанию
function renderHPLife() {
	this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

//Меняем длину прогресс бар в зависимости от величины повреждения персонажа
function renderProgressbarHP() {
	this.elProgressbar.style.width = this.damageHP + '%';
}

//Проверяем у кого меньше жизни то person проиграл & дизеблим кнопку. Если нет - отнимаем жизнью. Рендирим новые значения в табло.
function changeHP(count) {
	if(this.damageHP < count) {
		this.damageHP = 0
		alert('Бедный '+this.name+' проиграл бой');
		$btn.disabled = true;
	} else {
		this.damageHP -= count;
	}
	this.renderHP();

}

// Получаем случайное число от 1 до num
function random(num) {
	return Math.ceil(Math.random() * num);
}
// Запуск игры
init();
