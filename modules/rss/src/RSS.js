import React from "react";
import axios from "axios";
import FitText from "react-fittext";

export default class RSS extends React.Component {
  constructor() {
    super();

    this.state = { items: null, current: 0 };

    this.increment = this.increment.bind(this);
    this.refreshFeed = this.refreshFeed.bind(this);
  }

  increment(current, items) {
    const { refreshSpeed } = this.props;

    setTimeout(() => {
      if (current < items.length - 1) {
        this.setState({ current: current + 1 });
        this.increment(current + 1, items);
      } else {
        this.refreshFeed();
      }
    }, refreshSpeed);
  }

  async refreshFeed() {
    const { feeds } = this.props;

    const res = await axios.post("/rss/feeds", { feeds });
    this.setState({ current: 0, items: res.data });
    this.increment(0, res.data);
  }

  componentDidMount() {
    this.refreshFeed();
  }

  render() {
    const { current, items } = this.state;

    return (
      <div style={style}>
        {
          !items ? (
            <FitText compressor={2.5}>
              <div>Loading feeds...</div>
            </FitText>
          ) : (
            <React.Fragment>
              <FitText compressor={4.5}>
                <div style={titleStyle}>{items[current].source}</div>
              </FitText>
              <FitText compressor={3.5}>
                <div>{items[current].title}</div>
              </FitText>
            </React.Fragment>
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
