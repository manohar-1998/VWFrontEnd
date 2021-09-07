import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createuser } from "../apicalls";

toast.configure();
function Create_user() {
  const notify = () => {
    toast.success(<h3>New User Created Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const [errors, setErrors] = useState({
    usernameErr: "Firstname Required",
    lastnameErr: "Last Name Required",
    desingationErr: "Designation is Required",
    passwordErr: "Password is Required",
    confirmpasswordErr: "Confirm Password is Required",
    mismatchErr: "Passwords Mismatch",
  });
  const {
    usernameErr,
    lastnameErr,
    desingationErr,
    passwordErr,
    confirmpasswordErr,
    mismatchErr,
  } = errors;
  const history = useHistory();

  const [values, setValues] = useState({
    password: "",
    confirmpassword: "",
    designation: "",
    first_name: "",
    last_name: "",
    Address: "",
  });
  const { first_name, last_name, Address, password, confirmpassword, designation } = values;
  const [data, setData] = useState({
    loading: false,
    error: "",
    getaRedirect: false,
  });
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const Adduserbtn = (event) => {
    event.preventDefault();
    if (isValid()) {
      setValues({ ...values, error: "", loading: true });
      setErrors({ ...errors, nameErr: data.error });
      createuser(values).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            password: data.password,
            password2: data.password2,
            designation: data.designation,
            first_name: data.first_name,
            last_name: data.last_name,
            Address: data.Address,
          });
          setData({ ...data, loading: false, getaRedirect: true });
          notify();
        }
        history.push("/dashboard");
      }
      );
    }
  };
  const isValid = () => {
    if (
      !first_name.length > 0 &&
      !last_name > 0 
    ) {
      toast.error("All Fields Are Mandatory", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    } else if (!first_name.length > 0) {
      toast.error(usernameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!last_name.length > 0) {
      toast.error(lastnameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!designation.length > 0) {
      toast.error(desingationErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!password.length > 0) {
      toast.error(passwordErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!confirmpassword.length > 0) {
      toast.error(confirmpasswordErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (password !== confirmpassword) {
      toast.error(mismatchErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    return true;
  };
  function Cancel() {
    history.push("/dashboard");
  }
  return (
    <section style={pagestyle1}>
      <form >
        <header style={headerstyle}>
          <b>Create New User</b>
        </header>
        <hr />
        <label>First Name</label>
        <input
          value={first_name}
          type="text"
          placeholder="First Name"
          onChange={handleChange("first_name")}
        />
        <label>Last Name</label>
        <input
          value={last_name}
          type="text"
          placeholder="Last Name"
          onChange={handleChange("last_name")}
        />
        <label>Address</label>
        <input
          type="text"
          value={Address}
          onChange={handleChange("Address")}
        />
        <label>Designation</label>
        <select
          name="designation"
          id="designation"
          onChange={handleChange("designation")}
        >
          <option value="">Select</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="worker">Worker</option>
        </select>
        <div style={{marginTop:'15px'}}>
          <label> Password : </label>&nbsp;&nbsp;&nbsp;
          <input
            label="Password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChange("password")}
          />
          </div>
          <div style={{marginTop:'15px'}}>
          <label>Confirm Password : </label>&nbsp;&nbsp;&nbsp;
          <input
            value={confirmpassword}
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange("confirmpassword")}
          />
        </div>
        <hr />
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <button color="green" onClick={Adduserbtn}>
            Create
          </button>
          <button color="black" onClick={Cancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
export default Create_user;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  paddingTop: "10px",
};
const pagestyle1 = {
  marginTop: '20px',
  width: window.innerWidth <= 800 ? '' : '500px',
  marginLeft: window.innerWidth <= 800 ? '' : "500px",
}