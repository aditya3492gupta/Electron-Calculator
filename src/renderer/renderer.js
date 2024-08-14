const loginButton = document.getElementById('loginButton');
const resultElement = document.getElementById('result');
const display = document.getElementById('display-calculator');
// const { Console } = require('node:console');
// const { Console } = console;
// var nodeConsole = require('console');
// var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
// myConsole.log('Hello World!');

console.log('renderer console', resultElement, display);
loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (window.electronAPI && window.electronAPI.authenticate) {
        window.electronAPI.authenticate(username, password);
    } else {
        console.error("electronAPI is not defined");
    }
});


window.electronAPI.onAuthResult((result) => {
    console.log('onAuthResult', result);

    // process.stdout.write('onAuthResult');
    window.electronAPI.log(result);
    window.electronAPI.log(window.electronAPI.onCalculationResult ? 'present' : 'absent');

    if (result === 'authenticated') {
        window.location.href = 'calculator.html';
    } else {
        resultElement.textContent = "Login Failed!";
        resultElement.style.color = 'red';
    }
    window.electronAPI.onCalculationResult(999);
});


window.electronAPI.onCalculationResult((result) => {
    // if (result === 'calculate') {
    //     cons
    // } else {
    //     resultElement.textContent = "Login Failed!";
    //     resultElement.style.color = 'red';
    // }

    display.value = result;

});



