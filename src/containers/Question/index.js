/* global chrome */

import React from 'react';
import './index.css';
import Answer from '../Answer';
import Adjectives from '../../RussianDictionary/adjectives.js';
import Adverbs from '../../RussianDictionary/adverbs.js';
import Conjunctions from '../../RussianDictionary/conjunctions.js';
import Nouns from '../../RussianDictionary/nouns.js';
import Numerous from '../../RussianDictionary/numerous.js';
import Prepositions from '../../RussianDictionary/prepositions.js';
import Pronouns from '../../RussianDictionary/pronouns.js';
import Verbs from '../../RussianDictionary/verbs.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answers: [] };
  }

  takeRandomWordFromArray = array => {
    return array[Math.floor(Math.random(0, 1) * array.length)];
  };

  createAnswersArray = array => {
    var answersArray = [
      { answer: this.props.rightAnswer.toLowerCase() },
      { answer: this.takeRandomWordFromArray(array) },
      { answer: this.takeRandomWordFromArray(array) },
      { answer: this.takeRandomWordFromArray(array) }
    ];

    return answersArray;
  };

  answersArrayGenerator = () => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20181222T134922Z.9d94e99b6da5e84a.19d04de00934554d34f2a675f0100fd307a76107&lang=ru-en&text=${
        this.props.rightAnswer
      }`,
      false
    );
    xhr.send();
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      var data = JSON.parse(xhr.responseText);
      if (data.def.length == 0) {
        var partOfSpeach = 'noun';
      } else {
        var partOfSpeach = data.def[0].pos;
      }

      if (partOfSpeach == 'adjective') {
        return this.createAnswersArray(Adjectives);
      } else if (partOfSpeach == 'adverb') {
        return this.createAnswersArray(Adverbs);
      } else if (partOfSpeach == 'conjunction' || partOfSpeach == 'particle') {
        return this.createAnswersArray(Conjunctions);
      } else if (partOfSpeach == 'noun') {
        return this.createAnswersArray(Nouns);
      } else if (partOfSpeach == 'numeral') {
        return this.createAnswersArray(Numerous);
      } else if (partOfSpeach == 'preposition') {
        return this.createAnswersArray(Prepositions);
      } else if (partOfSpeach == 'pronoun') {
        return this.createAnswersArray(Pronouns);
      } else if (partOfSpeach == 'verb') {
        return this.createAnswersArray(Verbs);
      } else {
        return this.createAnswersArray(Nouns);
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

  componentWillMount() {
    // Generating array with special parts of speach
    var answersArray = this.answersArrayGenerator();
    // Shuffling this array
    this.shuffleArray(answersArray);
    // Than setting it to state
    this.setState({ answersArray: answersArray });
  }

  render() {
    return (
      <div
        className="question"
        rightanswer={this.props.rightAnswer}
        ref={ref => {
          this.question = ref;
        }}
      >
        <div className="question-text">"{this.props.questionWord}" переводится как ?</div>
        <form
          className="answers"
          ref={ref => {
            this.answers = ref;
          }}
        >
          {this.state.answersArray.map((element, index) => {
            return (
              <Answer
                answer={element.answer}
                key={index}
                answerId={
                  this.props.questionWord +
                  '_' +
                  element.answer +
                  '_' +
                  index +
                  '_' +
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
            var rightAnswer = this.props.rightAnswer;
            for (let i = 0; i < this.answers.children.length; i++) {
              // Define variables
              var inputRadio = this.answers.children[i].children[0];
              var correctAnswerChecked =
                inputRadio.checked &&
                inputRadio.getAttribute('answer') == rightAnswer.toLowerCase();
              var wrongAnswerChecked =
                inputRadio.checked && inputRadio.getAttribute('answer') != rightAnswer;
              //On Check logic
              if (correctAnswerChecked) {
                this.question.style.background = '#3fffa6';
                setTimeout(() => {
                  this.props.onChecked(rightAnswer);
                }, 800);
              } else if (wrongAnswerChecked) {
                this.question.style.background = '#ff6c6c';
                setTimeout(() => {
                  this.question.style.background = 'white';
                }, 150);
                inputRadio.checked = false;
              }
            }
          }}
        >
          Дальше
        </div>
      </div>
    );
  }
}

export default Question;
