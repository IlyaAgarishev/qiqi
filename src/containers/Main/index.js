/* global chrome */

import React, { useState, useEffect, useMemo } from "react";
import styles from "./index.module.css";
import settings from "../../img/settings.svg";
import book from "../../img/book.svg";
import WordsTillTest from "../../containers/WordsTillTest";
import Dictionary from "../Dictionary";
import Settings from "../Settings";
import Quiz from "react-random-quiz";
import {
  wordsLimitGet,
  dictionaryGet,
  dictionarySet,
  wordsLimitSet
} from "../../utils";

const Main = () => {
  const [openDictionary, setOpenDictionary] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [dictionary, setDictionary] = useState([]);
  const [wordsLimit, setWordsLimit] = useState(10);

  useMemo(() => {
    dictionaryGet(setDictionary);
  }, []);

  useEffect(() => {
    wordsLimitGet(setWordsLimit);
  }, []);

  useEffect(() => {
    dictionarySet(dictionary);
  }, [dictionary]);

  useEffect(() => {
    wordsLimitSet(wordsLimit);
  }, [wordsLimit]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>qiqi</div>
        <img
          src={settings}
          alt=""
          className={
            openSettings
              ? [styles.settingsImg, styles.settingsImgTransformPlus].join(" ")
              : [styles.settingsImg, styles.settingsImgTransformMinus].join(" ")
          }
          onClick={() => setOpenSettings(!openSettings)}
        />
      </div>
      <div className={styles.content}>
        {dictionary.length >= wordsLimit ? (
          <Quiz
            wordsToTest={dictionary}
            clearDictionary={() => setDictionary([])}
          />
        ) : (
          <WordsTillTest
            dictionaryLength={dictionary.length}
            wordsLimit={wordsLimit}
          />
        )}
        <Dictionary
          open={openDictionary}
          setOpenDictionary={setOpenDictionary}
          dictionary={dictionary}
          setDictionary={setDictionary}
        />
        {openSettings ? (
          <Settings
            setWordsLimit={setWordsLimit}
            wordsLimit={wordsLimit}
            setOpenSettings={setOpenSettings}
          />
        ) : null}
      </div>
      <div className={styles.footer}>
        <div
          className={styles.dictionaryButton}
          onClick={() => setOpenDictionary(!openDictionary)}
        >
          <img src={book} alt="" className={styles.book} /> Слова для теста
        </div>
      </div>
    </div>
  );
};

export default Main;
