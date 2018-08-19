import React, { Component } from "react";
import api from "../api";
import GameDetails from "./GameDetails";

export default class ShowGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: {}
    };
  }
  componentDidMount(){
    const { _id } = this.props.match.params;
    api.games.fetchGameById(_id).then(game => {
      this.setState({ game, loading: false });
    });
  };

  render() {
    const { loading, game } = this.state;
    return (
      <div>{loading ? <h1>Loading....</h1> : <GameDetails game={game}/>}</div>
    );
  }
}
