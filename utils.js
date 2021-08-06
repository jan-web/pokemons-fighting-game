
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
		`${name} remembered something important, but suddenly ${enemyName}, not remembering himself from fright, hit the enemy in the forearm.`,
		`${name} choked, and for this ${enemyName} in fright applied a direct knee blow to the enemy's forehead.`,
		`${name} was forgotten, but at this time the impudent ${enemyName}, having made a willful decision, silently approached from behind, hit.`,
		`${name} came to his senses, but suddenly ${enemyName} accidentally struck a powerful blow.`,
		`${name} choked, but at that time ${enemyName} reluctantly smashed the enemy \ <censored \> with his fist .`,
		`${name} was surprised, and ${enemyName} staggered and slapped a sneaky blow.`,
		`${name} blew his nose, but unexpectedly ${enemyName} made a bludgeoning blow.`,
		`${name} staggered, and suddenly the impudent ${enemyName} hit the enemy's leg for no reason`,
		`${name} was upset when suddenly, unexpectedly, ${enemyName} accidentally slammed his foot into the opponent's stomach.`,
		`${name} tried to say something, but suddenly, unexpectedly ${enemyName} out of boredom, shattered an opponent's eyebrow.`
	];

	return `${logs[random(logs.length) - 1]} -${count} [${current}/${total}]` ;
}
