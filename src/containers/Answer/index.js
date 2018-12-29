import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Answer extends React.Component {
  render() {
    return (
      <div
        className="answer-wrapper"
        ref={ref => {
          this.answerWrapper = ref;
        }}
      >
        <input
          type="radio"
          name="answer"
          id={this.props.answerId}
          className="answer"
          answer={this.props.answer}
          onChange={() => {
            let answer = this.answerLabel.innerHTML;
            this.props.onInputChange(answer);
          }}
        />
        <label
          ref={ref => {
            this.answerLabel = ref;
          }}
          id={this.props.answerId}
          htmlFor={this.props.answerId}
          className="answerWord"
        >
          {this.props.answer}
        </label>
      </div>
    );
  }
}

export default Answer;
