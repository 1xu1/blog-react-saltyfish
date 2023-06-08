/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import request from "./request";
export const getUserInfo = (params) => {
  return request.get("/user/getUserInfo", params);
};
export const login = (params) => {
  return request.get("/user/login", params);
};
export const getAllUsers = (params) => {
  return request.get("/admin/getAllUser", params);
};
export const blockUser = (params) => {
  return request.post("/admin/blockUser", params);
};
export const unblockUser = (params) => {
  return request.post("/admin/unblockUser", params);
};
export const updateUserInfo = (params) => {
  return request.post("/admin/updateUserInfo", params);
};
export const getUserLikeBlogs = (params) => {
  return request.get("/blog/getUserLikeBlogs", params);
};
