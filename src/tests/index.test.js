import React from "react";
import { mount, render, shallow } from "enzyme";
import { wordEndingGenerator } from "../utils";

// Functions testing

test("wordEndingGenerator returns string", () => {
  const wordsLimit = 10;
  const dictionaryLength = 5;
  expect(typeof wordEndingGenerator(wordsLimit, dictionaryLength)).toBe(
    "string"
  );
});

const generatedWord = (wordsLimit, dictionaryLength) => {
  return wordEndingGenerator(wordsLimit, dictionaryLength).split(" ")[1];
};

test("wordEndingGenerator returns 'слово'", () => {
  expect(generatedWord(30, 9)).toBe("слово");
});

test("wordEndingGenerator returns 'слова'", () => {
  expect(generatedWord(30, 8)).toBe("слова");
  expect(generatedWord(30, 7)).toBe("слова");
  expect(generatedWord(30, 6)).toBe("слова");
});

test("wordEndingGenerator returns 'слов'", () => {
  expect(generatedWord(30, 5)).toBe("слов");
  expect(generatedWord(30, 4)).toBe("слов");
  expect(generatedWord(30, 3)).toBe("слов");
  expect(generatedWord(30, 2)).toBe("слов");
  expect(generatedWord(30, 1)).toBe("слов");
});
