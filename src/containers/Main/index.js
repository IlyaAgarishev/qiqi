/* global chrome */

import React from 'react';
import './index.css';
import settings from '../../img/settings.svg';
import book from '../../img/book.svg';
import WordsTillTest from '../../containers/WordsTillTest';
import Dictionary from '../Dictionary';
import Settings from '../Settings';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDictionary: false,
      openSettings: false,
      dictionary: [{ word: 'word', translation: 'слово' }]
    };
  }

  dictionaryBtnClick = () => {
    this.setState({ openDictionary: !this.state.openDictionary });
    chrome.storage.sync.get(['dictionary'], storageData => {
      this.setState({ dictionary: storageData.dictionary });
    });
    console.log(this.state.openDictionary);
  };
  settingsBtnClick = () => {
    this.setState({ openSettings: !this.state.openSettings });
    this.state.openSettings
      ? (this.settingsImg.style.transform = 'rotate(100deg)')
      : (this.settingsImg.style.transform = 'rotate(-100deg)');
  };

  render() {
    // console.log(this.state.openDictionary);
    return (
      <div
        className="main"
        onClick={event => {
          if (event.target.className == 'settings' || event.target.className == 'settings-img') {
            return null;
          } else {
            this.setState({ openSettings: false });
            this.settingsImg.style.transform = 'rotate(100deg)';
          }
        }}
      >
        <div className="header">
          <div className="logo">qiqi</div>
          <img
            src={settings}
            alt=""
            className="settings-img"
            ref={ref => (this.settingsImg = ref)}
            onClick={this.settingsBtnClick}
          />
        </div>
        <div className="content">
          <Dictionary
            open={this.state.openDictionary}
            dictionaryBtnClick={this.dictionaryBtnClick}
            dictionary={this.state.dictionary}
          />
          <WordsTillTest />
          <Settings open={this.state.openSettings} />
        </div>
        <div className="footer">
          <div className="dictionary-button" onClick={this.dictionaryBtnClick}>
            <img src={book} alt="" className="book" /> Словарь
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
