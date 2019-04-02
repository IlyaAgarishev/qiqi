// Check if dictionary exists
chrome.storage.sync.get(["dictionary"], data => {
  if (data.dictionary == undefined) {
    chrome.storage.sync.set({ dictionary: [] });
  } else {
    return null;
  }
});

// Check if wordsLimit exists
chrome.storage.sync.get(["wordsLimit"], data => {
  if (data.wordsLimit == undefined) {
    chrome.storage.sync.set({ wordsLimit: 10 });
  } else {
    return null;
  }
});

document.body.onmouseup = event => {
  chrome.storage.sync.get(["dictionary"], storageData => {
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
      chrome.runtime.sendMessage(
        { contentScriptQuery: "langDetection", word: matchedWord[0] },
        responseText => {
          console.log(responseText);
          let ajaxDataDetection = JSON.parse(responseText);
          // Process of checking word lang origin
          if (ajaxDataDetection.lang == "en") {
            // AJAX REQUEST TO TRANSLATE WORD
            chrome.runtime.sendMessage(
              { contentScriptQuery: "translation", word: matchedWord[0] },
              responseText => {
                let ajaxDataTranslation = JSON.parse(responseText);
                let translation = ajaxDataTranslation.text[0];
                chrome.storage.sync.get(["wordsLimit"], data => {
                  // Check if words limit exeeded or not
                  if (storageData.dictionary.length < data.wordsLimit) {
                    // Visualization of translation:
                    // add-word element
                    let addWord = document.createElement("div");
                    addWord.className = "add-word";
                    Object.assign(addWord.style, {
                      position: "absolute",
                      top: event.clientY + window.pageYOffset - 65 + "px",
                      left: event.clientX + "px",
                      "z-index": 99999999,
                      cursor: "pointer"
                    });

                    // rectangle element
                    let rectangle = document.createElement("div");
                    rectangle.className = "add-word-rectangle";
                    addWord.appendChild(rectangle);

                    // triangle element
                    let triangle = document.createElement("div");
                    triangle.className = "add-word-triangle";
                    addWord.appendChild(triangle);

                    // text element
                    let text = document.createElement("div");
                    text.className = "add-word-text";
                    text.innerHTML = translation;
                    rectangle.appendChild(text);

                    // indication element
                    let addIcon = document.createElement("img");
                    addIcon.className = "add-word-addIcon";
                    addIcon.src = "https://svgshare.com/i/A7B.svg";
                    rectangle.appendChild(addIcon);

                    // showing addIcon when mouse over rectangle
                    rectangle.onmouseover = () => {
                      text.style.opacity = "0";
                      addIcon.style.opacity = "1";
                    };
                    // showing text when mouse out rectangle
                    rectangle.onmouseout = () => {
                      text.style.opacity = "1";
                      addIcon.style.opacity = "0";
                    };

                    // Check if word already exists, depends on it - change style
                    chrome.storage.sync.get(["dictionary"], storageData => {
                      let repeatedWord = storageData.dictionary.find(
                        o => o.word === matchedWord[0]
                      );
                      if (repeatedWord == undefined) {
                        return null;
                      } else {
                        rectangle.style.background = "#1CE3A7";
                        rectangle.style.cursor = "default";
                        triangle.style.borderColor =
                          "#1CE3A7 transparent transparent transparent";
                        rectangle.onmouseover = () => {
                          text.style.opacity = "1";
                          addIcon.style.opacity = "0";
                        };
                      }
                    });

                    setTimeout(() => {
                      addWord.style.opacity = 1;
                      rectangle.onclick = () => {
                        // Check if word already exists
                        chrome.storage.sync.get(["dictionary"], storageData => {
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
                            chrome.storage.sync.set(
                              { dictionary: storageData.dictionary },
                              () => {
                                chrome.storage.sync.get(["dictionary"]);
                              }
                            );
                            rectangle.style.background = "#1CE3A7";
                            triangle.style.borderColor =
                              "#1CE3A7 transparent transparent transparent";
                          } else {
                            return null;
                          }
                        });
                      };
                      setTimeout(() => {
                        addWord.style.opacity = 0;
                        setTimeout(() => {
                          document.body.removeChild(addWord);
                        }, 400);
                      }, 3000);
                    }, 10);

                    // Appending add-word element to body at the end
                    document.body.appendChild(addWord);
                  } else {
                    // add-word element
                    let finishQuiz = document.createElement("div");
                    finishQuiz.className = "finish-quiz";
                    Object.assign(finishQuiz.style, {
                      position: "absolute",
                      top: event.clientY + window.pageYOffset - 65 + "px",
                      left: event.clientX + "px",
                      "z-index": 99999999,
                      cursor: "pointer"
                    });

                    // rectangle element
                    let rectangle = document.createElement("div");
                    rectangle.className = "finish-quiz-rectangle";
                    finishQuiz.appendChild(rectangle);

                    // text element
                    let text = document.createElement("div");
                    text.className = "finish-quiz-text";
                    text.innerHTML = translation;
                    rectangle.appendChild(text);

                    // indication element
                    let indication = document.createElement("div");
                    indication.innerHTML = "ПРОЙДИТЕ ТЕСТ";
                    indication.className = "finish-quiz-indication";

                    // arrow img element
                    let arrowImg = document.createElement("img");
                    arrowImg.className = "arrow-img";
                    arrowImg.src = "https://svgshare.com/i/AGe.svg";
                    indication.appendChild(arrowImg);
                    rectangle.appendChild(indication);

                    // triangle element
                    let triangle = document.createElement("div");
                    triangle.className = "finish-quiz-triangle";
                    finishQuiz.appendChild(triangle);

                    // appending children to elements
                    // showing indication when mouse over rectangle
                    rectangle.onmouseover = () => {
                      text.style.display = "none";
                      indication.style.display = "flex";
                    };
                    // showing text when mouse out rectangle
                    rectangle.onmouseout = () => {
                      text.style.display = "flex";
                      indication.style.display = "none";
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

                    // Appending add-word element to body at the end
                    document.body.appendChild(finishQuiz);
                  }
                });
              }
            );
          }
        }
      );
    } else {
      return null;
    }
  });
};
