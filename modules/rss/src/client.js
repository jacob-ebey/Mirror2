import RSS from "./RSS";

export default {
  component: RSS,
  defaults: {
    refreshSpeed: 15000,
    feeds: [
      "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
    ]
  }
}