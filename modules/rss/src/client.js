import RSS from "./RSS";

export default {
  component: RSS,
  defaults: {
    refreshSpeed: 10000,
    feeds: [
      "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
    ]
  }
}