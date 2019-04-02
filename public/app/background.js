// chrome.runtime.onInstalled.addListener(function() {
//   var newURL = "https://github.com/IlyaAgarishev/qiqi";
//   chrome.tabs.create({ url: newURL });
// });

// Creating pattern ajax post request
ajaxPostRequest = (text, url, callback) => {
  let xhr = new XMLHttpRequest();
  let encodedTextToDetect = "text=" + encodeURIComponent(text);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;
    callback(this.responseText);
  };
  xhr.send(encodedTextToDetect);
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.contentScriptQuery == "langDetection") {
    ajaxPostRequest(
      request.word,
      "https://translate.yandex.net/api/v1.5/tr.json/detect?,de&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2",
      responseText => {
        sendResponse(responseText);
      }
    );

    return true; // Will respond asynchronously.
  } else if (request.contentScriptQuery == "translation") {
    ajaxPostRequest(
      request.word,
      "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20181216T030612Z.d437d4b4c93ec8c2.96b6e7d804c8eb9b7aaf3c69cac4fd25abab90c2",
      responseText => {
        sendResponse(responseText);
      }
    );

    return true; // Will respond asynchronously.
  }
});
