import request from "./request";
export const getAllLog = (params) => {
  return request.get("/admin/getAllLog", params);
};
