import React from "react";
import axios from "axios";
import FitText from "react-fittext";

export default class Jokes extends React.Component {
  constructor() {
    super();

    this.state = { joke: null };

    this.nextJoke = this.nextJoke.bind(this);
    this.refreshJoke = this.refreshJoke.bind(this);
  }

  nextJoke() {
    const { refreshSpeed } = this.props;

    setTimeout(() => {
      this.refreshJoke();
    }, refreshSpeed);
  }

  async refreshJoke() {
    const res = await axios.get("/dadjokes/random");
    this.setState({ current: 0, joke: res.data });
    this.nextJoke();
  }

  componentDidMount() {
    this.refreshJoke();
  }

  render() {
    const { joke } = this.state;

    return (
      <div style={style}>
        {
          !joke ? (
            <FitText compressor={2.5}>
              <div>Loading Joke...</div>
            </FitText>
          ) : (
            <FitText compressor={2}>
              <div>{joke.joke}</div>
            </FitText>
          )
        }
      </div>
    );
  }
}

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  textAlign: "center"
};

const titleStyle = {
  color: "#ccc"
}
