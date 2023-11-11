import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const axiosClient = applyCaseMiddleware(
  axios.create({
    withCredentials: true,
    baseURL: "https://env-8954386.web.elasticloud.uy",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }),
  { preservedKeys: ["_destroy"] },
);

export { axiosClient };
