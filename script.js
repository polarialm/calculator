

function add (array) {
    return array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue 
    })
}

function subtract (array) {
    return array.reduce((accumulator, currentValue) => {
        return accumulator - currentValue 
    })
}

function multiply (array) {
    return array.reduce((accumulator, currentValue) => {
        return accumulator * currentValue 
    })
}

function divide (array) {
    return array.reduce((accumulator, currentValue) => {
        return accumulator / currentValue 
    })
}

function operate (array) {
    let nums = []
    nums.push(Number(array[0]), Number(array[2]))
    switch (array[1]) {
        case '+'  :
            return add(nums);
        case '-' : 
            return subtract(nums);
        case '*' :
            return multiply(nums);
        case '/' :
            return divide(nums);
        default:
            alert ('Not a valid operator.');
    }
    
}


const calcNums = document.querySelector('.calc-nums')
const calcDisplay = document.querySelector('.calc-screen')

for (i = 0; i <= 10; i++) {
    if (i <= 9) {
    const button = document.createElement('button')
    button.textContent = i
    calcNums.appendChild(button)
    } else {
    const button = document.createElement('button')
    button.textContent = '.'
    calcNums.appendChild(button)
    
    }
}


const calcOps = document.querySelector('.calc-ops')
initOpButtons()
function initOpButtons () {
    const add = document.createElement('button')
    add.textContent = '+'
    const subtract = document.createElement('button')
    subtract.textContent = '-'
    const multi = document.createElement('button')
    multi.textContent = '*'
    const divide = document.createElement('button')
    divide.textContent = '/'
    const clear = document.createElement('button')
    clear.textContent = 'clear'
    const equals = document.createElement('button')
    equals.textContent = '='
    calcOps.appendChild(add)
    calcOps.appendChild(subtract)
    calcOps.appendChild(multi)
    calcOps.appendChild(divide)
    calcOps.appendChild(clear)
    calcOps.appendChild(equals)
}

const numButtons = calcNums.querySelectorAll('button')
const nbutArr = Array.from(numButtons)


numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent)
        disableDot(nbutArr) // finish this!
    })
})

let Numbero = ""



function updateDisplay (number) {
    Numbero = Numbero + number
    calcDisplay.textContent = Numbero
}

function clearDisplay () {
    Numbero = ""
    calcDisplay.textContent = Numbero
}

function disableDot (button) {
    let num = []
    num = calcDisplay.textContent.split('')
    for (let i = 0; i < num.length; i++) {
        if (num[i] === '.') {
            button[10].classList.add('disabled')
            return 0
        } else button[10].classList.remove('disabled')
    }
}

function hasDot (button) {
    if (button.classList.contains('disabled') === false) {
        button.classList.remove('disabled')
    } 
}


let opStore = []

// First a user clicks a number
// Then the user clicks a operator
// Then they click another number
// Then they click =

/* When the user clicks on a number and then a operator
we need to store the number and the operator onto opStore
Then, when the users clicks on another number and then on equal, we store the number onto opStore 
and pass it to operate() */

function round (number) {
    return Math.floor(number*1000)/1000
}

function divideByZero (array) {
    if (array[1] === '/'  && array[2] === '0') {
        return false
    }
}



const opButtons = calcOps.querySelectorAll('button')

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent === 'clear' || button.textContent === '=') {
            switch (button.textContent) {
                case '=':
                    hasDot(nbutArr[10])
                    if (opStore.length >= 2) {
                        opStore.push(Numbero)
                    }
                    if (divideByZero(opStore) === false) {
                        alert('No.')
                        return false
                    }
                    let result = round(operate(opStore))
                    calcDisplay.textContent = result
                    Numbero = calcDisplay.textContent
                    opStore = []
                    break;
                case 'clear':
                    clearDisplay()
                    opStore = []
                    Numbero = ""
                    break;
                default: 
                    alert("this shouldn't happen")
            }
        } else {
            if (opStore.length >= 2) {
                opStore.push(Numbero)
                if (divideByZero(opStore) === false) {
                    alert('No.')
                    return false
                }
                let result = round(operate(opStore))
                calcDisplay.textContent = result
                Numbero = calcDisplay.textContent
                opStore = []
                opStore.push(calcDisplay.textContent)
                opStore.push(button.textContent)
                Numbero = ""
            } else {
                opStore.push(calcDisplay.textContent)
                opStore.push(button.textContent)
                Numbero = ""
            }
            
        }
    })
}) // Need to make the calculator do the operation when the user clicks "equals"