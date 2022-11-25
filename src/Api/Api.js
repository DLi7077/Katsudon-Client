import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const PROD_API_TARGET = "https://katsudon-server-v2.herokuapp.com/";

export default async function Api(props) {
  const { method, endpoint, params, body } = props;
  const TARGET_URL = process.env.REACT_APP_DEV_TARGET ?? PROD_API_TARGET;

  const request = {
    method: method,
    url: `${TARGET_URL}${endpoint}`,
    params: params,
    data: body,
  };

  const api = axios.create({
    baseURL: TARGET_URL,
  });

  api.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "katsudon-lc-auth-token"
  )}`;

  return api(request).then((res) => res.data);
}
