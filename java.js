const container = document.querySelector('.container');
const operations = document.querySelector('.operations');

const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');

const buttons = document.querySelectorAll('button');
let number = document.querySelector('.number');

const misc = document.querySelectorAll('.misc > button');
misc.forEach((button) => {

    button.addEventListener('click', () => {
        if(button.id === 'clear')
       {
        number.textContent = "";
        display2.appendChild(number);
        display1.replaceChildren();
       } 
    });
    
});

let no1 = null;
let operation1 = null;
let no2 = null;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if(button.id !== 'clear')
    {
      if (parseInt(button.id) >= 0 && parseInt(button.id) <= 9) {
        number.textContent = number.textContent + button.id;
        display2.appendChild(number);
      } else if (button.id === '.' && !number.textContent.includes('.')) {
        number.textContent = number.textContent + button.id;
        display2.appendChild(number);
      } else if (button.id === 'delete') {
        number.textContent = number.textContent.slice(0, -1);
        display2.appendChild(number);
        let lastChildText = display1.lastChild ? display1.lastChild.textContent : "";
        display1.replaceChildren(lastChildText.slice(0, -1));
      } else if (button.id !== '=' && !no1) {
        no1 = parseFloat(number.textContent);
        operation1 = button.id;
        number.textContent = "";
      } else if (button.id !== '=' && no1 && number.textContent !== "") {
        no2 = parseFloat(number.textContent);
        const result = operation(no1, operation1, no2);
        number.textContent = result;
        display2.appendChild(number);
        no1 = result;
        operation1 = button.id;
        number.textContent = "";
      } else if (button.id === '=') {
        no2 = parseFloat(number.textContent);
        const result = operation(no1, operation1, no2);
        number.textContent = result;
        display2.appendChild(number);
        let see = document.createElement('div');
        see.textContent = result;
        display1.replaceChildren("=", see);
        no1 = null;
        operation1 = null;
        no2 = null;
      }
  
      let see = document.createElement('div');
      if (button.id === 'delete') {
        see.textContent = display1.lastChild.textContent.slice(0, -1);
      } else if (parseInt(button.id) >= 0 && parseInt(button.id) <= 9) {
        let lastChildText = display1.lastChild ? display1.lastChild.textContent : "";
        see.textContent = lastChildText + button.id;
      } else {
        let lastChildText = display1.lastChild ? display1.lastChild.textContent : "";
        see.textContent = lastChildText + " " + button.id;
      }
      display1.replaceChildren(see);
    }
  });
});

function operation(no1, op, no2){
    if(op === '+')
        return no1+no2;
    else if(op === '-')
        return no1-no2;
    else if(op === '*')
        return no1*no2;
    else if(op === '/')
        return no1/no2;
}



