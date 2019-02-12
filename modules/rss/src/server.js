import send from "@polka/send-type";
import Parser from "rss-parser";

const parser = new Parser();

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default [
  {
    method: "post",
    path: "feeds",
    async route(req, res) {
      const feeds = await Promise.all(req.body.feeds.map(async feed => {
        const feedResult = await parser.parseURL(feed);

        return feedResult.items.map(item => ({
          source: feedResult.title,
          title: item.title
        }));
      }));

      const items = feeds.reduce((p, c) => ([...p, ...c]), []);

      try {
        send(res, 200, shuffle(items));
      } catch (ex) {
        send(res, 500, ex.toString());
      }
    }
  }
];
