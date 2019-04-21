import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const WordsLimitCell = props => {
  const { index, setWordsLimit, wordsLimit } = {
    ...props
  };
  return (
    <div
      className={
        index === wordsLimit
          ? [styles.wordsLimitCell, styles.white].join(" ")
          : styles.wordsLimitCell
      }
      onClick={() => {
        setWordsLimit(index);
      }}
    >
      {index}
    </div>
  );
};

WordsLimitCell.propTypes = {
  index: PropTypes.number.isRequired,
  setWordsLimit: PropTypes.func.isRequired,
  wordsLimit: PropTypes.number.isRequired
};

export default WordsLimitCell;
