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
        <div className="numberOfWords">5 слов</div>
        чтобы начать тест
      </div>
    );
  }
}
export default WordsTillTest;
