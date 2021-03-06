import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../Auth";
import "./signin.css";
const Signin = () => {
    const [values, setValues] = useState({
        first_name: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
    });
    const { first_name, password, error, didRedirect } = values;
    const userdetails = isAuthenticated();
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ first_name, password })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true,
                        });
                    });
                }
            })
            .catch((error) =>
                setValues({
                    ...values,
                    error: (
                        <div
                            style={{
                                color: "red",
                                width: window.innerWidth <= 800 ? ({ marginLeft: "175px" }) : ({ marginLeft: "255px" })
                            }}
                        >
                            <h2>"Invalid Credentials"</h2>
                        </div>
                    ),
                    loading: false,
                })
            );
    };
    if (didRedirect) {
        if (userdetails && userdetails.data.user.designation === "SuperAdmin" || "worker") {
            return <Redirect to="/Dashboard" />;
        }
        else {
            setValues({ error: "UnAuthorized User Not Admin, Access Denied" });
        }
    }
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-center">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };
    const signInForm = () => {
        return (
            <div style={styling}>
                <form class="maindivtag">
                    <div style={{ marginTop: '150px', backgroundColor: 'grey', border: "2px solid black", borderRadius: '5px' }}>
                        <header style={{ margin: '10px', textAlign: 'center',fontSize:'24px',color:'white' }}><b>Login Page</b></header>
                        <hr />
                        <div>
                            <label for="uname"><b>Username: </b></label>
                            <input
                                style={inputstyle}
                                onChange={handleChange("first_name")}
                                value={first_name}
                                className="form-control"
                                placeholder="First Name"
                                type="text"
                            />
                        </div>
                        <div>
                            <label for="psw"><b>Password: </b></label>
                            <input
                                style={inputstyle}
                                onChange={handleChange("password")}
                                value={password}
                                placeholder="Password"
                                className="form-control"
                                type="password"
                            />
                        </div>
                        <div style={{ padding: '10px',textAlign:'center' }}>
                            <button type="submit" onClick={onSubmit} style={{borderRadius:'5px',fontSize:'18px'}}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
    return (
        <>
            {errorMessage()}
            {signInForm()}
        </>
    );
};
export default Signin;
const styling = {
    borderRadius: '5px',
    backgroundColor: '#f2f2f2',
    padding: '20px 0 30px 0'
}
const inputstyle = {
    width: '100%',
    fontSize: '16px',
    lineHeight: '15px',
    padding: '12px 18px',
    borderRadius: '7px',
    border: ' 0.1px solid rgba(0,0,0,0.2)'
}