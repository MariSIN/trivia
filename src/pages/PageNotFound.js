import React from 'react';
import gatimTriste from '../style/imgs/gatim-triste.gif';
import '../style/notFound.css';

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1
          className="not-found"
        >
          Not found
        </h1>
        <img src={ gatimTriste } alt="gatim-triste" />
      </div>
    );
  }
}

export default PageNotFound;
