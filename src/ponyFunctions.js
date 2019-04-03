export const wordEndingGenerator = (wordsLimit, dictionaryLength) => {
  let wordsLeft = wordsLimit - dictionaryLength;
  if (
    (wordsLeft >= 5 && wordsLeft <= 14) ||
    (wordsLeft % 10 >= 5 && wordsLeft % 10 <= 9) ||
    wordsLeft % 10 === 0
  ) {
    return `${wordsLeft} слов`;
  } else if (wordsLeft >= 2 && wordsLeft <= 4) {
    return `${wordsLeft} слова`;
  } else if (wordsLeft === 1 || (wordsLeft % 10 >= 1 && wordsLeft % 10 <= 4)) {
    return `${wordsLeft} слово`;
  }
};
