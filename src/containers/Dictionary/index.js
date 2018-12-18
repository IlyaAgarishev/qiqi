/* global chrome */

import React from 'react';
import './index.css';
import CloseBtn from '../../img/cancel.svg';
import Masonry from 'react-masonry-component';
import Word from '../Word';

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(props) {
    props.open
      ? (this.dictionary.style.transform = 'translate(0, -600px)')
      : (this.dictionary.style.transform = 'translate(0, 0px)');
    return true;
  }

  render() {
    return (
      <div className="dictionary" ref={ref => (this.dictionary = ref)}>
        <img src={CloseBtn} alt="" className="close-btn" onClick={this.props.dictionaryBtnClick} />
        <div className="words">
          {this.props.dictionary.map(word => {
            return <Word originalWord={word.word} translatedWord={word.translation} />;
          })}
        </div>
      </div>
    );
  }
}

export default Dictionary;
