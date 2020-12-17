const formatRegex = require("./parse_regex");
const toNFA = require("./regex_to_nfa");
const checkString = require("./check_accepted");

test("regex gets properly parsed to postfix with concat operator", () => {
  expect(formatRegex("")).toBe("");
  expect(formatRegex("01")).toBe("01.");
  expect(formatRegex("000001")).toBe("00.0.0.0.1.");
  expect(formatRegex("0*00|001")).toBe("0*0.0.00.1.|");
  expect(formatRegex("0|(010)*11")).toBe("001.0.*1.1.|");
});

test("creates an NFA", () => {
  let nfa = toNFA("0");
  expect(nfa.start.transitions[0].accepted).toBe(true);
});

test("NFA accepts strings created from regex", () => {
  let nfa = toNFA("0*|(010)*11");
  expect(checkString(nfa, "")).toBe(true);
  expect(checkString(nfa, "000000")).toBe(true);
  expect(checkString(nfa, "11")).toBe(true);
  expect(checkString(nfa, "01011")).toBe(true);
  expect(checkString(nfa, "01001011")).toBe(true);
  expect(checkString(nfa, "001011")).toBe(false);
  expect(checkString(nfa, "011")).toBe(false);
});
