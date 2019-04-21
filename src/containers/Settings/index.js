/* global chrome */

import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import WordsLimitCell from "../WordsLimitCell";
import { wordsLimitGet } from "../../utils";

const Settings = props => {
  const { open, setWordsLimit, wordsLimit } = { ...props };
  const [certainCell, setCertainCell] = useState(10);
  const numbersArray = [10, 20, 30];

  useEffect(() => {
    wordsLimitGet(setWordsLimit);
  }, []);

  useEffect(() => {
    setCertainCell(wordsLimit);
  }, [wordsLimit]);

  return open ? (
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
  ) : null;
};

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  setWordsLimit: PropTypes.func.isRequired
};

export default Settings;
