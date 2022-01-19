import axios from "axios";
import { MAIN_URL } from "./Url";
let token = localStorage.getItem("_token");

export function getPosts() {
  return axios.get(`${MAIN_URL}fetchpost`);
}
export function getAddress() {
  return axios.get(`${MAIN_URL}fetchaddr`);
}
export function getProducts() {
  return axios.get(`${MAIN_URL}fetchproduct`);
}

export function getColors() {
  return axios.get(`${MAIN_URL}fetchcolor`);
}

export function getCategory() {
  return axios.get(`${MAIN_URL}fetchcategory`);
}

export function getUsers() {
  return axios.get(`${MAIN_URL}fetchuser`);
}

export function getOrders() {
  return axios.get(`${MAIN_URL}fetchorder`);
}

export function editUsers() {
  return axios.post(`${MAIN_URL}edituser`);
}
export function ChangePass() {
  return axios.post(`${MAIN_URL}changepassword`);
}
export function getSocialUser(data) {
  return axios.get(`${MAIN_URL}getSocialUser`, data);
}

export function forgetService(data) {
  return axios.post(`${MAIN_URL}forgetService`, data);
}
export function resetpassService(data) {
  return axios.post(`${MAIN_URL}resetpassService`, data);
}

export function addUser(data) {
  return axios.post(`${MAIN_URL}adduser`, data);
}
export function verify() {
  return axios.get(`${MAIN_URL}verify`);
}
export function login(data) {
  return axios.post(`${MAIN_URL}login`, data);
}
export function addorder(data) {
  return axios.post(`${MAIN_URL}addorder`, data);
}
export const addPost = (data) => {
  console.log("in my services");
  return axios.post(`${MAIN_URL}addpost`, data);
};
