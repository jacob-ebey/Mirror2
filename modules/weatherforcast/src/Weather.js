import React from "react";
import axios from "axios";
import moment from "moment-timezone";
import FitText from "react-fittext";
import WeatherIcon from "react-icons-weather";

export default class Weather extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.refreshWeather = this.refreshWeather.bind(this);
  }

  async refreshWeather() {
    const { mode, refreshSpeed } = this.props;

    const res = await axios.get("/weathercore/weather");

    this.setState({ forecast: res.data.daily });

    if (res.data.timezone) {
      moment.tz(res.data.timezone);
    }

    setTimeout(this.refreshWeather, refreshSpeed);
  }

  componentDidMount() {
    this.refreshWeather();
  }

  render() {
    const { days } = this.props;
    const { forecast } = this.state;

    return (
      <div style={style}>
        {
          !forecast ? (
            <FitText>
              <div style={center}>Loading weather forecast...</div>
            </FitText>
          ) : (
              <React.Fragment>
                <FitText compressor={4}>
                  <div style={summaryStyle}>{forecast.summary}</div>
                </FitText>
                <div style={forecastStyle}>
                  {forecast.data.slice(0, days).map((item, key) => {
                    const dotw = moment().add(key, "days").format("ddd");
                    return (
                      <div style={forecastRowStyle} key={key}>
                        <div style={forecastColStyle}>
                          <FitText>
                            <div>{dotw}</div>
                          </FitText>
                        </div>
                        <div style={forecastColStyle}>
                          <FitText>
                            <div><WeatherIcon name="darksky" iconId={item.icon} /></div>
                          </FitText>
                        </div>
                        <div style={forecastColStyle}>
                          <FitText>
                            <div>{item.temperatureMax} &deg;</div>
                          </FitText>
                        </div>
                        <div style={forecastColStyle}>
                          <FitText>
                            <div>{item.temperatureMin} &deg;</div>
                          </FitText>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
  height: "100%"
};

const summaryStyle = {
  ...style,
  flex: 0.1,
  color: "#ccc"
};

const forecastStyle = {
  ...style,
  flex: 0.9
};

const forecastRowStyle = {
  display: "flex",
  flex: 1,
  alignItems: "center",
  width: "100%"
};

const forecastColStyle = {
  flex: 1
};

const center = {
  textAlign: "center"
};
