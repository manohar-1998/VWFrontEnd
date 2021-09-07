import React,{useState,useEffect} from "react";
import { getleaves } from "../apicalls";
import { isAuthenticated } from "../Auth";
import { Link } from "react-router-dom";
import profilephoto from "../Profile.jpg"
function TheContent() {
    const [leaves, setLeaves] = useState([])
    const [hideval, setHideval] = useState({});
      const setHidefunction = (data) => {
        setHideval(data.value)
      }
      console.log("value check==",hideval);
    const preload = () => {
        getleaves().then((data) => {
          if (data.error) {
          } else {
            setLeaves(data.data.leaves);
          }
        });
      };
      console.log("leaves=",leaves)
      useEffect(() => {
        preload();
      }, []);
      var approvedleaveslist=[];
      var pendingleaveslist=[];
for(let i=0;i<leaves.length;i++){
approvedleaveslist = leaves.filter((list)=>list.isConfirmed === true);
pendingleaveslist = leaves.filter((list)=>list.isConfirmed === false)
}
console.log("Approved list==",approvedleaveslist,"pending list==",pendingleaveslist)
    return (
        <div >{isAuthenticated() && isAuthenticated().data.user.designation === "worker" && (
            <div>
            <header style={{fontSize:'20px', textAlign:'center', marginTop:'5px'}}>Worker Dashboard</header>
            </div>
        )}
        {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
            <div>
            <header style={{fontSize:'20px', textAlign:'center', marginTop:'5px'}}>SuperAdmin Dashboard</header>
            </div>
        )}
            {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
                <div>
                    <div style={card}>
                        <img src={profilephoto} alt="Avatar" style={{ width: "100%", height: '100px', width: '100px' }} />
                        <div style={{ padding: '2px 16px' }}>
                            <p><b>Approved Leaves </b><span style={{marginLeft:'100px'}} class="w3-badge w3-green">{approvedleaveslist.length}</span></p>
                            <p align='center'><button value="approved" style={{borderRadius:'5px'}} onClick={(e) => setHidefunction(e.target)} >View</button></p>
                        </div>
                    </div>
                    <div style={card1}>
                        <img src={profilephoto} alt="Avatar" style={{ width: "100%", height: '100px', width: '100px' }} />
                        <div style={{ padding: '2px 16px' }}>
                        <p><b>Pending Leaves </b><span style={{marginLeft:'100px'}} class="w3-badge w3-red">{pendingleaveslist.length}</span></p>
                        <p align='center'><button value="pending" style={{borderRadius:'5px'}} onClick={(e) => setHidefunction(e.target)} >View</button></p>
                        </div>
                    </div>
                </div>
            )}

            <section>
                <form>
                    {hideval === 'approved' && (
                    <div style={{marginTop:'40px'}} class="row">
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
                    <div style={{marginTop:'40px'}}  class="row">
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
    display: "inline-block"
}
const card1 = {
    boxShadow: ' 0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '20%',
    marginLeft: '200px',
    marginTop: '20px',
    display: "inline-block"
}
const cardstyle = {
    marginLeft: '60px',
    border: '1px solid gray',
    backgroundColor:'#ccc',
    padding:'10px',
    marginTop:'20px',
    overflow:'auto'
  }