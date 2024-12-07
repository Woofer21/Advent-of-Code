const fs = require("fs");

const input = fs
	.readFileSync("input.txt", "utf8")
	.split("\r\n")
	.map((line) => line.split(": "));

let totalCalibration = 0;

lineLoop: for (const line of input) {
	let [answer, equation] = line;
	answer = parseInt(answer);
	equation = equation.replaceAll(" ", " + ").split(" ");

	if (solve(answer, equation)) {
		totalCalibration += answer;
		continue lineLoop;
	}

	const equations = generateEquations(equation);
	for (const equation of equations) {
		if (solve(answer, equation)) {
			totalCalibration += answer;
			continue lineLoop;
		}
	}
}

console.log("Total Calibration: " + totalCalibration);

function generateEquations(equation) {
	let equations = [];
	let indices = [];

	for (let i = 0; i < equation.length; i++) {
		if (equation[i] === "+") indices.push(i);
	}

	function helper(current, index) {
		if (index === indices.length) {
			equations.push([...current]);
			return;
		}

		current[indices[index]] = "+";
		helper(current, index + 1);

		current[indices[index]] = "*";
		helper(current, index + 1);
	}

	helper([...equation], 0);
	return equations;
}

function solve(answer, equation) {
	let result = parseInt(equation[0]);

	for (let i = 1; i < equation.length; i += 2) {
		const operator = equation[i];
		const num = parseInt(equation[i + 1]);

		if (operator === "+") result += num;
		else if (operator === "*") result *= num;
	}

	return result === answer;
}
