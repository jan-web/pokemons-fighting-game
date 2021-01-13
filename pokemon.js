class Selectors {
	constructor(name) {
		this.elHP = document.getElementById(`health-${name}`);
		this.elProgressbar = document.getElementById(`progressbar-${name}`);
	}
}

class Pokemon extends Selectors{
	constructor({id, name, hp, type, selectors, img, attacks = []}) {
		super(selectors);

		this.id = id,
		this.name = name;
		this.hp = {
			current: hp,
			total: hp,
		};
		this.type = type;
		this.img = img;
		this.attacks = attacks;
		this.renderHP();
	}
	//Запрос в генератор сообщений о ходе битвы. Проверяем у кого меньше жизни то person проиграл & дизеблим кнопку. Если нет - отнимаем жизнью. Рендирим новые значения в табло.
	changeHP = (count, $control, cb) => {

		this.hp.current -= count;

		if(this.hp.current <= 0) {
			this.renderHP();
			this.hp.currentP = 0;
			let buttons = $control.querySelectorAll('button');
			for(let button of buttons) {
				// console.log(button);
				button.disabled = true;
			}

			alert('Бедный '+this.name+' проиграл бой');
		} else {
			this.renderHP();
		}
		cb(count);
	}

	// Вызываем 2 функции рендиринга - табло и прогресс бар
	renderHP = () => {
		this.renderHPLife();
		this.renderProgressbarHP();
	}

	//Записываем в табло величину повреждения персонажа / величину жизни по умолчанию
	renderHPLife = () => {
		const {elHP, hp:{ current, total }} = this;
		elHP.innerText = current + ' / ' + total;
	}

	//Меняем длину прогресс бар в зависимости от величины повреждения персонажа
	renderProgressbarHP = () => {
		const {hp: { current, total }, elProgressbar} = this;
		const procent = current / (total / 100);
		elProgressbar.style.width = procent + '%';
	}
	}

	export default Pokemon;