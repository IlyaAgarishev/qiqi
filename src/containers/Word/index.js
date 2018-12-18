import React from 'react';
import './index.css';
import CloseBtn from '../../img/cancel.svg';

class Word extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="word">
        <div className="word-fat">{this.props.originalWord}</div>
        <div className="word-translation">{this.props.translatedWord}</div>
      </div>
    );
  }
}

export default Word;
