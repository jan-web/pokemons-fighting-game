

// Получаем случайное число от 1 до num
function random(max, min = 0) {
	const num = max - min;
	return Math.ceil(Math.random() * num) + min;
}

export default random;