import React from "react";
import './the-header.css';
import TheHeaderDropdown from "./TheHeaderDropdown";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const TheHeader = () => {
    return (
        <div className="header">
            <div className="leftdiv" >
                <div className="nav-item" >
                    <div className="list" >
                        <span style={{ display: 'flex',cursor:'pointer' }} class="w3-xxxlarge" >
                           <Link to="/TheContent" > <i className="fa fa-home" > </i></Link>
                            <Link to="/Productpage"><span className="productlink" > Products </span></Link>
                        </span>
                    </div>
                </div>
            </div>
            <div className="rightdiv" >
                <TheHeaderDropdown />
            </div>
        </div>
    );
};

export default TheHeader;