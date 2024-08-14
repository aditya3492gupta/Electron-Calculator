let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('btn'));

// Handle button clicks
buttons.map(button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;

        switch (buttonText) {
            case 'C':
            case 'AC':
                display.value = '';
                break;
            case '=':
                e.preventDefault();
                calculateResult(display.value);
                break;
            case '√':
                display.value = Math.sqrt(eval(display.value));
                break;
            case 'sin':
                display.value = Math.sin(eval(display.value));
                break;
            case 'cos':
                display.value = Math.cos(eval(display.value));
                break;
            case 'tan':
                display.value = Math.tan(eval(display.value));
                break;
            case 'log':
                display.value = Math.log10(eval(display.value));
                break;
            case 'ln':
                display.value = Math.log(eval(display.value));
                break;
            case 'π':
                display.value += Math.PI;
                break;
            case 'e':
                display.value += Math.E;
                break;
            default:
                display.value += buttonText;
                break;
        }
    });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    let key = e.key;
    let button = document.querySelector(`.btn[data-key="${key}"]`);

    if (button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    }

    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
        case '(':
        case ')':
            display.value += key;
            break;
        case 'Enter':
        case '=':
            e.preventDefault();
            calculateResult(display.value);
            break;
        case 'Backspace':
            display.value = display.value.slice(0, -1);
            break;
        case 'Escape':
            display.value = '';
            break;
        case '%':
            display.value += '/100';
            break;
        default:
            break;
    }
});

// Function to evaluate the expression
function calculateResult(expression) {
    try {
        let result = eval(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        console.log("Error in calculation:", error);
    }
}
