import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderUser from '../components/HeaderUser';
import { assertionsAction, getScore } from '../redux/actions/action';
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
      ?.map((item) => this.randomly([item.correct_answer, ...item.incorrect_answers]));
    this.setState({
      questions: gotQuestions.results,
      randomAnswers: sortQuestions,
      status: gotQuestions.response_code,
    }, () => {
      this.checkTokenError();
    });

    this.intervalCounter();
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
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  randomly = (answers) => {
    const num = 0.5;
    const x = answers.sort(() => Math.random() - num);
    return x;
  };

  handleClick = (index, it) => {
    const { viewBtnNext } = this.state;
    if (!viewBtnNext) {
      this.setState({ viewBtnNext: true, corSimCorNao: true });
    }

    const { dispatch } = this.props;
    dispatch(getScore(this.sumScore(index, it)));
    dispatch(assertionsAction(this.getAssertions(index, it)));
  };

  sumScore = (index, it) => {
    const { questions, timer } = this.state;
    const { score } = this.props;
    const { difficulty } = questions[index];
    const correctAnswer = questions[index].correct_answer;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const add = 10;

    if (it !== correctAnswer) {
      return score;
    }
    if (difficulty === 'easy') {
      return (score + (add + (timer * easy)));
    } if (difficulty === 'medium') {
      return (score + (add + (timer * medium)));
    } if (difficulty === 'hard') {
      return (score + (add + (timer * hard)));
    }
  };

  getAssertions = (index, it) => {
    const { questions } = this.state;
    const correctAnswer = questions[index].correct_answer;

    if (it === correctAnswer) {
      return 1;
    }
    return 0;
  };

  questionsTimer = () => {
    const { timer } = this.state;

    if (timer === 0) {
      this.setState({
        disabled: true,
        viewBtnNext: true,
      });
    } else {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }
  };

  intervalCounter = () => {
    const oneSecond = 1000;
    setInterval(this.questionsTimer, oneSecond);
  };

  render() {
    const { questions, posi, viewBtnNext,
      corSimCorNao, timer, disabled, randomAnswers } = this.state;
    const n4 = 4;
    const { history } = this.props;
    return (
      <div className="cssMesmo">
        <HeaderUser />
        <h1>Game</h1>
        <p>{ timer }</p>
        {
          questions.map((item, index) => {
            if (posi === index) {
              return (
                <div key={ item }>
                  <span data-testid="question-category">{item.category}</span>
                  <span data-testid="question-text">{item.question}</span>
                  <div data-testid="answer-options">
                    {
                      randomAnswers[index]
                        .map((it, ind) => {
                          const a = item.correct_answer === it ? 'green' : 'red';
                          return (
                            <button
                              key={ it }
                              data-testid={ item.correct_answer === it
                                ? 'correct-answer' : `wrong-answer-${ind}` }
                              type="button"
                              onClick={ () => this.handleClick(index, it) }
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
                              timer: 30,
                            });
                            if (posi === n4) {
                              history.push('/feedback');
                            }
                          } }
                        >
                          Next
                        </button>
                      )
                    }

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

Game.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func,
  score: PropTypes.number,
}).isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
