import React from "react";
import styles from "./index.module.css";
import CloseBtn from "../../img/cancel.svg";
import Word from "../Word";
import PropTypes from "prop-types";

class Dictionary extends React.Component {
  shouldComponentUpdate(props) {
    props.open
      ? (this.dictionary.style.transform = "translate(0, -600px)")
      : (this.dictionary.style.transform = "translate(0, 0px)");
    return true;
  }

  render() {
    return (
      <div className={styles.dictionary} ref={ref => (this.dictionary = ref)}>
        <div className={styles.dictionaryTools}>
          <div
            className={styles.closeBtn}
            onClick={this.props.dictionaryBtnClick}
          >
            <img src={CloseBtn} alt="" className={styles.closeBtnImg} />
          </div>
          <div
            className={styles.clearDictionary}
            onClick={this.props.clearDictionary}
          >
            Очистить
          </div>
        </div>
        <div className={styles.words}>
          {this.props.dictionary.map((word, index) => {
            return (
              <Word
                originalWord={word.word}
                translatedWord={word.translation}
                index={index}
                deleteWordFromTest={this.props.deleteWordFromTest}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Dictionary.propTypes = {
  open: PropTypes.bool.isRequired,
  dictionaryBtnClick: PropTypes.func.isRequired,
  dictionary: PropTypes.array.isRequired,
  setDictionaryState: PropTypes.func.isRequired,
  deleteWordFromTest: PropTypes.func.isRequired,
  clearDictionary: PropTypes.func.isRequired
};

export default Dictionary;
