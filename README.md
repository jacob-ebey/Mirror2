# Mirror 2

A for-fun project similar to [Magic Mirror](https://magicmirror.builders/).

![Screenshot](images/screenshot.png?raw=true "Screenshot")

## Getting Started

Clone this repo then run:

```shell
> npm install
> npm run build
> npm start
```

The application will be avaliable on localhost:3000.

## Configuration

The application configuration exists under config/config.json.

There exists only two properties at this point:

```json
{
  "grid": {
    "cols": 12,
    "rows": 6
  },
  "modules": []
}
```

A module entry will look like the following:

```json
{
  "name": "clock",
  "layout": {
    "x": 0,
    "y": 0,
    "w": 12,
    "h": 2
  }
}
```

The layout property defines the location of the module on the UI.

## Modules

### Clock

A simple clock module with auto-timezone detection.

Configuration options:

```json
{
  "format": "h:mm A",
  "timezone": "US/Pacific",
  "autoTimezone": true,
  "showDate": true,
  "dateFormat": "dddd, MMMM Do YYYY"
}
```

### RSS

A simple RSS feed configurable with multiple sources.

Configuration options:

```json
{
  "refreshSpeed": 15000,
  "feeds": [
    "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
  ]
}
```

### DadJokes

A simple module that displays random dad jokes.

Configuration options:

```json
{
  "refreshSpeed": 60000
}
```

### Weather

#### WeatherCore

The backend module required to use the CurrentWeather or WeatherForecast modules.

To get an API key, visit: https://darksky.net/dev/register

Configuration options:

```json
{
  "apiKey": "",
  "autoLocation": false,
  "location": {
    "lat": 47.608013,
    "lon": -122.335167
  }
}
```

A valid configuration must contain an API key and either a location OR autoLocation must be set to true.

#### CurrentWeather

A simple module that displays the current weather.

Configuration options:

```json
{
  "refreshSpeed": 300000
}
```

#### WeatherForecast

A simple module to display a multi-day forecast.

```json
{
  "refreshSpeed": 1800000,
  "days": 5
}
```


### XKCD

A simple module that displays XKCD commics.

Configuration options:

```json
{
  "refreshSpeed": 60000
}
```