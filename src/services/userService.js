import axios from "axios";
const registerNewUser = (data) => {
  let { email, userName, phone, password } = data;
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    userName,
    phone,
    password,
  });
};
export { registerNewUser };
