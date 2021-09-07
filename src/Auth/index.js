import axios from "axios";
import { LoginApi } from "../apicalls";

export const signin = (userData) =>
  LoginApi(userData)   
export const authenticate = (data, next) => {
  if (typeof window !== "undefined"){
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/Signin";
    next();
  }
};
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"));
  } 
  else {
    return false;
  }
};

