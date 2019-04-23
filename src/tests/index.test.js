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

test("wordEndingGenerator returns right word", () => {
  expect(generatedWord(30, 9)).toBe("слово");
});
