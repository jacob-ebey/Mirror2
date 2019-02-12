import React from "react";
import axios from "axios";
import FitText from "react-fittext";
import WeatherIcon from "react-icons-weather";

function getCardinalDirection(angle) {
  if (typeof angle === 'string') angle = parseInt(angle);
  if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈';
  const arrows = { north: '↑ N', north_east: '↗ NE', east: '→ E', south_east: '↘ SE', south: '↓ S', south_west: '↙ SW', west: '← W', north_west: '↖ NW' };
  const directions = Object.keys(arrows);
  const degree = 360 / directions.length;
  angle = angle + degree / 2;
  for (let i = 0; i < directions.length; i++) {
    if (angle >= (i * degree) && angle < (i + 1) * degree) return arrows[directions[i]];
  }
  return arrows['north'];
}

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
                  <FitText compressor={2.5}>
                    <div style={topRow}>
                      <WeatherIcon name="darksky" iconId="wind" />{" "}
                      {currently.windSpeed}{" "}
                      {getCardinalDirection(currently.windBearing)}
                    </div>
                  </FitText>
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
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%"
};

const subStyle = {
  flex: 1,
  width: "100%",
  textAlign: "center"
};

const topRow = {
  textAlign: "start"
}

const center = {
  textAlign: "center"
};
