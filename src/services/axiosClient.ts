import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const axiosClient = applyCaseMiddleware(
  axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }),
  { preservedKeys: ["_destroy"] },
);

export { axiosClient };
