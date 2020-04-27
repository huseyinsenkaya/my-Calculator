// document.addEventListener('DOMContentLoaded', () => {
//     let firstNumber;
//     let operator = null;
//     let newNumber;

//     //getting result text
//     let resultTitle = document.querySelector('.screen');

//     //type number
//     const numberBttn = document.querySelectorAll('.calc-button #num');
//     Array.from(numberBttn).forEach(bttn => {
//         bttn.addEventListener('click', (number) => {
//             if (resultTitle.textContent === '0')
//                 resultTitle.textContent = '';
//             switch (number.target.textContent) {
//                 case '1':
//                     resultTitle.textContent += '1';
//                     break;
//                 case '2':
//                     resultTitle.textContent += '2';
//                     break;
//                 case '3':
//                     resultTitle.textContent += '3';
//                     break;
//                 case '4':
//                     resultTitle.textContent += '4';
//                     break;
//                 case '5':
//                     resultTitle.textContent += '5';
//                     break;
//                 case '6':
//                     resultTitle.textContent += '6';
//                     break;
//                 case '7':
//                     resultTitle.textContent += '7';
//                     break;
//                 case '8':
//                     resultTitle.textContent += '8';
//                     break;
//                 case '9':
//                     resultTitle.textContent += '9';
//                     break;
//                 case '0':
//                     resultTitle.textContent += '0';
//                     break;
//                 case '.':
//                     resultTitle.textContent += '.';
//                     break;
//             }
//         })
//     });

//     //clear numbers 'C'
//     document
//         .querySelector('.first button:nth-child(1)')
//         .addEventListener('click', () => {
//             resultTitle.textContent = '0';
//         });

//     //delete digit '←'
//     document.querySelector('.first button:last-child').addEventListener('click', () => {
//         resultTitle.textContent = resultTitle.textContent.slice(0, -1);
//     });

//     //divide number '/'
//     document.querySelector('.first button:nth-child(2)').addEventListener('click', () => {
//         firstNumber = Number(resultTitle.textContent);
//         resultTitle.textContent = '';
//         operator = '/';
//     });

//     //multiplication of numbers '*'
//     document.querySelector('.first button:nth-child(3)').addEventListener('click', () => {
//         firstNumber = Number(resultTitle.textContent);
//         resultTitle.textContent = '';
//         operator = '*';
//     });

//     //sum of numbers '+'
//     document.querySelector('.third button:last-child').addEventListener('click', () => {
//         firstNumber = Number(resultTitle.textContent);
//         resultTitle.textContent = '';
//         operator = '+';
//     });
//     //subtraction '-'
//     document.querySelector('.second button:last-child').addEventListener('click', () => {
//         firstNumber = Number(resultTitle.textContent);
//         resultTitle.textContent = '';
//         operator = '-';
//     });

//     //percentage
//     document.querySelector('.fifth button:first-child').addEventListener('click', () => {
//         firstNumber = Number(resultTitle.textContent);
//         resultTitle.textContent = '';
//         operator = '%';
//     });

//     //Result '='
//     document.querySelector('.fourth #tall').addEventListener('click', () => {
//         switch (operator) {
//             case '/':
//                 newNumber = firstNumber / Number(resultTitle.textContent);
//                 resultTitle.textContent = newNumber;
//                 operator = null;
//                 break;
//             case '*':
//                 newNumber = firstNumber * Number(resultTitle.textContent);
//                 resultTitle.textContent = newNumber;
//                 operator = null;
//                 break;
//             case '+':
//                 newNumber = firstNumber + Number(resultTitle.textContent);
//                 resultTitle.textContent = newNumber;
//                 operator = null;
//                 break;
//             case '-':
//                 newNumber = firstNumber - Number(resultTitle.textContent);
//                 resultTitle.textContent = newNumber;
//                 operator = null;
//                 break;
//             case '%':
//                 newNumber = (firstNumber / 100) * Number(resultTitle.textContent);
//                 resultTitle.textContent = newNumber;
//                 operator = null;
//                 break;
//         }
//     });
// });



//a little bit smart version of calculator app
let runningTotal = 0;
let buffer = '0';
let prevOperator;
const screen = document.querySelector('.screen');
document.querySelector('.calc-buttons').addEventListener('click', (event) => {
    buttonClick(event.target.textContent);
});
function buttonClick(value) {
    if (isNaN(Number(value))) 
        handleSymbol(value);
    else 
        handleNumber(value);
    rerender();
}
function handleNumber(value) {
    if (Number(buffer) === 0)
        buffer = value;
    else
        buffer += ''+ value;
}
function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            prevOperator = null;
            break;
        case '=':
            if (prevOperator === null)
                return;
            flushOperation(Number(buffer));
            prevOperator = null;
            buffer = '' + runningTotal;
            runningTotal=0;
            break;
        case '←':
            if(buffer.length === 1)
                buffer='0';
            else
                buffer=buffer.substring(0, buffer.length - 1);
            break;
        default:
            handleMath(value);
            break;
    }
}
function handleMath(value) {
    const numBuffer = Number(buffer);
    if(runningTotal === 0)
        runningTotal=numBuffer;
    else
        flushOperation(numBuffer);
    prevOperator = value;
    buffer='0';
}
function flushOperation(numBuffer) {
    if(prevOperator === '+') {
        runningTotal += numBuffer;
    } else if (prevOperator === '-') {
        runningTotal -= numBuffer;
    } else if (prevOperator === 'x') {
        runningTotal *= numBuffer;
    } else if (prevOperator === '/') {
        runningTotal /= numBuffer;
    }
}
function rerender() {
    screen.textContent=buffer;
}