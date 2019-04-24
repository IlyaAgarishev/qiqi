import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { wordEndingGenerator } from "../../utils";

const WordsTillTest = props => {
  const { wordsLimit, dictionaryLength } = { ...props };
  const wordsLeft = wordsLimit - dictionaryLength;
  return (
    <div className={styles.wordsTillTest}>
      Вам осталось набрать
      <div className={styles.numberOfWords}>
        {wordEndingGenerator(wordsLeft)}
      </div>
      чтобы начать тест
    </div>
  );
};

WordsTillTest.propTypes = {
  wordsLimit: PropTypes.number.isRequired,
  dictionaryLength: PropTypes.number.isRequired
};

export default WordsTillTest;
