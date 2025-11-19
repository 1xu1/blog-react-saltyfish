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
export const updateBlog = (params) => {
  return request.post("/blog/updateBlog", params);
};
export const updateBlogVis = (params) => {
  return request.post("/blog/updateBlogVis", params);
};
export const addRead = (params) => {
  return request.post("/blog/addRead", params);
};
export const getBlogListAdmin = (params) => {
  return request.get("/blog/getBlogListAdmin", params);
};