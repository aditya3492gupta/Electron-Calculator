const loginButton = document.getElementById('loginButton');
const resultElement = document.getElementById('result');


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
    if (result === 'authenticated') {
        window.location.href = 'calculator.html';
    } else {
        resultElement.textContent = "Login Failed!";
        resultElement.style.color = 'red';
    }
});


