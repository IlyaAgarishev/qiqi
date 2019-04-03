/* global chrome */

import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import WordsLimitCell from "../WordsLimitCell";

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      certainCell: null
    };
  }

  componentWillMount() {
    chrome.storage.sync.get(["wordsLimit"], storageData => {
      this.certainCellSetter(storageData.wordsLimit);
    });
  }

  certainCellSetter = index => {
    this.setState({ certainCell: index });
  };

  render() {
    return this.props.open ? (
      <div className={styles.settings}>
        <div className={styles.wordsLimitSettings}>
          <div className={styles.wordsLimitSettingsTitle}>
            Количество слов в тесте :
          </div>
          <div className={styles.wordsLimitCells}>
            <WordsLimitCell
              index={10}
              setWordsLimitStorage={this.props.setWordsLimitStorage}
              certainCell={this.state.certainCell}
              certainCellSetter={this.certainCellSetter}
            />
            <WordsLimitCell
              index={20}
              setWordsLimitStorage={this.props.setWordsLimitStorage}
              certainCell={this.state.certainCell}
              certainCellSetter={this.certainCellSetter}
            />
            <WordsLimitCell
              index={30}
              setWordsLimitStorage={this.props.setWordsLimitStorage}
              certainCell={this.state.certainCell}
              certainCellSetter={this.certainCellSetter}
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  setWordsLimitStorage: PropTypes.func.isRequired
};

export default Settings;
