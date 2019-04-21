/* global chrome */

import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import WordsLimitCell from "../WordsLimitCell";

const Settings = props => {
  const { setWordsLimit, wordsLimit, setOpenSettings } = { ...props };
  const numbersArray = [10, 20, 30];

  return (
    <div>
      <div
        className={styles.closeSettings}
        onClick={() => {
          setOpenSettings(false);
        }}
      />
      <div className={styles.settings}>
        <div className={styles.wordsLimitSettings}>
          <div className={styles.wordsLimitSettingsTitle}>
            Количество слов в тесте :
          </div>
          <div className={styles.wordsLimitCells}>
            {numbersArray.map((number, index) => {
              return (
                <WordsLimitCell
                  index={number}
                  wordsLimit={wordsLimit}
                  setWordsLimit={setWordsLimit}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  setWordsLimit: PropTypes.func.isRequired,
  wordsLimit: PropTypes.number.isRequired,
  setOpenSettings: PropTypes.func.isRequired
};

export default Settings;
