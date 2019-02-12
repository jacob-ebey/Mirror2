import send from "@polka/send-type";
import axios from "axios";

export default function weatherCore({ apiKey, autoLocation, location }) {
  return [
    {
      method: "get",
      path: "weather",
      async route(req, res) {
        try {
          const locationResult = autoLocation ? await axios.get("http://ip-api.com/json") : { data: location };
          const { lat, lon } = locationResult.data;
          
          const result = await axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`);
          send(res, 200, result.data);
        } catch (ex) {
          send(res, 500, ex.toString());
        }
      }
    }
  ];
}
