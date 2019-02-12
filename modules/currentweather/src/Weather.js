import React from "react";
import axios from "axios";
import FitText from "react-fittext";
import WeatherIcon from "react-icons-weather";

export default class Weather extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.refreshWeather = this.refreshWeather.bind(this);
  }

  async refreshWeather() {
    const { refreshSpeed } = this.props;

    const res = await axios.get("/weathercore/weather");

    this.setState({ currently: res.data.currently });

    setTimeout(this.refreshWeather, refreshSpeed);
  }

  componentDidMount() {
    this.refreshWeather();
  }

  render() {
    const { currently } = this.state;

    return (
      <div style={style}>
        <div style={subStyle}>
          {
            !currently ? (
              <FitText>
                <div style={center}>Loading current weather...</div>
              </FitText>
            ) : (
                <React.Fragment>
                  <FitText compressor={0.5}>
                    <div>
                      <WeatherIcon name="darksky" iconId={currently.icon} /> {currently.temperature} &deg;
                    </div>
                  </FitText>

                  <FitText compressor={2.5}>
                    <div>Feels like {currently.apparentTemperature} &deg;</div>
                  </FitText>
                </React.Fragment>
              )
          }
        </div>
      </div>
    );
  }
}

const style = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%"
};

const subStyle = {
  flex: 1,
  textAlign: "center"
};

const center = {
  textAlign: "center"
};
