import React from 'react';
import './index.css';
import CloseBtn from '../../img/cancel.svg';

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
        <div className="word">
          <div className="word-top">
            <div className="original-word">cat</div>
            <div className="translated-word">кот</div>
          </div>
          <div className="word-bottom">
            <div className="word-prononsiation">c a t</div>
            <div className="audio-word">audio</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dictionary;
