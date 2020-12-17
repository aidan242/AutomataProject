//parses a regex using shunting yard algorithm to create a postfix notation string

const opPrecedent = {
  "|": 0,
  ".": 1,
  "*": 2,
};

const operators = ["*", ".", "|"];

function peek(stack) {
  return stack[stack.length - 1];
}

//adds a concat operator . to regex to make easier to create a postfix
function addConcat(regex) {
  let output = "";

  for (let i = 0; i < regex.length; i++) {
    output += regex[i];

    if (regex[i] === "(" || regex[i] === "|") {
      continue;
    }

    if (i + 1 < regex.length && regex[i] !== ".") {
      if (regex[i + 1] === ")" || operators.includes(regex[i + 1])) {
        continue;
      }
      output += ".";
    }
  }
  return output;
}

function formatRegex(regex) {
  let output = "";
  let opStack = [];

  for (const token of addConcat(regex)) {
    if (operators.includes(token)) {
      while (
        opStack.length > 0 &&
        peek(opStack) !== "(" &&
        opPrecedent[peek(opStack)] >= opPrecedent[token]
      ) {
        output += opStack.pop();
      }
      opStack.push(token);
    } else if (token === "(" || token === ")") {
      if (token === "(") {
        opStack.push(token);
      } else {
        while (peek(opStack) !== "(") {
          output += opStack.pop();
        }
        opStack.pop();
      }
    } else {
      output += token;
    }
  }
  while (opStack.length > 0) {
    output += opStack.pop();
  }
  return output;
}

module.exports = formatRegex;
