import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const WordsLimitCell = props => {
  const { index, setWordsLimitStorage, certainCell, certainCellSetter } = {
    ...props
  };
  return (
    <div
      className={
        certainCell === index
          ? [styles.wordsLimitCell, styles.white].join(" ")
          : styles.wordsLimitCell
      }
      onClick={() => {
        setWordsLimitStorage(index);
        certainCellSetter(index);
      }}
    >
      {index}
    </div>
  );
};

WordsLimitCell.propTypes = {
  index: PropTypes.number.isRequired,
  setWordsLimitStorage: PropTypes.func.isRequired,
  certainCell: PropTypes.number.isRequired,
  certainCellSetter: PropTypes.func.isRequired
};

export default WordsLimitCell;
