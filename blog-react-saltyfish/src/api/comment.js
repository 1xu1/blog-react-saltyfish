/* eslint-disable @typescript-eslint/no-unused-vars */
import request from "./request";
export const getAllComment = (params) => {
  return request.get("/admin/getAllComment", params);
};
export const getBlogComment = (params) => {
  return request.get("/getBlogComment", params);
};
export const deleteComment = (params) => {
  return request.post("/admin/deleteComment", params);
};
