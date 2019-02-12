import React from "react";
import axios from "axios";
import FitText from "react-fittext";
import ReactClock from "react-live-clock";

export default class Clock extends React.Component {
  constructor({ timezone }) {
    super();

    this.state = { timezone };
  }

  async componentDidMount() {
    const { autoTimezone } = this.props;

    if (autoTimezone) {
      const res = await axios.get("/clock/location");
      
      this.setState({ timezone: res.data.timezone });
    }
  }

  render() {
    const { dateFormat, format, showDate } = this.props;
    const { timezone } = this.state;

    return (
      <div style={style}>
        {showDate && (
          <FitText compressor={2.5}>
            <ReactClock style={dateStyle} ticking={true} format={dateFormat} timezone={timezone} />
          </FitText>
        )}
        <FitText compressor={0.75}>
          <ReactClock style={clockStyle} ticking={true} format={format} timezone={timezone} />
        </FitText>
      </div>
    );
  }
}

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
  height: "100%"
};

const clockStyle = {
  ...style,
  flex: "0.75"
}

const dateStyle = {
  ...clockStyle,
  flex: "0.25",
  color: "#ccc"
}
