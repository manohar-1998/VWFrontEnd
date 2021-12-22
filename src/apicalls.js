import axios from "axios";
export const LoginApi = async (userData)=> axios.post(`https://vitwit-gm.herokuapp.com/api/clogin`,userData);
export const Addleave = async (data) =>axios.post(`http://localhost:5005/api/leaves`,data);
export const createuser = async (data) =>axios.post(`http://localhost:5005/api/users`,data);
export const getleaves = async () =>axios.get(`http://localhost:5005/api/allLeaves`);
export const getleavesfornotifications = async () =>axios.get(`http://localhost:5005/api/leaves`);
export const getleavesbyuserid = async (uid) =>axios.get(`http://localhost:5005/api/leaves/${uid}`);
export const updateleavesapi = async (id,data) =>axios.put(`http://localhost:5005/api/leaves/${id}`,data);  
export const allproductslist = async()=>axios.get(`https://fakestoreapi.com/products`);