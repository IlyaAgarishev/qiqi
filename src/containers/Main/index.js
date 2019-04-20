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
  const [dictionary, setDictionary] = useState([
    { translation: "корова", word: "cow" },
    { translation: "кот", word: "cat" },
    { translation: "пес", word: "dog" },
    { translation: "крот", word: "krot" },
    { translation: "вот", word: "vot" },
    { translation: "вов", word: "wow" },
    { translation: "лол", word: "lol" },
    { translation: "сейчас", word: "now" },
    { translation: "лох", word: "looser" },
    { translation: "как", word: "how" }
  ]);
  const [wordsLimit, setWordsLimit] = useState(10);

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
        <Settings open={openSettings} setWordsLimit={setWordsLimit} />
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
