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

	changeHP = (count, $control, cb) => {

		this.hp.current -= count;

		if(this.hp.current <= 0) {
			this.renderHP();
			this.hp.currentP = 0;
			let buttons = $control.querySelectorAll('button');
			for(let button of buttons) {

				button.disabled = true;
			}

			alert('Poor' + this.name + 'lost the battle');
		} else {
			this.renderHP();
		}
		cb(count);
	}


	renderHP = () => {
		this.renderHPLife();
		this.renderProgressbarHP();
	}


	renderHPLife = () => {
		const {elHP, hp:{ current, total }} = this;
		elHP.innerText = current + ' / ' + total;
	}


	renderProgressbarHP = () => {
		const {hp: { current, total }, elProgressbar} = this;
		const procent = current / (total / 100);
		elProgressbar.style.width = procent + '%';
	}
	}

	export default Pokemon;