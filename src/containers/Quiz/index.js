/* global chrome */

import React from 'react';
import './index.css';
import Question from '../Question';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: ''
    };
  }

  componentDidMount() {
    var questions = this.quiz.children;
    for (let i = 0; i < questions.length; i++) {
      questions[i].style.display = 'none';
      console.log(questions[i].style.display);
    }
    questions[0].style.display = 'flex';
  }

  onChecked = questionIndex => {
    this.setState({ questionIndex: questionIndex });
  };

  shouldComponentUpdate(props, state) {
    var questions = this.quiz.children;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].getAttribute('rightanswer') == state.questionIndex) {
        questions[i].style.display = 'none';
        if (i + 1 == questions.length) {
          console.log('quiz is finished');
        } else {
          questions[i + 1].style.display = 'flex';
        }
      }
    }
    return true;
  }

  render() {
    return (
      <div
        className="quiz"
        ref={ref => {
          this.quiz = ref;
        }}
      >
        {this.props.dictionary.map((element, index) => {
          return (
            <Question
              rightAnswer={element.translation}
              questionWord={element.word}
              onChecked={this.onChecked}
              key={index}
            />
          );
        })}

        <div>quiz is finished</div>
      </div>
    );
  }
}

export default Quiz;
