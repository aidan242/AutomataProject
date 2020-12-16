// given some string and nfa, returns boolean representation of if that string is accepted
function checkString(input, n) {
  token = input.charAt(0);

  if (n.start !== undefined) {
    n = n.start;
  }

  for (let i = 0; i < n.lambdaMoves.length; i++) {
    if (checkString(input, n.lambdaMoves[i])) {
      return true;
    }
  }

  if (n.transitions[token] !== 0) {
    if (input.length == 1) {
      return n.transitions[token].accepted;
    } else if (checkString(input.substring(1), n.transitions[token])) {
      return true;
    }
  }
  return false;
}
