import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const Word = props => {
  const { index, originalWord, translatedWord, dictionary, setDictionary } = {
    ...props
  };
  return (
    <div
      className={styles.word}
      onClick={() => {
        dictionary.splice(index, 1);
        setDictionary([...dictionary]);
      }}
    >
      <strong>{originalWord}</strong>
      <div>{translatedWord}</div>
    </div>
  );
};

Word.propTypes = {
  index: PropTypes.number.isRequired,
  originalWord: PropTypes.string.isRequired,
  translatedWord: PropTypes.string.isRequired,
  dictionary: PropTypes.array.isRequired,
  setDictionary: PropTypes.func.isRequired
};

export default Word;
