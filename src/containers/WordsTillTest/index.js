import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const tryMetryMe = (wordsLimit, dictionaryLength) => {
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

const WordsTillTest = props => {
  const { wordsLimit, dictionaryLength } = { ...props };
  let wordsLeftString = tryMetryMe(wordsLimit, dictionaryLength);
  return (
    <div className="wordsTillTest">
      Вам осталось набрать
      <div className="numberOfWords">{wordsLeftString}</div>
      чтобы начать тест
    </div>
  );
};

WordsTillTest.propTypes = {
  wordsLimit: PropTypes.number.isRequired,
  dictionaryLength: PropTypes.number.isRequired
};

export default WordsTillTest;
