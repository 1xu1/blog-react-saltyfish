import request from "./request";
export const addBlogLike = (params) => {
  return request.post("/blog/addBlogLike", params);
};
export const getBlogList = (params) => {
  return request.get("/blog/getBlogList", params);
};
export const addBlog = (params) => {
  return request.post("/blog/addBlog", params);
};
export const getBlogLabels = (params) => {
  return request.get("/blog/getBlogLabels", params);
};
export const getBlog = (params) => {
  return request.get("/blog/getBlog", params);
};
