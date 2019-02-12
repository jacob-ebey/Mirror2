import axios from "axios";
import send from "@polka/send-type";

export default [
  {
    method: "get",
    path: ":id?",
    async route(req, res) {
      const url = req.params.id ? `https://xkcd.com/${req.params.id}/info.0.json` : "https://xkcd.com/info.0.json"
      const commicResult = await axios.get(url);

      try {
        send(res, 200, commicResult.data);
      } catch (ex) {
        send(res, 500, ex.toString());
      }
    }
  }
];
