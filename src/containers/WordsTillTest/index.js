import React from 'react';
import './index.css';

class WordsTillTest extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wordsTillTest">
        Вам осталось набрать
        <div className="numberOfWords">
          {this.props.wordsLimit - this.props.dictionaryLength} слов
        </div>
        чтобы начать тест
      </div>
    );
  }
}
export default WordsTillTest;
