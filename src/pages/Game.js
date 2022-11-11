import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderUser from '../components/HeaderUser';
import './cssMesmo.css';

class Game extends React.Component {
  state = {
    questions: [],
    status: 0,
    posi: 0,
    viewBtnNext: false,
    corSimCorNao: false,
    timer: 30,
    disabled: false,
    randomAnswers: [],
  };

  async componentDidMount() {
    const tokenUser = localStorage.getItem('token');
    const gotQuestions = await this.getQuestions(tokenUser);
    const sortQuestions = await gotQuestions.results
      ?.map((item) => this.sortidos([item.correct_answer, ...item.incorrect_answers]));
    this.setState({
      questions: gotQuestions.results,
      randomAnswers: sortQuestions,
      status: gotQuestions.response_code,
    }, () => {
      this.checkTokenError();
    });

    const oneSecond = 1000;
    setInterval(this.questionsTimer, oneSecond);
  }

  getQuestions = async (token) => {
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await request.json();
    return response;
  };

  checkTokenError = () => {
    const errorNumber = 3;
    const { status } = this.state;
    const { history } = this.props;
    if (status === errorNumber) {
      localStorage.clear();
      history.push('/');
    }
  };

  sortidos = (answers) => {
    const num = 0.5;
    const x = answers.sort(() => Math.random() - num);
    return x;
  };

  handleClick = () => {
    const { viewBtnNext } = this.state;
    if (!viewBtnNext) {
      this.setState({ viewBtnNext: true, corSimCorNao: true });
    }
  };

  questionsTimer = () => {
    const { timer } = this.state;
    if (timer === 0) {
      this.setState({
        timer: 30,
        disabled: true,
        viewBtnNext: true,
      });
    } else {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }
  };

  render() {
    const { questions, posi, viewBtnNext,
      corSimCorNao, timer, disabled, randomAnswers } = this.state;
    return (
      <div className="cssMesmo">
        <HeaderUser />
        <h1>Game</h1>
        {
          questions.map((item, index) => {
            if (posi === index) {
              return (
                <div>
                  <p>{ timer }</p>
                  <div key={ item.difficulty }>
                    <span data-testid="question-category">{item.category}</span>
                    <span data-testid="question-text">{item.question}</span>
                    <div data-testid="answer-options">
                      {
                        randomAnswers[index]
                          .map((it, ind) => {
                            const a = item.correct_answer === it ? 'green' : 'red';
                            return (
                              <button
                                key={ it.type }
                                data-testid={ item.correct_answer === it
                                  ? 'correct-answer' : `wrong-answer-${ind}` }
                                type="button"
                                onClick={ this.handleClick }
                                disabled={ disabled }
                                className={ corSimCorNao ? a : '' }
                              >
                                {it}
                              </button>
                            );
                          })
                      }
                      {
                        viewBtnNext && (
                          <button
                            type="button"
                            data-testid="btn-next"
                            onClick={ () => {
                              this.setState({
                                posi: posi + 1,
                                viewBtnNext: false,
                                corSimCorNao: false,
                                disabled: false,
                              });
                            } }
                          >
                            Next
                          </button>
                        )
                      }
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
