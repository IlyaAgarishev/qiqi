/* global chrome */

import React from "react";
import "./index.css";
import CloseBtn from "../../img/cancel.svg";
import Word from "../Word";

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(props) {
    props.open
      ? (this.dictionary.style.transform = "translate(0, -600px)")
      : (this.dictionary.style.transform = "translate(0, 0px)");
    return true;
  }

  render() {
    return (
      <div className="dictionary" ref={ref => (this.dictionary = ref)}>
        <div className="dictionary-tools">
          <div className="close-btn" onClick={this.props.dictionaryBtnClick}>
            <img src={CloseBtn} alt="" className="close-btn-img" />
          </div>
          <div className="clearDictionary" onClick={this.props.clearDictionary}>
            Очистить
          </div>
        </div>
        <div className="words">
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

export default Dictionary;
