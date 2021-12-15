import React, { useState, useEffect } from "react";
import { getleaves } from "../apicalls";
import { isAuthenticated } from "../Auth";
import { useDispatch, useSelector } from "react-redux";
import profilephoto from "../Profile.jpg";
import './thecontent.css'
import { LeavesList } from "./Leaves/redux/actions/productActions";
function TheContent() {
    const products = useSelector((state) => state);
    const dispatch = useDispatch();
    console.log("products list===", products)
    const [leaves, setLeaves] = useState([])
    const [hideval, setHideval] = useState({});
    const setHidefunction = (data) => {
        setHideval(data.value);
    }
    console.log("value check==", hideval);
    const preload = () => {
        getleaves().then((data) => {
            if (data.error) {
            } else {
                setLeaves(data.data.leaves);
                dispatch(LeavesList(data.data.leaves))
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);
    var approvedleaveslist = [];
    var pendingleaveslist = [];
    for (let i = 0; i < leaves.length; i++) {
        approvedleaveslist = leaves.filter((list) => list.isConfirmed === true);
        pendingleaveslist = leaves.filter((list) => list.isConfirmed === false)
    }
    console.log("Approved list==", approvedleaveslist, "pending list==", pendingleaveslist)
    return (
        <div >{isAuthenticated() && isAuthenticated().data.user.designation === "worker" && (
            <div>
                <header style={{ fontSize: '20px', textAlign: 'center', marginTop: '5px' }}>Worker Dashboard</header>
            </div>
        )}
            {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
                <div>
                    <header style={{ fontSize: '20px', textAlign: 'center', marginTop: '5px' }}>SuperAdmin Dashboard</header>
                </div>
            )}
            {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
                <div className="maincarddiv">
                    <div className="leftcarddiv">
                        <img className="imageprop" src={profilephoto} alt="Avatar" />
                        <div className="imagedescription">
                            <p><b>Approved Leaves </b><span class="w3-badge w3-green">{approvedleaveslist.length}</span></p>
                            <p align='center'><button value="approved" onClick={(e) => setHidefunction(e.target)} >View</button></p>
                        </div>
                    </div>
                    <div className="rightcarddiv">
                        <img src={profilephoto} alt="Avatar" className="imageprop" />
                        <div className="imagedescription">
                            <p><b>Pending Leaves </b><span class="w3-badge w3-red">{pendingleaveslist.length}</span></p>
                            <p align='center'><button value="pending" onClick={(e) => setHidefunction(e.target)} >View</button></p>
                        </div>
                    </div>
                </div>
            )}

            <section>
                <form>
                    {hideval === 'approved' && (
                        <div style={{ marginTop: '40px' }} class="row">
                            {approvedleaveslist && approvedleaveslist.map((index, value) => {
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
                    )}
                    {hideval === 'pending' && (
                        <div style={{ marginTop: '40px' }} class="row">
                            {pendingleaveslist && pendingleaveslist.map((index, value) => {
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
                    )}
                </form>
            </section>

        </div>
    )
}
export default TheContent;
const card = {
    boxShadow: ' 0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '20%',
    marginLeft: '350px',
    marginTop: '20px',
}
const card1 = {
    boxShadow: ' 0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '20%',
    marginLeft: '200px',
    marginTop: '20px',
}
const cardstyle = {
    marginLeft: '60px',
    border: '1px solid gray',
    backgroundColor: '#ccc',
    padding: '10px',
    marginTop: '20px',
    overflow: 'auto'
}