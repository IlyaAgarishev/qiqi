// Check if dictionary exists
chrome.storage.sync.get(['dictionary'], data => {
  if (data.dictionary == undefined) {
    chrome.storage.sync.set({ dictionary: [] }, () => {
      console.log('array just has been made');
    });
  } else if (Object.prototype.toString.call(data.dictionary) == '[object Array]') {
    console.log('array exists');
  } else {
    console.log('object exists but its not an array');
  }
});

// Check if wordsLimit exists
chrome.storage.sync.get(['wordsLimit'], data => {
  if (data.wordsLimit == undefined) {
    chrome.storage.sync.set({ wordsLimit: 10 }, () => {
      console.log('WordsLimit has been set');
    });
  } else if (typeof data.wordsLimit == 'number') {
    console.log('wordsLimit exists');
  } else {
    console.log('object exists but its not number');
  }
});

// Creating pattern ajax post request
ajaxPostRequest = (text, url, callback) => {
  let xhr = new XMLHttpRequest();
  let encodedTextToDetect = 'text=' + encodeURIComponent(text);
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;
    callback(this.responseText);
  };
  xhr.send(encodedTextToDetect);
};

document.body.onmouseup = event => {
  chrome.storage.sync.get(['dictionary'], storageData => {
    let onlyLatingLettersRegExp = /[a-zA-Z]+/g;
    let selectedWord = window
      .getSelection()
      .toString()
      .toLowerCase();
    let matchedWord = selectedWord.match(onlyLatingLettersRegExp);
    // Translation only one word, no sentenceы
    if (matchedWord != null && matchedWord.length == 1) {
      // Check if selected word has english origin
      // AJAX REQUEST TO DETECT LANGUAGE
      ajaxPostRequest(
        matchedWord[0],
        'https://translate.yandex.net/api/v1.5/tr.json/detect?,de&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
        responseText => {
          let ajaxDataDetection = JSON.parse(responseText);
          // Process of checking word lang origin
          if (ajaxDataDetection.lang == 'en') {
            // AJAX REQUEST TO TRANSLATE WORD
            ajaxPostRequest(
              matchedWord[0],
              'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
              responseText => {
                let ajaxDataTranslation = JSON.parse(responseText);
                let translation = ajaxDataTranslation.text[0];
                chrome.storage.sync.get(['wordsLimit'], data => {
                  // Check if words limit exeeded or not
                  if (storageData.dictionary.length < data.wordsLimit) {
                    // Visualization of translation:
                    // reject-word-adding element
                    let rejectWordAdding = document.createElement('div');
                    rejectWordAdding.className = 'reject-word-adding';
                    Object.assign(rejectWordAdding.style, {
                      position: 'absolute',
                      top: event.clientY + window.pageYOffset - 65 + 'px',
                      left: event.clientX + 'px',
                      'z-index': 99999999,
                      cursor: 'pointer'
                    });
                    // rectangle element
                    let rectangle = document.createElement('div');
                    rectangle.className = 'reject-word-adding-rectangle';
                    // text element
                    let text = document.createElement('div');
                    text.className = 'reject-word-adding-text';
                    text.innerHTML = translation;
                    // bin element
                    let bin = document.createElement('img');
                    bin.className = 'reject-word-adding-bin';
                    bin.src = 'https://svgshare.com/i/A7B.svg';
                    // triangle element
                    let triangle = document.createElement('div');
                    triangle.className = 'reject-word-adding-triangle';
                    // appending children to elements
                    rejectWordAdding.appendChild(rectangle);
                    rejectWordAdding.appendChild(triangle);
                    rectangle.appendChild(text);
                    rectangle.appendChild(bin);
                    // showing bin when mouse over rectangle
                    rectangle.onmouseover = () => {
                      text.style.opacity = '0';
                      bin.style.opacity = '1';
                    };
                    // showing text when mouse out rectangle
                    rectangle.onmouseout = () => {
                      text.style.opacity = '1';
                      bin.style.opacity = '0';
                    };

                    // Check if word already exists
                    chrome.storage.sync.get(['dictionary'], storageData => {
                      let repeatedWord = storageData.dictionary.find(
                        o => o.word === matchedWord[0]
                      );
                      if (repeatedWord == undefined) {
                        return null;
                      } else {
                        rectangle.style.background = '#1CE3A7';
                        rectangle.style.cursor = 'default';
                        triangle.style.borderColor = '#1CE3A7 transparent transparent transparent';
                        rectangle.onmouseover = () => {
                          text.style.opacity = '1';
                          bin.style.opacity = '0';
                        };
                      }
                    });

                    setTimeout(() => {
                      rejectWordAdding.style.opacity = 1;
                      rectangle.onclick = () => {
                        // Check if word already exists
                        chrome.storage.sync.get(['dictionary'], storageData => {
                          let repeatedWord = storageData.dictionary.find(
                            o => o.word === matchedWord[0]
                          );
                          if (repeatedWord == undefined) {
                            // Pushing translation in dictionary
                            storageData.dictionary.push({
                              word: matchedWord[0],
                              translation: translation
                            });
                            // Setting  dictionary to chrome local storage
                            chrome.storage.sync.set({ dictionary: storageData.dictionary }, () => {
                              chrome.storage.sync.get(['dictionary']);
                            });
                            rectangle.style.background = '#1CE3A7';
                            triangle.style.borderColor =
                              '#1CE3A7 transparent transparent transparent';
                          } else {
                            return null;
                          }
                        });
                      };
                      setTimeout(() => {
                        rejectWordAdding.style.opacity = 0;
                        setTimeout(() => {
                          document.body.removeChild(rejectWordAdding);
                        }, 400);
                      }, 3000);
                    }, 10);

                    // Appending reject-word-adding element to body at the end
                    document.body.appendChild(rejectWordAdding);
                  } else {
                    // reject-word-adding element
                    let finishQuiz = document.createElement('div');
                    finishQuiz.className = 'finish-quiz';
                    Object.assign(finishQuiz.style, {
                      position: 'absolute',
                      top: event.clientY + window.pageYOffset - 65 + 'px',
                      left: event.clientX + 'px',
                      'z-index': 99999999,
                      cursor: 'pointer'
                    });
                    // rectangle element
                    let rectangle = document.createElement('div');
                    rectangle.className = 'finish-quiz-rectangle';
                    // text element
                    let text = document.createElement('div');
                    text.className = 'finish-quiz-text';
                    text.innerHTML = translation;
                    // bin element
                    let bin = document.createElement('div');
                    bin.innerHTML = 'ПРОЙДИТЕ ТЕСТ';
                    // let finishTest = document.createElement('div');
                    // finishTest.innerHTML = 'Пройдите тест';
                    let arrowImg = document.createElement('img');
                    arrowImg.className = 'arrow-img';
                    arrowImg.src = 'https://svgshare.com/i/AGe.svg';
                    bin.className = 'finish-quiz-bin';
                    // bin.appendChild(finishTest);
                    bin.appendChild(arrowImg);
                    // triangle element
                    let triangle = document.createElement('div');
                    triangle.className = 'finish-quiz-triangle';
                    // appending children to elements
                    finishQuiz.appendChild(rectangle);
                    finishQuiz.appendChild(triangle);
                    rectangle.appendChild(text);
                    rectangle.appendChild(bin);
                    // showing bin when mouse over rectangle
                    rectangle.onmouseover = () => {
                      text.style.display = 'none';
                      bin.style.display = 'flex';
                    };
                    // showing text when mouse out rectangle
                    rectangle.onmouseout = () => {
                      text.style.display = 'flex';
                      bin.style.display = 'none';
                    };

                    setTimeout(() => {
                      finishQuiz.style.opacity = 1;
                      setTimeout(() => {
                        finishQuiz.style.opacity = 0;
                        setTimeout(() => {
                          document.body.removeChild(finishQuiz);
                        }, 400);
                      }, 3000);
                    }, 10);

                    // Appending reject-word-adding element to body at the end
                    document.body.appendChild(finishQuiz);
                  }
                });
              }
            );
          }
        }
      );
    } else if (matchedWord.length > 1) {
      console.log('please choose only one word');
    } else {
      return null;
    }
  });
};
