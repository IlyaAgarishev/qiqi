// chrome.storage.sync.clear(function() {
//   chrome.storage.sync.get(null, function(item) {
//     console.log(item);
//   });
// });

chrome.storage.sync.get(['dictionary'], function(data) {
  if (data.dictionary == undefined) {
    chrome.storage.sync.set({ dictionary: [] }, function() {
      console.log('made array');
    });
  } else if (Object.prototype.toString.call(data.dictionary) == '[object Array]') {
    console.log('array exists');
  } else {
    console.log('object exists but its not array');
  }
});

document.body.onmouseup = function(event) {
  chrome.storage.sync.get(['dictionary'], function(storageData) {
    // console.log(storageData);
    var onlyWordsReqExp = /[a-zA-Z]+/g;
    var selectedWord = window.getSelection().toString();
    var matchedWord = selectedWord.match(onlyWordsReqExp);
    if (matchedWord != null) {
      if (matchedWord.length == 1) {
        // console.log(matchedWord);
        var xhr = new XMLHttpRequest();
        var json = 'text=' + encodeURIComponent(matchedWord[0]);
        xhr.open(
          'POST',
          'https://translate.yandex.net/api/v1.5/tr.json/detect?,de&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
          true
        );
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
          if (this.readyState != 4) return;
          var ajaxDataDetect = JSON.parse(this.responseText);
          if (ajaxDataDetect.lang == 'en') {
            // -------
            var xhr = new XMLHttpRequest();
            var json = 'text=' + encodeURIComponent(matchedWord[0]);
            xhr.open(
              'POST',
              'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2',
              true
            );
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
              if (this.readyState != 4) return;
              var ajaxDataTranslate = JSON.parse(this.responseText);
              var translation = ajaxDataTranslate.text[0];
              console.log(translation);
              storageData.dictionary.push({ word: matchedWord[0], translation: translation });
              // -------------
              // function printMousePos(event) {
              var rejectWordAdding = document.createElement('div');
              rejectWordAdding.className = 'reject-word-adding';
              Object.assign(rejectWordAdding.style, {
                position: 'absolute',
                top: event.clientY + window.pageYOffset - 65 + 'px',
                left: event.clientX + 'px',
                'z-index': 99999999,
                cursor: 'pointer'
              });

              var rectangle = document.createElement('div');
              rectangle.className = 'reject-word-adding-rectangle';

              var text = document.createElement('div');
              text.className = 'reject-word-adding-text';

              var bin = document.createElement('img');
              bin.className = 'reject-word-adding-bin';
              bin.src = 'https://svgshare.com/i/9zH.svg';

              var triangle = document.createElement('div');
              triangle.className = 'reject-word-adding-triangle';

              rejectWordAdding.appendChild(rectangle);
              rejectWordAdding.appendChild(triangle);
              rectangle.appendChild(text);
              rectangle.appendChild(bin);

              text.innerHTML = translation;

              rectangle.onmouseover = function() {
                text.style.opacity = '0';
                bin.style.opacity = '1';
              };

              rectangle.onmouseout = function() {
                text.style.opacity = '1';
                bin.style.opacity = '0';
              };

              // rejectWordAdding.style.display = 'none';

              document.body.appendChild(rejectWordAdding);
              console.log(event.clientX);
              console.log(event.clientY);
              // }
              // printMousePos(event);
              // -------------------
              chrome.storage.sync.set({ dictionary: storageData.dictionary }, function() {
                chrome.storage.sync.get(['dictionary'], function(storageData) {
                  console.log(storageData.dictionary);
                });
              });
            };
            xhr.send(json);
            // ----------
          }
        };
        xhr.send(json);
      } else {
        alert('Please choose only one word');
      }
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
