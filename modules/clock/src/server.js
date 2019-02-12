import send from "@polka/send-type";
import axios from "axios";

export default [
  {
    method: "get",
    path: "location",
    async route(req, res) {
      try {
        const result = await axios.get("http://ip-api.com/json");
        send(res, 200, result.data);
      } catch (ex) {
        send(res, 500, ex.toString());
      }
    }
  }
];
