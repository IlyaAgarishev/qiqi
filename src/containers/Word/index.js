import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const Word = props => {
  const { index, deleteWordFromTest, originalWord, translatedWord } = {
    ...props
  };
  return (
    <div
      className="word"
      onClick={() => {
        deleteWordFromTest(index);
      }}
    >
      <div className="word-fat">{originalWord}</div>
      <div className="word-translation">{translatedWord}</div>
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
