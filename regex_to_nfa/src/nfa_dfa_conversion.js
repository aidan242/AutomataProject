import "./regex_to_nfa";

// let deadState = nfaState(false);

// function combineNFAState(state1, state2, alphabet) {
//   let combinedState = nfaState(state1.accepted || state2.accepted);
//   for (c of alphabet) {
//     t1 = state1.transitions[c];
//     t2 = state2.transitions[c];
//     if (t1 !== undefined && t2 !== undefined) {
//       combinedState.transitions[c] = combineNFAState(t1, t2, alphabet);
//     } else if (t1 !== undefined && t2 === undefined) {
//       combinedState.transitions[c] = t1;
//     } else if (t1 === undefined && t2 !== undefined) {
//       combinedState.transitions[c] = t2;
//     } else {
//       combinedState.transitions[c] = deadState;
//     }
//   }
//   return combinedState;
// }

// function combineLambdaMoves(state, alphabet) {
//   for (lambda of state.lambdaMoves) {
//     if (lambda.lambdaMoves.length > 0) {
//       state = combineNFAState(state,combineLambdaMoves(lambda, alphabet),alphabet);
//     } else {
//       state = combineNFAState(state, lambda, alphabet);
//     }
//   }
//   state.lambdaMoves = [];
//   return state;
// }

// function convertNFA(nfaState, alphabet) {
//   for (transition in nfaState.transitions) {
//     nfaState = combineLambdaMoves(nfaState, alphabet);
//     for (c in alphabet) {
//       if (!nfaState.transitions[c]) {
//         nfaState.transitions[c] = deadState;
//       }
//     }
//     convertNFA(nfaState.transition, alphabet);
//   }
// }

function T(x, u) {
  let N = [];
  if (Object.keys(x.transitions).includes(u)) {
    N.push(x.transitions[u]);
  }
  for (lambda of x.lamdbaMoves) {
    T(lambda, u, N);
  }
  return N;
}

function unionSet(setA, setB) {
  let union = new Set(setA);
  for (let elem of setB) {
    union.add(elem);
  }
  return union;
}

function subsetAlg(nfa, alphabet) {
  let A = [nfa.start];
  let Q = [List.of(nfa.start)];
  while (Q.length > 0) {
    let R = Q.shift();
    for (u of alphabet) {
      let S = new Set();
      for (x of R) {
        S = unionSet(T(x, u), S);
      }
      if (!A.includes(S)) {
        A.push(S);
        Q.push(S);
      }
      let DT = S;
    }
  }
}

module.exports = convertNFA;
