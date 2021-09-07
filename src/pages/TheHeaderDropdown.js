import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import logo from "../Profile.jpg";
import { List, Drawer, Button, IconButton, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import CIcon from '@coreui/icons-react'
import { isAuthenticated, signout } from '../Auth';
import { getleavesfornotifications, updateleavesapi } from '../apicalls';

const TheHeaderDropdown = () => {
  const currentuser = isAuthenticated();
    const [length, setLength] = useState();
  const [updateleaves, setUpdateleaves] = useState({
    isConfirmed: true
  });
  const [leaves, setLeaves] = useState()
  console.log("Username Check=", currentuser.data.user.first_name);
    const preload = () => {
    getleavesfornotifications().then((data) => {
      if (data.error) {
        setLeaves({ ...leaves, error: data.error });
      } else {
        setLeaves(data.data.leaves);
        setLength(data.data.recordsLength)
      }
    });
  }
  useEffect(() => {
    preload()
  }, []);

    const confirmleave = (id) => {
    updateleavesapi(id, updateleaves).then((data) => {
      if (data.error) {
        setUpdateleaves({ ...updateleaves, error: data.error });
      } else {
        setUpdateleaves({
          ...updateleaves,
        });
      }
      preload();
    })
  }

  const [open1, setOpen1] = useState(false);
    const list = (anchor) => (
    <div style={{ width: 350 }} onClick={() => setOpen1(false)}>
      {length >= 1 ? leaves.map((id, val) => {
        return (
          <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <ul class="MuiList-root MuiList-padding" >
              <div style={{ margin: '0px 20px 0px 20px', border: '1px solid gray', }}>
                <div style={{ margin: '20px' }}>
                  <p>Applied By: {id.username}</p>
                  <p>Applied On: {id.createdOn}</p>
                  <p>Leave Description: {id.LeaveDescription}</p>
                  <p>
                    <Button style={{ color: 'green', backgroundColor:'#ccc', }} onClick={() => confirmleave(id._id)}>approve</Button>{ " "}
                    <Button style={{backgroundColor:'#ccc', color: 'red', display: window.innerWidth <= 800 ? "none" : "" }}>reject</Button>
                  </p>
                </div>
              </div>
            </ul>
          </List>
        )
      }
      ) : <div style={{ textAlign: 'center', marginTop: '20px' }}>No Notifications</div>
      }
    </div> 
  );

  return (
        <div>
      {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
        <div style={{ width: '40px', float: 'left' }}>
          <IconButton style={{ backgroundColor: "white", marginRight: '20px', width: 32, height: 32, marginTop: '10px',marginLeft:'1300px' }}>
            <Badge badgeContent={length} color="primary">
              <NotificationsIcon onClick={() => setOpen1(true)} />
            </Badge>
            <Drawer open={open1} anchor={"right"} onClose={() => setOpen1(false)}>
              {list()}
            </Drawer>
          </IconButton>
        </div>
      )}
    <div style={{marginLeft:'1350px'}}>
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              style={ggg}
              src={logo}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end" >
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Profile</strong>
          </CDropdownItem>
          {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
            <CDropdownItem>
              <Link style={{ color: "black" }} to="/createuser">
                <CIcon name="cil-user-plus" className="mfe-2" />
                Add Employee
              </Link>
            </CDropdownItem>
          )}
          {isAuthenticated() && isAuthenticated().data.user.designation === 'worker' && (
          <CDropdownItem >
            <Link style={{ color: "black" }} to="/Applyleave">
              <CIcon name="cil-envelope-open" className="mfe-2" />
              Leaves
            </Link>
          </CDropdownItem>
          )}
          <CDropdownItem onClick={() => {
            signout(() => {
            })
          }}>
            <CIcon name="cil-chart-pie" className="mfe-2" />
            LogOut
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
    </div>
  )
}
export default TheHeaderDropdown
const ggg = {
  height:'40px',
  width:'40px',
  borderRadius:'10px'
}

