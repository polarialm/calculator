

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

let n = 0;
for (let i=0; i < 4; i++) {
    const row = document.createElement('div')
    row.classList.add('calc-num-rows')
    calcNums.appendChild(row)
    if (n < 9) {
        for (let x=0; x<3; x++) {
            const button = document.createElement('button')
            button.textContent = n
            row.appendChild(button)
            n++
        }
    } else {
        for (let y=0; y<=2; y++) {
            const button = document.createElement('button')
            /*if (y === 0) {
                button.textContent = n
                button.setAttribute('id', 'calc-nine')
            } else button.textContent = '.'*/
            switch (y) {
                case 0:
                    button.textContent = n
                    button.setAttribute('id', 'calc-nine')
                    break;
                case 1:
                    button.textContent = '.'
                    break;
                case 2:
                    button.textContent = '←'
                    break;
            }
            row.appendChild(button)
            
        }
    }
}

const operations = ['+', '-', '*', '/', 'clear', '=']

const calcOps = document.querySelector('.calc-ops')
initOpButtons()
function initOpButtons () {
    let n = 0;
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div')
        row.classList.add('calc-op-rows')
        calcOps.appendChild(row)
        for (let x = 0; x < 2; x++) {
            const button = document.createElement('button')
            button.textContent = operations[n]
            row.appendChild(button)
            n++
        }
    }
}

/*
function initOpButtons () {
    for (let i=0; i < operations.length; i++) {
        const button = document.createElement('button')
        button.textContent = operations[i]
        calcOps.appendChild(button)
    }
}*/ 
const numButtons = calcNums.querySelectorAll('button')
const nbutArr = Array.from(numButtons)


numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent === '←') {
            updateDisplay(button.textContent)
        } else {
            updateDisplay(button.textContent)
            disableDot(nbutArr)
        }
    })
})

let Numbero = ""



function updateDisplay (number) {
    if (number !== '←' && number !== 'Backspace') {
        Numbero = Numbero + number
        calcDisplay.textContent = Numbero
    } else {
        let scrArr = []
        scrArr = calcDisplay.textContent.split('')
        if (scrArr.length < 2) {
            clearDisplay()
        } else {
            scrArr.pop()
            let result = ""
            for(i = 0; i < scrArr.length; i++) {
                result = result.concat(scrArr[i])
            }
            Numbero = result
            calcDisplay.textContent = Numbero
        }

    }

}

document.addEventListener("keydown", (key) => {
    console.log(key.key)
    if (key.key === 'Backspace') {
        updateDisplay(key.key)
    } else {
        pickAThing(key.key)
    }
})

function clearDisplay () {
    Numbero = ""
    calcDisplay.textContent = 0
}

let isDisabled = 0

function disableDot (button) {
    let num = []
    num = calcDisplay.textContent.split('')
    for (let i = 0; i < num.length; i++) {
        if (num[i] === '.') {
            button[10].classList.add('disabled')
            isDisabled++
            return 0
        } else {
            button[10].classList.remove('disabled')
            isDisabled = 0
        }     
    }
}

function hasDot (button) {
    if (button.classList.contains('disabled') === false) {
        button.classList.remove('disabled')
    } 
}

function pickAThing(choice) {
    if (Number.isNaN(Number(choice))) {
        if (choice === '.') {
            if (isDisabled > 0) {
                return false;
            } else {
                updateDisplay(choice)
                disableDot(nbutArr)
            }
        } else {
            if (choice === 'clear' || choice === '=') {
                switch (choice) {
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
                    opStore.push(choice)
                    Numbero = ""
                } else {
                    opStore.push(calcDisplay.textContent)
                    opStore.push(choice)
                    Numbero = ""
                }
                
            }
        }
    } else {
        updateDisplay(choice)
        disableDot(nbutArr)
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