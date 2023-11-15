import request from "./request";
export const getAllComment = (params) => {
  return request.get("/admin/getAllComment", params);
};
export const getBlogComment = (params) => {
  return request.get("/getBlogComments", params);
};
export const deleteComment = (params) => {
  return request.post("/admin/deleteComment", params);
};
export const addComment = (params) => {
  return request.post("/addComment", params);
};
