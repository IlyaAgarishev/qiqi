import React from "react";
import "./index.css";

class Word extends React.Component {
  render() {
    return (
      <div
        className="word"
        onClick={() => {
          this.props.deleteWordFromTest(this.props.index);
        }}
      >
        <div className="word-fat">{this.props.originalWord}</div>
        <div className="word-translation">{this.props.translatedWord}</div>
      </div>
    );
  }
}

export default Word;
