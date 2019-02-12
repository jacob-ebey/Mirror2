import React from "react";
import axios from "axios";
import FitText from "react-fittext";

export default class Xkcd extends React.Component {
  constructor() {
    super();

    this.state = { commic: null };

    this.nextCommic = this.nextCommic.bind(this);
    this.refreshCommic = this.refreshCommic.bind(this);
  }

  nextCommic() {
    const { refreshSpeed } = this.props;

    this.timeout = setTimeout(() => {
      this.refreshCommic();
    }, refreshSpeed);
  }

  async refreshCommic() {
    const { commic } = this.state;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    const url  = commic && commic.num > 1 ? `/xkcd/${commic.num - 1}` : "/xkcd";
    const res = await axios.get(url);
    this.setState({ current: 0, commic: res.data });
    this.nextCommic();
  }

  componentDidMount() {
    this.refreshCommic();
  }

  render() {
    const { commic } = this.state;

    return (
      <div style={style(commic)} onClick={this.refreshCommic}>
        {
          !commic && (
            <FitText compressor={2.5}>
              <div>Loading Commic...</div>
            </FitText>
          )
        }
      </div>
    );
  }
}

const style = (commic) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
  filter: "invert(100%)",
  backgroundImage: commic && `url(${commic.img})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
});
