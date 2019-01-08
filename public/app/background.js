chrome.runtime.onInstalled.addListener(function() {
  var newURL = 'https://github.com/IlyaAgarishev/qiqi';
  chrome.tabs.create({ url: newURL });
});
