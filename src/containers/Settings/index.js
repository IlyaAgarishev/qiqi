/* global chrome */

import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import WordsLimitCell from "../WordsLimitCell";
import { wordsLimitGet } from "../../utils";

const Settings = props => {
  const { open, setWordsLimit } = { ...props };
  const [certainCell, setCertainCell] = useState(10);

  return open ? (
    <div className={styles.settings}>
      <div className={styles.wordsLimitSettings}>
        <div className={styles.wordsLimitSettingsTitle}>
          Количество слов в тесте :
        </div>
        <div className={styles.wordsLimitCells}>
          <WordsLimitCell
            index={10}
            setWordsLimit={setWordsLimit}
            certainCell={certainCell}
            setCertainCell={setCertainCell}
          />
          <WordsLimitCell
            index={20}
            setWordsLimit={setWordsLimit}
            certainCell={certainCell}
            setCertainCell={setCertainCell}
          />
          <WordsLimitCell
            index={30}
            setWordsLimit={setWordsLimit}
            certainCell={certainCell}
            setCertainCell={setCertainCell}
          />
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
