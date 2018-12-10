import React from 'react';
import './index.css';

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.open ? (
      <div className="dictionary" ref={ref => (this.dictionary = ref)}>
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
    ) : null;
  }
}

export default Dictionary;
