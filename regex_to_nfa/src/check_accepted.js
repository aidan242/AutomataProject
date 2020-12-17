//adds all possible states from a lambda move to the array of next states
//avoids entering a loop of lambda moves by keeping an array of states visited
//if no lambda moves, only adds the current state
function addNext(state, nextStates, visited) {
  if (state.lambdaMoves.length) {
    for (const s of state.lambdaMoves) {
      if (!visited.find((vs) => vs === s)) {
        visited.push(s);
        addNext(s, nextStates, visited);
      }
    }
  } else {
    nextStates.push(state);
  }
}

//pushes string though the nfa, returning the accept value of the state after all characters have been processed
function checkString(nfa, input) {
  let currentStates = [];
  addNext(nfa.start, currentStates, []);

  for (const token of input) {
    const nextStates = [];

    for (const state of currentStates) {
      const nextState = state.transitions[token];
      if (nextState) {
        addNext(nextState, nextStates, []);
      }
    }

    currentStates = nextStates;
  }
  return currentStates.find((s) => s.accepted) ? true : false;
}

module.exports = checkString;
