/* global chrome */

import React from 'react';
import './index.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.open) {
      this.settings.style.display = 'block';
    } else {
      this.settings.style.display = 'none';
    }

    this.enableSingleWordsLimitStyle(this.wordsLimitCells.children);
  }

  disableAllWordsLimitStyle = children => {
    for (let i = 0; i < children.length; i++) {
      children[i].style.color = 'white';
      children[i].style.background = '#0091d7';
    }
  };

  enableSingleWordsLimitStyle = children => {
    chrome.storage.sync.get(['wordsLimit'], storageData => {
      for (let i = 0; i < children.length; i++) {
        let synthIndex = i + 1;
        if (storageData.wordsLimit == synthIndex * 10) {
          children[i].style.color = '#0091d7';
          children[i].style.background = 'white';
        }
      }
    });
  };

  // setWordsLimitSettings = (number, children) => {
  //   this.disableAllWordsLimitStyle(children);
  //   this.props.setWordsLimitStorage(number);
  //   this.enableSingleWordsLimitStyle(children);
  // };

  shouldComponentUpdate(props) {
    if (props.open) {
      this.settings.style.display = 'block';
      setTimeout(() => {
        this.settings.style.opacity = '1';
      }, 10);
    } else {
      this.settings.style.opacity = '0';
      setTimeout(() => {
        this.settings.style.display = 'none';
      }, 300);
    }
    return true;
  }

  render() {
    return (
      <div className="settings" ref={ref => (this.settings = ref)}>
        <div className="wordsLimit-settings">
          <div className="wordsLimit-settings-title">Количество слов в тесте :</div>
          <div className="wordsLimit-cells" ref={ref => (this.wordsLimitCells = ref)}>
            <div
              className="wordsLimit-cell"
              onClick={() => {
                this.disableAllWordsLimitStyle(this.wordsLimitCells.children);
                this.props.setWordsLimitStorage(10);
                this.enableSingleWordsLimitStyle(this.wordsLimitCells.children);
              }}
            >
              10
            </div>
            <div
              className="wordsLimit-cell"
              onClick={() => {
                this.disableAllWordsLimitStyle(this.wordsLimitCells.children);
                this.props.setWordsLimitStorage(20);
                this.enableSingleWordsLimitStyle(this.wordsLimitCells.children);
              }}
            >
              20
            </div>
            <div
              className="wordsLimit-cell"
              onClick={() => {
                this.disableAllWordsLimitStyle(this.wordsLimitCells.children);
                this.props.setWordsLimitStorage(30);
                this.enableSingleWordsLimitStyle(this.wordsLimitCells.children);
              }}
            >
              30
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
