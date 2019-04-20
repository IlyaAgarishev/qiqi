import React from "react";
import styles from "./index.module.css";
import CloseBtn from "../../img/cancel.svg";
import Word from "../Word";
import PropTypes from "prop-types";

const Dictionary = props => {
  const { open, dictionaryBtnClick, dictionary, clearDictionary } = {
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
        <div className={styles.closeBtn} onClick={dictionaryBtnClick}>
          <img src={CloseBtn} alt="" className={styles.closeBtnImg} />
        </div>
        <div className={styles.clearDictionary} onClick={clearDictionary}>
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
  dictionaryBtnClick: PropTypes.func.isRequired,
  dictionary: PropTypes.array.isRequired,
  deleteWordFromTest: PropTypes.func.isRequired,
  clearDictionary: PropTypes.func.isRequired
};

export default Dictionary;
