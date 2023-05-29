import axios from "axios";
// import store from "@/store";
const service = axios.create({
  baseURL: process.env.APP_HOST,
});

console.log(process.env.APP_HOST)
console.log(process.env)
console.log(process)


service.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("login_stat")) {
      config.headers["Authorization"] = sessionStorage.getItem("login_stat");
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
    if (res.rspCode != 200) {
      throw res.data;
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
