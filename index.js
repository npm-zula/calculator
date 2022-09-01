let calcDisplay = document.getElementById('display')
let resultDisplay = document.getElementById('result')

var queue = [];
var input = 0;

function display(num) {
    calcDisplay.innerHTML += num;
    input+= num;
}

function allClear() {
    queue = [];
    input = 0;
    calcDisplay.innerHTML = "";
    resultDisplay.innerHTML = "0";
}

function del() {
    let temp = calcDisplay.innerHTML
    calcDisplay.innerHTML = temp.substr(0, temp.length - 1);
}

function result(num){
    resultDisplay.innerHTML = num;
    
}

function calculateFactorial(num){
  let fact = 1;
  for (let index = 1; index <= num; index++) {
          fact *= index;
  }
  return fact;
}

function nCr(n, r){
    return calculateFactorial(n) / (calculateFactorial(r) * calculateFactorial(n - r));
}

function nPr(n, r){
    return Math.floor(calculateFactorial(n) / calculateFactorial(n - r));
}


function calculate(value){
    if (input !==0) {
      input = parseFloat(input);
      queue.push(input);
        }

    var answer = value[0];
    var dividedByZero = 0;

    if(value.length == 2){
      answer = calculateFactorial(answer)
    }
    else{
      for (var i = 2; i < value.length; i= i+2) {
          switch (queue[i-1]) {
              case '+':
                  answer+= value[i];
                  break;
              case '-':
                  answer-= value[i];
                  break;
              case '/':    
                  if (value[i] === 0)   
                    dividedByZero = 1;
                  else      
                  answer = answer / value[i];
                  break;
              case'*': 
                  answer = answer * value[i];
                  break;
              case'%':
                  answer = answer % value[i];
                  break;
              case 'C':
                  answer = nCr(answer,value[i]);
                  break;
              case 'P':
                  answer = nPr(answer,value[i]);
                  break;
          }
      }
  }
    
    answer = answer.toFixed(5);
    answer = parseFloat(answer);

    if (dividedByZero == 1) { 
        allClear();
        result("NA");
      }
    else{
        result(answer)
        input = answer;
        queue = [];
  }
}

function numeric(arg){
    input += arg;
    calcDisplay.innerHTML += arg;
}

function operator(arg){
  if (input !== 0 && input !== "-") {
      input = parseFloat(input);
      queue.push(input);
      queue.push(arg);
      calcDisplay.innerHTML +=arg;
      input = 0;
  }
  
  // checks if first input is the negative sign, doesnot allow 2 consective negative signs
  if (arg == "-"  && isNaN(queue[0]) && input != "-"){
      input ="-";
      calcDisplay.innerHTML = "-";
  }
}