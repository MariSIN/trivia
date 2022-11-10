import React from 'react';
import HeaderUser from '../components/HeaderUser';

class Game extends React.Component {
  state = {
    questions: [],
    qActual: [],
  };

  async componentDidMount() {
    const { questions } = this.state;
    const tokenUser = localStorage.getItem('token');
    const a = await this.getQuestion(tokenUser);
    this.setState({
      questions: a,
    }, () => this.setState({
      qActual: questions,
    }));
  }

  getQuestion = async (a) => {
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${a}`);
    const response = await request.json();
    return response;
  };

  // createNewArray = () => {

  // };

  // ArrAleatorio = (arr) => {
  //   for (let i = arr.length - 1; i > 0; i -= 1) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [arr[i], arr[j]] = [arr[j], arr[i]];
  //   }
  //   return arr;
  // };

  render() {
    const { questions, qActual } = this.state;
    console.log('asdasdas', questions);
    console.log(qActual);
    return (
      <>
        <HeaderUser />
        <h1>Game</h1>
        <div>
          {/* {
            substitute.results.map((item, index) => (
              <div key={ index }>
                <span data-testid="question-category">{item.caregory}</span>
                <span data-testid="question-text">{item.question}</span>

              </div>
            ))
          } */}
        </div>
      </>
    );
  }
}

export default Game;
