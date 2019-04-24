import React from "react";
import { mount, render, shallow } from "enzyme";
import { wordEndingGenerator } from "../utils";
import WordsTillTest from "../containers/WordsTillTest";
import WordsLimitCell from "../containers/WordsLimitCell";
import Settings from "../containers/Settings";
import Word from "../containers/Word";
import Dictionary from "../containers/Dictionary";
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
    const component = mount(
      <WordsTillTest wordsLimit={wordsLimit} dictionaryLength={i} />
    );
    const wordsLeft = wordsLimit - i;
    expect(component.find(".numberOfWords").text()).toBe(
      wordEndingGenerator(wordsLeft)
    );
  }
});

test("WordsLimitCell renders right string", () => {
  const props = {
    index: 10,
    setWordsLimit: jest.fn(),
    wordsLimit: 30
  };
  const component = mount(<WordsLimitCell {...props} />);
  expect(component.find(".wordsLimitCell").text()).toBe(`${props.index}`);
});

test("Settings renders right string", () => {
  const props = {
    setWordsLimit: jest.fn(),
    wordsLimit: 30,
    setOpenSettings: jest.fn()
  };
  const component = mount(<Settings {...props} />);
  const numbersArray = [10, 20, 30];
  numbersArray.forEach((number, index) => {
    expect(
      component
        .find(".wordsLimitCell")
        .at(index)
        .text()
    ).toBe(`${number}`);
  });
});

test("Word renders right string", () => {
  const props = {
    index: 1,
    originalWord: "wow",
    translatedWord: "воу",
    dictionary: [],
    setDictionary: jest.fn()
  };
  const component = mount(<Word {...props} />);
  expect(component.find(".word").text()).toBe(
    props.originalWord + props.translatedWord
  );
});

test("Dictionary renders right string", () => {
  const props = {
    open: false,
    setOpenDictionary: jest.fn(),
    dictionary: [
      { word: "cat", translation: "кот" },
      { word: "dog", translation: "пес" },
      { word: "lion", translation: "лев" }
    ],
    setDictionary: jest.fn()
  };
  const component = mount(<Dictionary {...props} />);
  props.dictionary.forEach((el, index) => {
    expect(
      component
        .find(".word")
        .at(index)
        .text()
    ).toBe(el.word + el.translation);
  });
});
