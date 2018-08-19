import React, { Component } from "react";
import PropTypes from "prop-types";
import Price from "./Price";
import Featured from "./Featured";
import { Link } from "react-router-dom";
class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false
    };
    this.bindEvents();
  }
  bindEvents() {
    this.showConfirmation = this.showConfirmation.bind(this);
    this.hideConfirmation = this.hideConfirmation.bind(this);
  }
  showConfirmation() {
    this.setState({ showConfirmation: true });
  }
  hideConfirmation() {
    this.setState({ showConfirmation: false });
  }

  render() {
    const { showConfirmation } = this.state;
    const { game, toggleFeatured, deleteGame } = this.props;
    return (
      <div className="ui card">
        <div className="image">
          <Price price={game.price} />
          <Featured
            featured={game.featured}
            toggleFeatured={toggleFeatured}
            gameId={game._id}
          />
          <img src={game.thumbnail} alt="Game Cover" />
        </div>
        <div className="content">
          <Link to={`/games/${game._id}`} className="header">
            {game.name}
          </Link>
          <div className="meta">
            <i className="icon users" /> {game.players}
            &nbsp;
            <i className="icon wait" /> {game.duration}
            min.
          </div>
          <div className="extra content">
            {showConfirmation ? (
              <div className="ui two buttons">
                <a
                  className="ui red basic button"
                  onClick={() => deleteGame(game)}
                >
                  <i className="ui icon check" /> YES
                </a>
                <a
                  className="ui grey basic button"
                  onClick={this.hideConfirmation}
                >
                  <i className="ui icon close" /> NO
                </a>
              </div>
            ) : (
              <div className="ui two buttons">
                <Link
                  className="ui green basic button"
                  to={`/games/edit/${game._id}`}
                >
                  <i className="ui icon edit" />
                </Link>
                <a
                  className="ui red basic button"
                  onClick={this.showConfirmation}
                >
                  <i className="ui icon trash" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

GameCard.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired,
  deleteGame: PropTypes.func.isRequired
};

export default GameCard;
