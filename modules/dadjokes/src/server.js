import axios from "axios";
import send from "@polka/send-type";

export default [
  {
    method: "get",
    path: "random",
    async route(req, res) {
      const jokeResult = await axios.get("https://icanhazdadjoke.com", {
        headers: {
          accept: "application/json"
        }
      });

      try {
        send(res, 200, jokeResult.data);
      } catch (ex) {
        send(res, 500, ex.toString());
      }
    }
  }
];
