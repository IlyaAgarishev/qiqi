/* global chrome */

import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import WordsLimitCell from "../WordsLimitCell";

const Settings = props => {
  const { setWordsLimit, wordsLimit } = { ...props };
  const [certainCell, setCertainCell] = useState(wordsLimit);
  const numbersArray = [10, 20, 30];

  return (
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
                setWordsLimit={setWordsLimit}
                certainCell={certainCell}
                setCertainCell={setCertainCell}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  setWordsLimit: PropTypes.func.isRequired
};

export default Settings;
