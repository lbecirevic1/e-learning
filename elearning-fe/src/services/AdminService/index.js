import axios from "axios";
import { Request } from "../Request";

const ADMIN_API = "http://localhost:8080/elearning";
const ADMIN_USER_API = "http://localhost:8080/user";

const ADD_USER_PATH = "/register";
const ALL_USERS_PATH = "/all";
const EDIT_USER_PATH = "/edit";
const DELETE_USER_PATH = "/delete";

const validateUserData = (user) => {
  if (!user.name || user.name === "") {
    return { message: "Empty name" };
  }
  if (!user.surname || user.surname === "") {
    console.log("2");
    return { message: "Empty lastname" };
  }
  if (!user.email || user.email === "") {
    return { message: "Empty email" };
  }

  if (!user.roleName || user.roleName === "") {
    return { message: "Empty type" };
  }

  return {
    message: "Success",
  };
};
class AdminService {
  getUsers = async () => {
    return Request(`${ADMIN_USER_API}${ALL_USERS_PATH}`, "GET", [], {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    }).then((res) => res.data);
  };

  deleteUser = async (user) => {
    return Request(
      `${ADMIN_USER_API}${DELETE_USER_PATH}/${user.id}`,
      "DELETE",
      [],
      {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      }
    ).then((res) => res);
  };

  editUser = async (user) => {
    return Request(
      `${ADMIN_USER_API}${EDIT_USER_PATH}/${user.id}`,
      "PUT",
      user,
      {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      }
    ).then((res) => res);
  };

  addUser = async (actionUser) => {
    const valid = validateUserData(actionUser);
    // const valid = validateUserData({
    //   name,
    //   surname,
    //   email,
    //   phone,
    //   password,
    //   roleName,
    // });
    if (valid.message === "Success") {
      //   const validatedData = {};

      //   validatedData.name = name;
      //   validatedData.surname = surname;
      //   validatedData.email = email;
      //   validatedData.phone = phone;
      //   validatedData.password = password;
      //   validatedData.roleName = roleName;
      return Request(`${ADMIN_USER_API}${ADD_USER_PATH}`, "POST", actionUser, {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      }).then((res) => res);
    } else {
      const response = {
        data: {
          error: 'Fill all field'
        }
      }
      return response
    }
  };

  login = async ({ email, password }) => {
    try {
      const response = await axios.post(`${ADMIN_API}/login`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.log("error", error);
    }
  };
}

export default new AdminService();
