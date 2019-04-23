/* global chrome */

export const wordEndingGenerator = n => {
  if ((n % 10 >= 5 && n % 10 <= 9) || n % 10 === 0 || (n >= 11 && n <= 14)) {
    return `${n} слов`;
  } else if (n % 10 >= 2 && n % 10 <= 4 && n !== 12 && n !== 13 && n !== 14) {
    return `${n} слова`;
  } else if (n % 10 === 1 && n !== 11) {
    return `${n} слово`;
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

export const dictionaryGet = callback => {
  chrome.storage.sync.get(["dictionary"], storageData => {
    callback(storageData.dictionary);
  });
};

export const dictionarySet = array => {
  chrome.storage.sync.set({ dictionary: array });
};
