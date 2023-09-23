// import axios from "axios";
import axios from "../setup/axios";
const registerNewUser = (data) => {
  let { email, userName, phone, password } = data;
  return axios.post("/api/v1/register", {
    email,
    userName,
    phone,
    password,
  });
};
const userLogin = (data) => {
  let { email, password } = data;
  return axios.post("/api/v1/login", {
    email,
    password,
  });
};
const fetchAllUsers = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};
const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", {
    ...userData,
  });
};
const updateUser = (userData) => {
  return axios.put("/api/v1/user/update", {
    ...userData,
  });
};
const deleteUser = (userId) => {
  let id = +userId;
  return axios.delete("/api/v1/user/delete", {
    data: { id: id },
  });
};
export {
  registerNewUser,
  userLogin,
  fetchAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
