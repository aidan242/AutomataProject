//Creates an NFA using Thompson's Construction algorithm
//NFA is made up of nfaStates with an accept value, an object containing it's transitons keyed by symbol,
// and an array of the lambdaMoves from that state.
// E is representative of lambda

const formatRegex = require("./parse_regex");

function nfaState(accepted) {
  return {
    accepted,
    transitions: {},
    lambdaMoves: [],
  };
}

function createNFA(symbol) {
  const start = nfaState(false);
  const end = nfaState(true);
  states = {};
  if (symbol === "E") {
    addLambdaMove(start, end);
  } else {
    addTransition(start, end, symbol);
  }
  return { start, end };
}

function addLambdaMove(from, to) {
  from.lambdaMoves.push(to);
}

function addTransition(from, to, symbol) {
  from.transitions[symbol] = to;
}

function concatination(first, second) {
  addLambdaMove(first.end, second.start);
  first.end.accepted = false;
  return { start: first.start, end: second.end };
}

function union(first, second) {
  const start = nfaState(false);
  addLambdaMove(start, first.start);
  addLambdaMove(start, second.start);

  const end = nfaState(true);
  addLambdaMove(first.end, end);
  first.end.accepted = false;
  addLambdaMove(second.end, end);
  second.end.accepted = false;

  return { start, end };
}

function star(first) {
  const start = nfaState(false);
  const end = nfaState(true);

  addLambdaMove(start, first.start);
  addLambdaMove(start, end);
  addLambdaMove(first.end, start);
  addLambdaMove(first.end, first.start);
  first.end.accepted = false;

  return { start, end };
}

function toNFA(regex) {
  const stack = [];
  expression = formatRegex(regex);
  for (var character of expression) {
    switch (character) {
      case ".":
        const right = stack.pop();
        const left = stack.pop();
        stack.push(concatination(left, right));
        break;
      case "|":
        const right2 = stack.pop();
        const left2 = stack.pop();
        stack.push(union(left2, right2));
        break;
      case "*":
        stack.push(star(stack.pop()));
        break;
      default:
        stack.push(createNFA(character));
        break;
    }
  }
  return stack.pop();
}

module.exports = toNFA;
