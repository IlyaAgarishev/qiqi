import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const Word = props => {
  const { index, deleteWordFromTest, originalWord, translatedWord } = {
    ...props
  };
  return (
    <div
      className={styles.word}
      onClick={() => {
        deleteWordFromTest(index);
      }}
    >
      <strong>{originalWord}</strong>
      <div>{translatedWord}</div>
    </div>
  );
};

Word.propTypes = {
  index: PropTypes.number.isRequired,
  deleteWordFromTest: PropTypes.func.isRequired,
  originalWord: PropTypes.string.isRequired,
  translatedWord: PropTypes.string.isRequired
};

export default Word;
