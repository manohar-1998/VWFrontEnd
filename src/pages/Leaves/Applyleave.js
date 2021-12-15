import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { isAuthenticated } from "../../Auth";
import { toast } from "react-toastify";
import './Leavespage.css'
import "react-toastify/dist/ReactToastify.css";
import { Addleave, getleavesbyuserid } from "../../apicalls";
toast.configure();
function Applyleave() {
  const notify = () => {
    toast.success(<h3>Leave Created Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const [errors, setErrors] = useState({
    startdateErr: "Select Start Date",
    enddateErr: "End Date is Required",
    emrgfirstnameErr: "FirstName is Required",
    emrgphonenumberErr: "Phone Number is Required",
    descriptionErr: "Description is Required",
  });
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const [leaves, setLeaves] = useState([])
  const [values, setValues] = useState({
    userid: uid,
    StartDate: "",
    EndDate: "",
    FirstName: "",
    LastName: "",
    LeaveDescription: "",
    PhoneNumber: "",
  });
  const [data, setData] = useState({
    loading: false,
    error: "",
    getaRedirect: false,
  });
  const {
    startdateErr,
    enddateErr,
    emrgfirstnameErr,
    emrgphonenumberErr,
    descriptionErr,
  } = errors;
  const {
    StartDate,
    EndDate,
    FirstName,
    LastName,
    LeaveDescription,
    PhoneNumber,
  } = values;
  const history = useHistory();
  const isValid = () => {
    if (
      !StartDate.length > 0 &&
      !EndDate.length > 0 &&
      !FirstName.length > 0 &&
      !PhoneNumber.length > 0 &&
      !LeaveDescription.length > 0
    ) {
      toast.error("Please Enter Mandatory Fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    } else if (!StartDate.length > 0) {
      toast.error(startdateErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (!EndDate.length > 0) {
      toast.error(enddateErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!FirstName.length > 0) {
      toast.error(emrgfirstnameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (!PhoneNumber.length > 0) {
      toast.error(emrgphonenumberErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!LeaveDescription.length > 0) {
      toast.error(descriptionErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    return true;
  };
  const Addbtn = (event) => {
    event.preventDefault();
    if (isValid()) {
      Addleave(values).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            userid: uid,
            StartDate: "",
            EndDate: "",
            FirstName: "",
            LastName: "",
            LeaveDescription: "",
            PhoneNumber: "",
          });
          setData({ ...data, loading: false, getaRedirect: true });
          notify();
          history.push("/Applyleave");
          preload();
        }
      });
    }
  };
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const preload = () => {
    getleavesbyuserid(uid).then((data) => {
      if (data.error) {
      } else {
        setLeaves(data.data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  function Taskcancel() {
    history.push("/Dashboard");
  }
  return (
    <div class="container">
      <form>
        <header style={headerstyle}>
          <b>Leave Form</b>
        </header>
        <div class="row">
          <div class="col-50">
            <label for="StartDate">StartDate : </label>
            <input
              label="Start Date"
              type="date"
              value={StartDate}
              onChange={handleChange("StartDate")}
            />
          </div>
          <div class="col-50">
            <label for="EndDate">EndDate : </label>
            <input
              label="End Date"
              type="date"
              value={EndDate}
              onChange={handleChange("EndDate")}
            />
          </div>
        </div>
        <div style={{ margin: '25px' }}><b>Contact Details when Away</b></div>
        <label for="FirstName">FirstName</label>
        <input
          type="text"
          label="First Name"
          value={FirstName}
          placeholder="First Name"
          onChange={handleChange("FirstName")}
        />
        <label for="LastName">LastName</label>
        <input
          type="text"
          label="Last Name"
          value={LastName}
          placeholder="Last Name"
          onChange={handleChange("LastName")}
        />
        <label for="PhoneNumber">PhoneNumber</label>
        <input
          type="text"
          label="Phone Number"
          value={PhoneNumber}
          placeholder="Phone Number"
          onChange={handleChange("PhoneNumber")}
        />
        <label for="Description">Description</label>
        <textarea
        style={{height:"150px"}}
          placeholder="Description"
          value={LeaveDescription}
          onChange={handleChange("LeaveDescription")}
        />
        <div style={{ textAlign: "center" }}>
          <input type="submit" value="Submit" onClick={Addbtn}>
          </input>&nbsp;
          <input type="submit" value="Cancel" onClick={Taskcancel}>
          </input>
        </div>
      </form>
      <hr />
      <section>
        <form>
          <header style={headerstyle}>
            <b>My Leave's...</b>
          </header>
          <div class="row">
            {leaves && leaves.map((index, value) => {
              return (
                <div class="column" style={cardstyle}>
                  <div style={{ marginLeft: '20px', padding: '5px' }}>
                    <p>Status : <span style={{ color: 'green' }} >{index.isConfirmed === true ? "Confirmed" : "Pending"}</span></p>
                    <p>EndDate : {index.EndDate}</p>
                    <p>StartDate : {index.StartDate}</p>
                    <p>Created On : {index.createdOn}</p>
                    <p>Description : {index.LeaveDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </section>
    </div>
  );
}
export default Applyleave;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  paddingBottom: "20px",
};
const cardstyle = {
  marginLeft: '60px',
  border: '1px solid gray',
  backgroundColor: '#ccc',
  padding: '10px',
  marginTop: '20px',
  overflow: 'auto'
}
const look = {
  // overflow: 'auto',
}