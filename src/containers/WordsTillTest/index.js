import React from "react";
import "./index.css";

class WordsTillTest extends React.Component {
  tryMetryMe = () => {
    let wordsLeft = this.props.wordsLimit - this.props.dictionaryLength;
    if (
      (wordsLeft >= 5 && wordsLeft <= 14) ||
      (wordsLeft % 10 >= 5 && wordsLeft % 10 <= 9) ||
      wordsLeft % 10 === 0
    ) {
      return `${wordsLeft} слов`;
    } else if (wordsLeft >= 2 && wordsLeft <= 4) {
      return `${wordsLeft} слова`;
    } else if (
      wordsLeft === 1 ||
      (wordsLeft % 10 >= 1 && wordsLeft % 10 <= 4)
    ) {
      return `${wordsLeft} слово`;
    }
  };

  render() {
    let wordsLeftString = this.tryMetryMe();
    return (
      <div className="wordsTillTest">
        Вам осталось набрать
        <div className="numberOfWords" ref={ref => (this.numberOfWords = ref)}>
          {wordsLeftString}
        </div>
        чтобы начать тест
      </div>
    );
  }
}
export default WordsTillTest;
