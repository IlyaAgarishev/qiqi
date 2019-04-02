/* global chrome */

import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

class Settings extends React.Component {
  componentDidMount() {
    if (this.props.open) {
      this.settings.style.display = "block";
    } else {
      this.settings.style.display = "none";
    }

    this.enableSingleWordsLimitStyle(this.wordsLimitCells.children);
  }

  disableAllWordsLimitStyle = children => {
    for (let i = 0; i < children.length; i++) {
      children[i].style.color = "white";
      children[i].style.background = "#0091d7";
    }
  };

  enableSingleWordsLimitStyle = children => {
    chrome.storage.sync.get(["wordsLimit"], storageData => {
      for (let i = 0; i < children.length; i++) {
        let synthIndex = i + 1;
        if (storageData.wordsLimit === synthIndex * 10) {
          children[i].style.color = "#0091d7";
          children[i].style.background = "white";
        }
      }
    });
  };

  setWordsLimitSettings = (number, children) => {
    this.disableAllWordsLimitStyle(children);
    this.props.setWordsLimitStorage(number);
    this.enableSingleWordsLimitStyle(children);
  };

  shouldComponentUpdate(props) {
    if (props.open) {
      this.settings.style.display = "block";
      setTimeout(() => {
        this.settings.style.opacity = "1";
      }, 10);
    } else {
      this.settings.style.opacity = "0";
      setTimeout(() => {
        this.settings.style.display = "none";
      }, 300);
    }
    return true;
  }

  render() {
    return (
      <div className={styles.settings} ref={ref => (this.settings = ref)}>
        <div className={styles.wordsLimitSettings}>
          <div className={styles.wordsLimitSettingsTitle}>
            Количество слов в тесте :
          </div>
          <div
            className={styles.wordsLimitCells}
            ref={ref => (this.wordsLimitCells = ref)}
          >
            <div
              className={styles.wordsLimitCell}
              onClick={() => {
                this.setWordsLimitSettings(10, this.wordsLimitCells.children);
              }}
            >
              10
            </div>
            <div
              className={styles.wordsLimitCell}
              onClick={() => {
                this.setWordsLimitSettings(20, this.wordsLimitCells.children);
              }}
            >
              20
            </div>
            <div
              className={styles.wordsLimitCell}
              onClick={() => {
                this.setWordsLimitSettings(30, this.wordsLimitCells.children);
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

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  setWordsLimitStorage: PropTypes.func.isRequired
};

export default Settings;
