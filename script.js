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

function operate (string) {
    let operation = organizeExp(string)
    let nums = []
    nums.push(Number(operation[0]), Number(operation[2]))
    switch (operation[1]) {
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

function organizeExp(exp) {
    let result = exp.split('')
    return result
}