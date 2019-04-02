import React from "react";
import "./index.css";

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
export default Word;
