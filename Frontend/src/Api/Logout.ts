import axios from "axios";
import type { NavigateFunction } from "react-router-dom";
import {type Dispatch, type SetStateAction } from "react";
import type { UserLog } from "../context/UserContext";

type HandleLogoutParams = {
  BACKEND_URL: string;
  setUser: Dispatch<SetStateAction<UserLog>>;
  navigate?: NavigateFunction;
  clearPreviousToken?: boolean;
};

export const handleLogout = async ({ BACKEND_URL, setUser, navigate, clearPreviousToken=true }: HandleLogoutParams) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/logout`,
      {clearPreviousToken},
      { withCredentials: true }
    );

    if (response.status === 200) {
      setUser({
        loggedIn: false,
        email: "",
        name: "",
        role: "USER",
        image: "",
        phone: "",
        cartId: undefined,
      });

      localStorage.removeItem("UserInfo");
      localStorage.removeItem("checkoutProducts");

      if(navigate){
        console.log("User logged out and navigated to login page");
        navigate("/login");
      } else {
        console.log("User logged out, no navigation needed");
      }

    }
  } catch (error) {
    console.error("Error while logging out", error);
  }
};
