import React from "react";
import { mount, render, shallow } from "enzyme";
import { wordEndingGenerator } from "../utils";
import WordsTillTest from "../containers/WordsTillTest";

// functions-tools for testing
const digitsArratGenerator = conditions => {
  let digitsArray = [];
  for (let i = 0; i <= 30; i++) {
    if (conditions(i)) {
      digitsArray.push(i);
    }
  }
  return digitsArray;
};

const conditionsForWord_slov = i => {
  return (i % 10 >= 5 && i % 10 <= 9) || i % 10 === 0 || (i >= 11 && i <= 14);
};

const conditionsForWord_slova = i => {
  return i % 10 >= 2 && i % 10 <= 4 && i !== 12 && i !== 13 && i !== 14;
};

const conditionsForWord_slovo = i => {
  return i % 10 === 1 && i !== 11;
};

// Functions testing

test("wordEndingGenerator returns string", () => {
  expect(typeof wordEndingGenerator(10)).toBe("string");
});

test("wordEndingGenerator returns word 'slov", () => {
  digitsArratGenerator(conditionsForWord_slov).forEach(el => {
    expect(wordEndingGenerator(el)).toBe(`${el} слов`);
  });
});

test("wordEndingGenerator returns word 'slova", () => {
  digitsArratGenerator(conditionsForWord_slova).forEach(el => {
    expect(wordEndingGenerator(el)).toBe(`${el} слова`);
  });
});

test("wordEndingGenerator returns word 'slovo", () => {
  digitsArratGenerator(conditionsForWord_slovo).forEach(el => {
    expect(wordEndingGenerator(el)).toBe(`${el} слово`);
  });
});

// Components testing

test("WordsTillTest renders right string", () => {
  const wordsLimit = 30;
  for (let i = 0; i <= wordsLimit; i++) {
    let component = mount(
      <WordsTillTest wordsLimit={wordsLimit} dictionaryLength={i} />
    );
    const wordsLeft = wordsLimit - i;
    expect(component.find(".numberOfWords").text()).toBe(
      wordEndingGenerator(wordsLeft)
    );
  }
});
