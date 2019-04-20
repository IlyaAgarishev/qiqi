/* global chrome */

import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import settings from "../../img/settings.svg";
import book from "../../img/book.svg";
import WordsTillTest from "../../containers/WordsTillTest";
import Dictionary from "../Dictionary";
import Settings from "../Settings";
import Quiz from "react-random-quiz";

const Main = () => {
  const [openDictionary, setOpenDictionary] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [dictionary, setDictionary] = useState([]);
  const [wordsLimit, setWordsLimit] = useState(10);

  const setWordsLimitState = () => {
    chrome.storage.sync.get(["wordsLimit"], storageData => {
      setWordsLimit(storageData.wordsLimit);
    });
  };

  const setWordsLimitStorage = number => {
    chrome.storage.sync.set({ wordsLimit: number }, () => {
      setWordsLimitState();
    });
  };

  const setDictionaryState = () => {
    chrome.storage.sync.get(["dictionary"], storageData => {
      setDictionary(storageData.dictionary);
    });
  };

  const clearDictionary = () => {
    chrome.storage.sync.set({ dictionary: [] }, () => {
      setDictionaryState();
    });
  };

  const setChromeStorage = () => {
    chrome.storage.sync.set({ dictionary: dictionary }, function() {
      chrome.storage.sync.get(["dictionary"], function(storageData) {
        console.log(storageData.dictionary);
      });
    });
  };

  const dictionaryBtnClick = () => {
    setOpenDictionary(!openDictionary);
    setDictionaryState();
  };

  const settingsBtnClick = () => {
    setOpenSettings(!openSettings);
  };

  const deleteWordFromTest = index => {
    dictionary.splice(index, 1);
    setChromeStorage();
  };

  useEffect(() => {
    setWordsLimitState();
    setDictionaryState();
  });

  return (
    <div
      className={styles.main}
      onClick={event => {
        if (
          event.target.className.split("_")[0] === "Settings" ||
          event.target.className.split("_")[0] === "WordsLimitCell" ||
          event.target.className.split("_")[1] === "settingsImg"
        ) {
          return null;
        } else {
          setOpenSettings(false);
        }
      }}
    >
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
          onClick={settingsBtnClick}
        />
      </div>
      <div className={styles.content}>
        {dictionary.length >= wordsLimit ? (
          <Quiz wordsToTest={dictionary} clearDictionary={clearDictionary} />
        ) : (
          <WordsTillTest
            dictionaryLength={dictionary.length}
            wordsLimit={wordsLimit}
          />
        )}

        <Dictionary
          open={openDictionary}
          dictionaryBtnClick={dictionaryBtnClick}
          dictionary={dictionary}
          deleteWordFromTest={deleteWordFromTest}
          clearDictionary={clearDictionary}
        />
        <Settings
          open={openSettings}
          setWordsLimitStorage={setWordsLimitStorage}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.dictionaryButton} onClick={dictionaryBtnClick}>
          <img src={book} alt="" className={styles.book} /> Слова для теста
        </div>
      </div>
    </div>
  );
};

export default Main;
