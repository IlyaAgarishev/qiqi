var string = `из
под
на
перед
за
над
до
через
вроде
ввиду
сверх
насчет
в
от
к
внутри
вокруг
у
с
для
ради
об
о
про
по`;

var reqExp = /[а-яА-я]+/g;
var matchedWords = string.match(reqExp);

export default matchedWords;
