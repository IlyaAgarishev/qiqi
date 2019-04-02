/* global chrome */

import React from "react";
import "./index.css";
import settings from "../../img/settings.svg";
import book from "../../img/book.svg";
import WordsTillTest from "../../containers/WordsTillTest";
import Dictionary from "../Dictionary";
import Settings from "../Settings";
import Quiz from "react-random-quiz";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTest: false,
      openDictionary: false,
      openSettings: false,
      // wordsLimit: 10,
      dictionary: []
    };
  }

  componentWillMount() {
    // let syntheticDictionary = [];
    // for (let i = 0; i < 10; i++) {
    //   syntheticDictionary.push({ word: `Word_${i}`, translation: `Слово_${i}` });
    // }
    // this.setState({ dictionary: syntheticDictionary });
    this.setWordsLimitState();
    this.setDictionaryState();
  }

  setWordsLimitState = () => {
    chrome.storage.sync.get(["wordsLimit"], storageData => {
      this.setState({ wordsLimit: storageData.wordsLimit });
    });
  };

  setWordsLimitStorage = number => {
    chrome.storage.sync.set({ wordsLimit: number }, () => {
      this.setWordsLimitState();
      console.log(`${number} has been setted`);
    });
  };

  setDictionaryState = () => {
    chrome.storage.sync.get(["dictionary"], storageData => {
      this.setState({
        dictionary: storageData.dictionary
      });
    });
  };

  clearDictionary = () => {
    chrome.storage.sync.set({ dictionary: [] }, () => {
      this.setDictionaryState();
    });
  };

  setChromeStorage = () => {
    chrome.storage.sync.set({ dictionary: this.state.dictionary }, function() {
      chrome.storage.sync.get(["dictionary"], function(storageData) {
        console.log(storageData.dictionary);
      });
    });
  };

  dictionaryBtnClick = () => {
    this.setState({ openDictionary: !this.state.openDictionary });
    this.setDictionaryState();
  };

  settingsBtnClick = () => {
    this.setState({ openSettings: !this.state.openSettings });
    this.state.openSettings
      ? (this.settingsImg.style.transform = "rotate(100deg)")
      : (this.settingsImg.style.transform = "rotate(-100deg)");
  };

  deleteWordFromTest = index => {
    this.setState({ startTest: false });
    this.state.dictionary.splice(index, 1);
    this.setChromeStorage();
  };

  render() {
    return (
      <div
        className="main"
        onClick={event => {
          if (
            event.target.className == "settings" ||
            event.target.className == "settings-img" ||
            event.target.className == "wordsLimit-settings" ||
            event.target.className == "wordsLimit-settings-title" ||
            event.target.className == "wordsLimit-cells" ||
            event.target.className == "wordsLimit-cell"
          ) {
            return null;
          } else {
            this.setState({ openSettings: false });
            this.settingsImg.style.transform = "rotate(100deg)";
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
          {this.state.dictionary.length >= this.state.wordsLimit ? (
            <Quiz
              wordsToTest={this.state.dictionary}
              clearDictionary={this.clearDictionary}
            />
          ) : (
            <WordsTillTest
              dictionaryLength={this.state.dictionary.length}
              wordsLimit={this.state.wordsLimit}
            />
          )}

          <Dictionary
            open={this.state.openDictionary}
            dictionaryBtnClick={this.dictionaryBtnClick}
            dictionary={this.state.dictionary}
            setDictionaryState={this.setDictionaryState}
            deleteWordFromTest={this.deleteWordFromTest}
            clearDictionary={this.clearDictionary}
          />
          <Settings
            open={this.state.openSettings}
            setWordsLimitStorage={this.setWordsLimitStorage}
          />
        </div>
        <div className="footer">
          <div className="dictionary-button" onClick={this.dictionaryBtnClick}>
            <img src={book} alt="" className="book" /> Слова для теста
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
