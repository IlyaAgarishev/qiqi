import React from "react";
import styles from "./index.module.css";
import CloseBtn from "../../img/cancel.svg";
import Word from "../Word";
import PropTypes from "prop-types";

const Dictionary = props => {
  const { open, setOpenDictionary, dictionary, setDictionary } = {
    ...props
  };
  return (
    <div
      className={
        open
          ? [styles.dictionary, styles.transformDown].join(" ")
          : [styles.dictionary, styles.transformUp].join(" ")
      }
    >
      <div className={styles.dictionaryTools}>
        <div
          className={styles.closeBtn}
          onClick={() => setOpenDictionary(!open)}
        >
          <img src={CloseBtn} alt="" className={styles.closeBtnImg} />
        </div>
        <div
          className={styles.clearDictionary}
          onClick={() => setDictionary([])}
        >
          Очистить
        </div>
      </div>
      <div className={styles.words}>
        {dictionary.map((word, index) => {
          return (
            <Word
              originalWord={word.word}
              translatedWord={word.translation}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

Dictionary.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpenDictionary: PropTypes.func.isRequired,
  dictionary: PropTypes.array.isRequired,
  deleteWordFromTest: PropTypes.func.isRequired,
  setDictionary: PropTypes.func.isRequired
};

export default Dictionary;
