import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { getURL } from '../redux/actions/action';
import '../style/settings.css';

const anyDifficulty = 'Any Difficulty';
class Settings extends React.Component {
  state = {
    difficulties: [],
    types: [],
    category: 'Any Category',
    difficulty: anyDifficulty,
    type: 'Any Type',
    save: '',
  };

  async componentDidMount() {
    this.setDifficulty();
    this.setType();
  }

  handleOptionValue = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  setDifficulty = () => {
    const difficultyList = [anyDifficulty, 'Easy', 'Medium', 'Hard'];
    this.setState({
      difficulties: difficultyList,
    });
  };

  setType = () => {
    const TypesList = ['Any Type', 'Multiple Choice', 'True/False'];
    this.setState({
      types: TypesList,
    });
  };

  saveChanges = () => {
    const { dispatch } = this.props;
    const { category, difficulty, type } = this.state;
    const urlArray = [];

    if (category !== 'Any Category') {
      urlArray.push(`&category=${category}`);
    } if (difficulty !== anyDifficulty) {
      urlArray.push(((`&difficulty=${difficulty}`).toLowerCase()));
    } if (type !== 'True/False' && type !== 'Any Type') {
      urlArray.push('&type=multiple');
    } if (type !== 'Multiple Choice' && type !== 'Any Type') {
      urlArray.push('&type=boolean');
    }

    this.saveTimeOut();

    dispatch(getURL(urlArray.join('')));
  };

  saveTimeOut = () => {
    const saveTime = 3000;
    const disappearMessage = 200;

    setTimeout(() => {
      this.setState({ save: 'Saved settings' });
      setTimeout(() => {
        this.setState({ save: '' });
      }, saveTime);
    }, disappearMessage);
  };

  render() {
    const { difficulties, types, category, difficulty, type, save } = this.state;
    return (
      <>
        <NavLink to="/" exact>
          <TiArrowBack className="back" />
        </NavLink>
        <div className="ranking">
          <div>
            <h1
              data-testid="settings-title"
              className="ranking-title"
            >
              Settings
            </h1>
          </div>
          <div className="settings-options">
            <select
              name="category"
              value={ category }
              onChange={ this.handleOptionValue }
              className="options"
            >
              Category
              <option value="Any Category">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musical & Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime & Manga</option>
              <option value="32">Entertainment: Cartoon & Animations</option>
            </select>
            <select
              name="difficulty"
              value={ difficulty }
              onChange={ this.handleOptionValue }
              className="options"
            >
              Difficulty
              { difficulties.map((item) => <option key={ item }>{ item }</option>) }
            </select>
            <select
              name="type"
              value={ type }
              onChange={ this.handleOptionValue }
              className="options"
            >
              Type
              { types.map((item) => <option key={ item }>{ item }</option>) }
            </select>
          </div>
          <button
            type="button"
            onClick={ this.saveChanges }
            className="button-go-home"
          >
            Save Changes
          </button>
          <p>{ save }</p>
        </div>
      </>
    );
  }
}

Settings.propTypes = ({
  dispatch: PropTypes.func.isRequired,
});

export default connect()(Settings);
