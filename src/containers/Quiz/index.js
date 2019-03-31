import React from "react";
import "./index.css";
import Answer from "../Answer";
import Adjectives from "../../RussianDictionary/adjectives.js";
import Adverbs from "../../RussianDictionary/adverbs.js";
import Conjunctions from "../../RussianDictionary/conjunctions.js";
import Nouns from "../../RussianDictionary/nouns.js";
import Numerous from "../../RussianDictionary/numerous.js";
import Prepositions from "../../RussianDictionary/prepositions.js";
import Pronouns from "../../RussianDictionary/pronouns.js";
import Verbs from "../../RussianDictionary/verbs.js";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsToTest: [],
      answers: [],
      questionIndex: 0
    };
  }

  componentWillMount() {
    this.setState({
      wordsToTest: this.props.dictionary,
      questionWord: this.props.dictionary[0].word,
      rightAnswer: this.props.dictionary[0].translation.toLowerCase()
    });

    this.finalAnswersArrayGenerator(this.props.dictionary[0].translation);
  }

  takeRandomWordFromArray = array => {
    return array[Math.floor(Math.random(0, 1) * array.length)].toLowerCase();
  };

  createAnswersArray = (array, rightAnswer) => {
    var answersArray = [
      { answer: rightAnswer },
      { answer: this.takeRandomWordFromArray(array) },
      { answer: this.takeRandomWordFromArray(array) },
      { answer: this.takeRandomWordFromArray(array) }
    ];

    return answersArray;
  };

  smartAnswersCreator = rightAnswer => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20181222T134922Z.9d94e99b6da5e84a.19d04de00934554d34f2a675f0100fd307a76107&lang=ru-en&text=${rightAnswer}`,
      false
    );
    xhr.send();
    if (xhr.status != 200) {
      console.log(xhr.status + ": " + xhr.statusText);
    } else {
      var data = JSON.parse(xhr.responseText);
      if (data.def.length == 0) {
        var partOfSpeach = "noun";
      } else {
        var partOfSpeach = data.def[0].pos;
      }

      if (partOfSpeach == "adjective") {
        return this.createAnswersArray(Adjectives, rightAnswer);
      } else if (partOfSpeach == "adverb") {
        return this.createAnswersArray(Adverbs, rightAnswer);
      } else if (partOfSpeach == "conjunction" || partOfSpeach == "particle") {
        return this.createAnswersArray(Conjunctions, rightAnswer);
      } else if (partOfSpeach == "noun") {
        return this.createAnswersArray(Nouns, rightAnswer);
      } else if (partOfSpeach == "numeral") {
        return this.createAnswersArray(Numerous, rightAnswer);
      } else if (partOfSpeach == "preposition") {
        return this.createAnswersArray(Prepositions, rightAnswer);
      } else if (partOfSpeach == "pronoun") {
        return this.createAnswersArray(Pronouns, rightAnswer);
      } else if (partOfSpeach == "verb") {
        return this.createAnswersArray(Verbs, rightAnswer);
      } else {
        return this.createAnswersArray(Nouns, rightAnswer);
      }
    }
  };

  // Fisher-Yates Shuffle ALGORITHM
  shuffleArray = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  uncheckRadioInputs = inputParents => {
    for (let i = 0; i < inputParents.length; i++) {
      inputParents[i].children[0].checked = false;
    }
  };

  finalAnswersArrayGenerator = rightAnswer => {
    // Generate array of answers with right parts of speach
    var answersArray = this.smartAnswersCreator(rightAnswer.toLowerCase());
    // Shuffling this generated array
    this.shuffleArray(answersArray);
    // Than setting it to state
    this.setState({ answersArray: answersArray });
  };

  onInputChange = word => {
    this.setState({ selectedAnswer: word });
  };

  render() {
    return (
      <div
        className="quiz"
        ref={ref => {
          this.quiz = ref;
        }}
      >
        <div className="question-text">
          "{this.state.questionWord}" переводится как ?
        </div>
        <form
          className="answers"
          ref={ref => {
            this.answers = ref;
          }}
        >
          {this.state.answersArray.map((element, index) => {
            return (
              <Answer
                onInputChange={this.onInputChange}
                answer={element.answer}
                key={index}
                answerId={
                  this.state.questionWord +
                  "_" +
                  element.answer +
                  "_" +
                  index +
                  "_" +
                  Math.floor(Math.random(0, 1) * 1000)
                }
                ref={ref => {
                  this.answer = ref;
                }}
              />
            );
          })}
        </form>
        <div
          className="checkAnswer"
          ref={ref => {
            this.checkAnswer = ref;
          }}
          onClick={() => {
            if (this.state.selectedAnswer == this.state.rightAnswer) {
              this.quiz.style.background = "#3FFFA6";
              setTimeout(() => {
                this.setState({ questionIndex: this.state.questionIndex + 1 });
                if (this.state.questionIndex != this.state.wordsToTest.length) {
                  this.setState({
                    questionWord: this.state.wordsToTest[
                      this.state.questionIndex
                    ].word,
                    rightAnswer: this.state.wordsToTest[
                      this.state.questionIndex
                    ].translation.toLowerCase()
                  });
                  this.finalAnswersArrayGenerator(this.state.rightAnswer);
                  this.quiz.style.background = "white";
                  this.uncheckRadioInputs(this.quiz.children[1].children);
                } else {
                  this.props.clearDictionary();
                }
              }, 700);
            } else {
              this.uncheckRadioInputs(this.quiz.children[1].children);
              this.quiz.style.background = "#ff6c6c";
              setTimeout(() => {
                this.quiz.style.background = "white";
              }, 150);
            }
          }}
        >
          Дальше
        </div>
        <div className="questionsCounter">
          {this.state.questionIndex + 1} / {this.state.wordsToTest.length}
        </div>
      </div>
    );
  }
}

export default Quiz;
