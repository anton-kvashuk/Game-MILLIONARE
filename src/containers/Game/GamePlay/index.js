import React, { PureComponent } from "react";
// import Button from "../../../components/Button";
import conf from "../../../gameConfig";
import './style.css';

const { questions, price } = conf;

class Game extends PureComponent {
  state = {
    currentQuestion: 0,
    currentAnswers: [],
    showResult: false
  };


  getOptionColor = (index, isCorrect) => {
    const { currentAnswers, showResult } = this.state;
    if (showResult) {
      if (!isCorrect && currentAnswers.includes(index)) return 'error';
      if (isCorrect) return 'correct';
    }
    if (currentAnswers.includes(index)) return 'selected';
    return '';
  };

  getColor = (index) => {
    const { currentQuestion } = this.state;
    // текушая ставка
    if (currentQuestion === index) return 'current';
    // прошлая
    if (currentQuestion > index) return 'finish';

    return 'inactive';
  };

  handleToggleAnswer = (answerIndex) => () =>
    this.setState(({ currentAnswers }) => {
      let _currentAnswers;
      if (currentAnswers.includes(answerIndex)) {
        _currentAnswers = currentAnswers.filter((i) => i !== answerIndex);
      } else {
        _currentAnswers = [...currentAnswers, answerIndex];
      }
      return { currentAnswers: _currentAnswers };
    });

  handleSubmit = () => {
    const { setScreen, setReward } = this.props;
    const { currentQuestion, currentAnswers} = this.state;
    const { answers } = questions[currentQuestion];

    // Var 1
    this.setState({ showResult: true });
    setTimeout(() => {
      const isSuccess = currentAnswers.every((i) => answers[i].isCorrect);
      if (!isSuccess || currentQuestion === questions.length - 1) {
        setScreen();
        if (!isSuccess && currentQuestion) {
          setReward(price[isSuccess ? currentQuestion : currentQuestion - 1]);
        }
        return;
      }

      this.setState({
        showResult: false,
        currentQuestion: currentQuestion + 1,
        currentAnswers: []
      });
    }, 1500);

    // var 2
    // if (showResult) {
    //   const isSuccess = currentAnswers.every((i) => answers[i].isCorrect);
    //   if (!isSuccess || currentQuestion === questions.length - 1) {
    //     setScreen();
    //     if (!isSuccess && currentQuestion) {
    //       setReward(price[isSuccess ? currentQuestion : currentQuestion - 1]);
    //     }
    //     return;
    //   }

    //   this.setState({
    //     showResult: false,
    //     currentQuestion: currentQuestion + 1,
    //     currentAnswers: []
    //   });
    // } else {
    //   this.setState({ showResult: true });
    // }
  };

  render() {
    const { currentQuestion, currentAnswers, showResult } = this.state;
    const { description, answers } = questions[currentQuestion];



    return (
      <div className='main'>
        <div className='frameLeft'>
            <div className="question">{description}</div>
            <div className='downBlock'>
                <div className="answersGroup">
                  {answers.map(({ description, isCorrect }, index) => (
                    <div className='lineOption'>
                      <div className={`mainOption ${this.getOptionColor(index, isCorrect)}`}
                        key={description} onClick={this.handleToggleAnswer(index)}>
                          <div className='textDes'>
                            {description}
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
                {!!currentAnswers.length && (
          <button className='btnSubmit' onClick={this.handleSubmit}>
            {showResult ? "Submit": "Next"}
          </button>
        )}
              </div>

          </div>
        <div className='frameRight'>
          <div >
            {[...price]
            .sort((a, b) => b - a)
            .map((val, index) => (
              <div className={`optionPrice ${this.getColor(price.length - index - 1)}`} key={val}>{val}
              </div>))}
          </div>
          </div>
      </div>
    );
  }
}

export default Game;
