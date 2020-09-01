class Selectors {
	constructor(name) {
		this.elHP = document.getElementById('health-${name}');
		this.elProgressbar = document.getElementById('progressbar-${name}');
	}
}

class Pokemon extends Selectors{
	constructor({name, hp, type, selectors}) {
		super(selectors);
		 
		this.name = name;
		this.hp = {
			current: hp,
			total: hp,
		};
		this.type = type;
	}
}

export default Pokemon;