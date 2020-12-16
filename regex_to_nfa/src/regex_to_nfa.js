//Creates an NFA using Thompson's Construction algorithm
//NFA is made up of nfaStates with an accept value, an object containing it's transiton,
// and an array of the lambdaMoves from that state.

function nfaState(accepted) {
  return {
    accepted,
    transition: {},
    lambdaMoves: [],
  };
}

function createNFA(symbol) {
  const start = nfaState(false);
  const end = nfaState(true);

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
  from.transition[symbol] = to;
}

function concatination(first, second) {
  addLambdaMove(first.end, second.start);
  first.end.accepted = false;
  return { start: first.start, end: second.end };
}

function union(first, second) {
  const start = createState(false);
  addLambdaMove(start, first.start);
  addLambdaMove(start, second.start);

  const end = createState(true);
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
  addLambdaMove(first.end, start);
  addLambdaMove(start, end);

  return { start, end };
}

export function toNFA(regex) {
  if (regex == "E") {
    return lambdaNFA();
  }

  const stack = [];

  for (var character of regex) {
    switch (character) {
      case ".":
        second = stack.pop();
        first = stack.pop();
        stack.push(concatination(first, second));
        break;
      case "|":
        second = stack.pop();
        first = stack.pop();
        stack.push(union(first, second));
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
