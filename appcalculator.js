const display = document.getElementById("display");
let equation = "0";
let answr = null;


function insert(value){
  if (display.value === "0"){
    if (value === "/"){
      display.value = `\u00F7`
      equation = value;
    }
    else if (value === "*"){
      display.value = "x";
      equation = value;
    }
    else if (value=== "ANS"){
      display.value = "ANS";
      equation = answr;
    }
    else{
      display.value = value;
      equation = value;
    }
  }
  else{
    if (value === "/"){
      display.value += `\u00F7`;
      equation+= value;
    }
    else if (value === "*"){
      display.value += "x";
      equation += value;
    }
    else if (value=== "ANS"){
      display.value += "ANS";
      equation += answr;
    }
    else{
      display.value += value;
      equation+= value;
    }
  }
}

function clr(){
  display.value = "0";
  equation = "0";
}

function del(){
  if (display.value.length > 1){
    display.value = display.value.substring(0,display.value.length-1);
    equation = equation.substring(0,equation.length-1);
  }
  else{
    display.value ="0";
    equation = "0";
  }
}

function equal(){
  answr = eval(equation);
  if (answr.length >= 19){
    display.value = answr.substring(0,17);
  }
  else{
    display.value = answr;
  }
}

function ans(){
  if (answr){
    insert("ANS");
  }
}

