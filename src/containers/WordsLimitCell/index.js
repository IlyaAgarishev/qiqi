import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { wordsLimitSet } from "../../utils";

const WordsLimitCell = props => {
  const { index, setWordsLimit, certainCell, setCertainCell } = {
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
        setWordsLimit(index);
        setCertainCell(index);
        wordsLimitSet(index);
      }}
    >
      {index}
    </div>
  );
};

WordsLimitCell.propTypes = {
  index: PropTypes.number.isRequired,
  setWordsLimit: PropTypes.func.isRequired,
  certainCell: PropTypes.number.isRequired,
  setCertainCell: PropTypes.func.isRequired
};

export default WordsLimitCell;
