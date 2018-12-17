// chrome.storage.sync.clear(function() {
//   chrome.storage.sync.get(null, function(item) {
//     console.log(item);
//   });
// });

chrome.storage.sync.get(['dictionary'], function(data) {
  if (data.dictionary == undefined) {
    chrome.storage.sync.set({ dictionary: [] }, function() {
      console.log('array just has been made');
    });
  } else if (Object.prototype.toString.call(data.dictionary) == '[object Array]') {
    console.log('array exists');
  } else {
    console.log('object exists but its not an array');
  }
});

document.body.onmouseup = function(event) {
  chrome.storage.sync.get(['dictionary'], function(storageData) {
    // console.log(storageData);
    var onlyLatingLettersRegExp = /[a-zA-Z]+/g;
    var selectedWord = window.getSelection().toString();
    var matchedWord = selectedWord.match(onlyLatingLettersRegExp);
    if (matchedWord != null && matchedWord.length == 1) {
      // AJAX REQUEST TO DETECT LANGUAGE -------------------------
      var xhr = new XMLHttpRequest();
      var encodedTextToDetect = 'text=' + encodeURIComponent(matchedWord[0]);
      xhr.open(
        'POST',
        'https://translate.yandex.net/api/v1.5/tr.json/detect?,de&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
        true
      );
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        var ajaxDataDetection = JSON.parse(this.responseText);
        if (ajaxDataDetection.lang == 'en') {
          // AJAX REQUEST TO TRANSLATE WORD
          var xhr = new XMLHttpRequest();
          var encodedTextToTranslate = 'text=' + encodeURIComponent(matchedWord[0]);
          xhr.open(
            'POST',
            'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
            true
          );
          xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            var ajaxDataTranslation = JSON.parse(this.responseText);
            var translation = ajaxDataTranslation.text[0];
            // Pushing translation in dictionary
            storageData.dictionary.push({ word: matchedWord[0], translation: translation });
            // Setting previous dictionary to chrome local storage
            chrome.storage.sync.set({ dictionary: storageData.dictionary }, function() {
              chrome.storage.sync.get(['dictionary'], function(storageData) {
                console.log(storageData.dictionary);
              });
            });
            // Visualization of translation:
            // reject-word-adding element
            var rejectWordAdding = document.createElement('div');
            rejectWordAdding.className = 'reject-word-adding';
            Object.assign(rejectWordAdding.style, {
              position: 'absolute',
              top: event.clientY + window.pageYOffset - 65 + 'px',
              left: event.clientX + 'px',
              'z-index': 99999999,
              cursor: 'pointer'
            });
            // rectangle element
            var rectangle = document.createElement('div');
            rectangle.className = 'reject-word-adding-rectangle';
            // text element
            var text = document.createElement('div');
            text.className = 'reject-word-adding-text';
            text.innerHTML = translation;
            // bin element
            var bin = document.createElement('img');
            bin.className = 'reject-word-adding-bin';
            bin.src = 'https://svgshare.com/i/9zH.svg';
            // triangle element
            var triangle = document.createElement('div');
            triangle.className = 'reject-word-adding-triangle';
            // appending children to elements
            rejectWordAdding.appendChild(rectangle);
            rejectWordAdding.appendChild(triangle);
            rectangle.appendChild(text);
            rectangle.appendChild(bin);
            // showing bin when mouse over rectangle
            rectangle.onmouseover = function() {
              text.style.opacity = '0';
              bin.style.opacity = '1';
            };
            // showing text when mouse out rectangle
            rectangle.onmouseout = function() {
              text.style.opacity = '1';
              bin.style.opacity = '0';
            };

            setTimeout(() => {
              rejectWordAdding.style.opacity = 1;
              setTimeout(() => {
                rejectWordAdding.style.opacity = 0;
                setTimeout(() => {
                  document.body.removeChild(rejectWordAdding);
                  // rejectWordAdding.style.display = 'none';
                }, 400);
              }, 3000);
            }, 10);

            // rejectWordAdding.style.display = 'none';
            // Appending reject-word-adding element to body at the end
            document.body.appendChild(rejectWordAdding);
          };
          xhr.send(encodedTextToTranslate);
        }
      };
      xhr.send(encodedTextToDetect);
    } else if (matchedWord.length > 1) {
      console.log('please choose only one word');
    } else {
      return null;
    }
  });
};

console.log(window.navigator);

// document.addEventListener('click', printMousePos);

// var xhr = new XMLHttpRequest();

// var json = 'text=' + encodeURIComponent('My mom loved Valium and lots of drugs');

// xhr.open(
//   'POST',
//   'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
//   true
// );
// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

// xhr.onreadystatechange = function() {
//   if (this.readyState != 4) return;

//   console.log(JSON.parse(this.responseText));
// };

// xhr.send(json);

// ---------------------------------------------------

// var xhr = new XMLHttpRequest();

// var json = 'text=' + encodeURIComponent('Привет');

// xhr.open(
//   'POST',
//   'https://translate.yandex.net/api/v1.5/tr.json/detect?,de&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
//   true
// );
// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

// xhr.onreadystatechange = function() {
//   if (this.readyState != 4) return;

//   console.log(JSON.parse(this.responseText));
// };

// xhr.send(json);
