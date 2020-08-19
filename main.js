//Задача1
const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';
function getRow(firstRow, secondRow) {
	let firstRowA = countA(firstRow) ,
		secondRowA = countA(secondRow);
	if (firstRowA > secondRowA) {
		return firstRow
	} else if (firstRowA < secondRowA) {
		return secondRow;
	} else {
		return firstRow + ' содержит столько же букв а как и в ' + secondRow;
	}
}

function countA(str){
	let counter = 0;
	for (i = 0; i < str.length; i++){
		(str[i].charAt() === 'а') ? counter++ : true;
	}
	return counter;
}

console.log(getRow(firstRow, secondRow)); // мама мыла раму

//Задача 2
function formattedPhone(phone) {
	return dig(phone, 0, 2) + ' ' + '(' + dig(phone, 2, 3) + ')' + ' ' + dig(phone, 5, 3) + '-' + dig(phone, 8, 2) + '-' + dig(phone, 10, 2);
}

function dig (str, number, quantity) {
	let result = '';
	for (i = number; i < (number+quantity); i++){
		result +=str[i];
	}
	return result;
}
console.log(formattedPhone('+71234567890')); // +7 (123) 456-78-90