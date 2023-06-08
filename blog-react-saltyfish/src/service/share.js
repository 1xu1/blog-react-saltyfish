/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import request from "./request";
export const getShareList = (params) => {
  return request.get("/share/getShareList", params);
};
export const getShareById = (params) => {
  return request.get("/share/getShareById", params);
};
export const updateShare = (params) => {
  return request.post("/admin/updateShare", params);
};
export const addShare = (params) => {
  return request.post("/admin/addShare", params);
};
export const addShareLike = (params) => {
  return request.post("/share/addShareLike", params);
};
export const deleteShare = (params) => {
  return request.post("/share/deleteShare", params);
};
