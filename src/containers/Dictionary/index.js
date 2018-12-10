import React from 'react';
import './index.css';
import CloseBtn from '../../img/cancel.svg';
import Masonry from 'react-masonry-component';

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
          <div className="word">
            <div className="word-fat">lorem</div>
            <div className="word-translation">лорем</div>
          </div>
          <div className="word">
            <div className="word-fat">lorem</div>
            <div className="word-translation">лорем</div>
          </div>
          <div className="word">
            <div className="word-fat">lorem</div>
            <div className="word-translation">лорем</div>
          </div>
          <div className="word">
            <div className="word-fat">lorem</div>
            <div className="word-translation">лорем</div>
          </div>
          <div className="word">
            <div className="word-fat">lorem</div>
            <div className="word-translation">лорем</div>
          </div>
          <div className="word">
            <div className="word-fat">lorem</div>
            <div className="word-translation">лорем</div>
          </div>
          <div className="word">
            <div className="word-fat">lorem</div>
            <div className="word-translation">лорем</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dictionary;
