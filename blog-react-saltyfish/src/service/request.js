/*global Promise */
import axios from "axios";
import message from "@/components/Notifications/Message";
import { isServer } from '@/lib/utils.js'

const service = axios.create({
  baseURL: process.env.APP_HOST + '/api' ,
});

service.interceptors.request.use(
  (config) => {
    if (!isServer() && localStorage.getItem("token")) {
      config.headers["Authorization"] = JSON.parse(localStorage.getItem("token"));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.error) {
      message.error(res.error);
      return Promise.reject(res.error);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = (url, params = {}, config = {}) => {
  return service(
    {
      url,
      method: "get",
      params,
    },
    config
  );
};

const post = (url, data = {}, config = {}) => {
  return service(
    {
      url,
      method: "post",
      data: data,
    },
    config
  );
};

export default {
  get,
  post,
  service,
};
