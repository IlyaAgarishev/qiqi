/* global chrome */

export const wordEndingGenerator = (wordsLimit, dictionaryLength) => {
  let wordsLeft = wordsLimit - dictionaryLength;
  if (
    (wordsLeft >= 5 && wordsLeft <= 14) ||
    (wordsLeft % 10 >= 5 && wordsLeft % 10 <= 9) ||
    wordsLeft % 10 === 0
  ) {
    return `${wordsLeft} слов`;
  } else if (wordsLeft >= 2 && wordsLeft <= 4) {
    return `${wordsLeft} слова`;
  } else if (wordsLeft === 1 || (wordsLeft % 10 >= 1 && wordsLeft % 10 <= 4)) {
    return `${wordsLeft} слово`;
  }
};

export const wordsLimitGet = callback => {
  chrome.storage.sync.get(["wordsLimit"], storageData => {
    callback(storageData.wordsLimit);
  });
};

export const wordsLimitSet = number => {
  chrome.storage.sync.set({ wordsLimit: number });
};

// export const dictionaryGet = callback => {
//   chrome.storage.sync.get(["dictionary"], storageData => {
//     callback(storageData.dictionary);
//   });
// };

// export const wordsLimitSet = callback => {
//   chrome.storage.sync.get(["wordsLimit"], storageData => {
//     callback(storageData.wordsLimit);
//   });
// };

// chrome.storage.sync.set({ wordsLimit: number }, () => {
//   setWordsLimitState();
// });
