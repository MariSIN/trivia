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
    viewBtnNext: 0,
    corSimCorNao: false,
  };

  async componentDidMount() {
    const tokenUser = localStorage.getItem('token');
    const a = await this.getQuestion(tokenUser);
    this.setState({
      questions: a.results,
      status: a.response_code,
    }, () => {
      this.funcao();
    });
  }

  getQuestion = async (a) => {
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${a}`);
    const response = await request.json();
    return response;
  };

  funcao = () => {
    const num = 3;
    const { status } = this.state;
    const { history } = this.props;
    if (status === num) {
      localStorage.clear();
      history.push('/');
    }
  };

  sortidos = (a) => {
    const num = 0.5;
    const x = a.sort(() => Math.random() - num);
    return x;
  };

  handleClick = () => {
    const { viewBtnNext } = this.state;
    if (viewBtnNext === 0) {
      this.setState({ viewBtnNext: 1, corSimCorNao: true });
    }
  };

  render() {
    const { questions, posi, viewBtnNext, corSimCorNao } = this.state;
    return (
      <div className="cssMesmo">
        <HeaderUser />
        <h1>Game</h1>
        {
          questions.map((item, index) => {
            if (posi === index) {
              return (

                <div key={ item.difficulty }>
                  <span data-testid="question-category">{item.category}</span>
                  <span data-testid="question-text">{item.question}</span>
                  <div data-testid="answer-options">
                    {
                      this.sortidos([item.correct_answer, ...item.incorrect_answers])
                        .map((it, ind) => {
                          const a = item.correct_answer === it ? 'green' : 'red';
                          return (
                            <button
                              key={ it.type }
                              data-testid={ item.correct_answer === it
                                ? 'correct-answer' : `wrong-answer-${ind}` }
                              type="button"
                              onClick={ this.handleClick }
                              className={ corSimCorNao ? a : '' }
                            >
                              {it}
                            </button>
                          );
                        })
                    }
                    {
                      viewBtnNext === 1 && (
                        <button
                          type="button"
                          data-testid="btn-next"
                          onClick={ () => {
                            this.setState({
                              posi: posi + 1,
                              viewBtnNext: 0,
                              corSimCorNao: false,
                            });
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

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
