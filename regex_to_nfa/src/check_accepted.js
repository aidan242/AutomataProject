// given some string and nfa, returns boolean representation of if that string is accepted
// function checkString(state, visited, input, index) {
//   if (visited.includes(state)) {
//     return false;
//   }

//   visited.push(state);

//   if (input.length === index) {

//     if (state.accepted) {
//       return true;
//     }

//     if (state.lambdaMoves.some((s) => checkString(s, visited, input, index))) {
//       return true;
//     }

//   } else {
//     const next = state.transitions[input[index]];

//     if (next) {
//       if (checkString(next, visited, input, index + 1)) {
//         return true;
//       }

//     } else {

//       if (
//         state.lambdaMoves.some((s) => checkString(s, visited, input, index))
//       ) {
//         return true;
//       }

//     }

//     return false;
//   }
// }

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

function checkString(nfa, input) {
  let currentStates = [nfa.start];

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
