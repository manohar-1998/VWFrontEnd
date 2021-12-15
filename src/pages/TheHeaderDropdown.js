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
import './headerdropdown.css';
import { List, Drawer, Button, IconButton, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CIcon from '@coreui/icons-react';
import { isAuthenticated, signout } from '../Auth';
import { allproductslist, getleavesfornotifications, updateleavesapi } from '../apicalls';
import { useSelector, useDispatch } from 'react-redux';
import { productsaddedtocart, setProducts } from './Leaves/redux/actions/productActions';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
toast.configure()
const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state);
  let localcartlist = [];
  if (localStorage.getItem("Data") === null) {
    localStorage.setItem("Data", JSON.stringify([]));
  }
  else {
    localcartlist = JSON.parse(localStorage.getItem("Data"));
  }
  const totalprice = localcartlist.reduce((sum, item) => sum + item.price, 0);
  const currentuser = isAuthenticated();
  const [length, setLength] = useState();
  const [productslist, setProductslist] = useState([]);
  const [updateleaves, setUpdateleaves] = useState({
    isConfirmed: true
  });
  const [leaves, setLeaves] = useState()
  const notify = () => {
    toast.warning(<h3>Item Removed Successfully</h3>, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
};
  const preload = () => {
    getleavesfornotifications().then((data) => {
      if (data.error) {
        setLeaves({ ...leaves, error: data.error });
      } else {
        setLeaves(data.data.leaves);
        setLength(data.data.recordsLength);
      }
    });

    allproductslist().then((data) => {
      if (data.error) {
      } else {
        setProductslist(data.data);
        dispatch(setProducts(data.data));
      }
    });

  }
  useEffect(() => {
    preload();
    dispatch(productsaddedtocart(localcartlist));
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

  const removeitem = (itemid) => {
    const itemsincart = JSON.parse(localStorage.getItem("Data"));
    if (itemsincart.length > 0) {
      for (let i = 0; i < itemsincart.length; i++) {
        if (itemsincart[i].id === itemid) {
          itemsincart.splice(i, 1);
          localStorage.setItem('Data', JSON.stringify(itemsincart));
        }
      }
    }
    notify();
  }

  const [open1, setOpen1] = useState(false);
  const list = (anchor) => (
    <div class="drawerwidth" onClick={() => setOpen1(false)}>
      {length >= 1 ? leaves.map((id, val) => {
        return (
          <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <ul class="MuiList-root MuiList-padding" >
              <div style={{ margin: '0px 20px 0px 20px', border: '1px solid gray' }}>
                <div style={{ margin: '20px' }}>
                  <p>Applied By: {id.username}</p>
                  <p>Applied On: {id.createdOn}</p>
                  <p>Leave Description: {id.LeaveDescription}</p>
                  <p>
                    <Button style={{ color: 'green', backgroundColor: '#ccc', }} onClick={() => confirmleave(id._id)}>approve</Button>{" "}
                    <Button style={{ backgroundColor: '#ccc', color: 'red', display: window.innerWidth <= 800 ? "none" : "" }}>reject</Button>
                  </p>
                </div>
              </div>
            </ul>
          </List>
        )
      }
      ) : <div style={{ textAlign: 'center', marginTop: '20px' }}>No Leaves</div>
      }
    </div>
  );

  const [cartopen1, cartsetOpen1] = useState(false);
  const cartlist = (anchor) => (
    <div class="drawerwidth" onClick={() => cartsetOpen1(false)}>
      <div
        style={{ display: localcartlist.length > 0 ? 'block' : 'none', textAlign: 'center', fontSize: '24px', marginTop: '10px', color: 'yellowgreen' }} >
        <b>Your Cart List</b>
      </div>
      <hr/>
      <div style={{ display: localcartlist.length > 0 ? 'block' : 'none', textAlign: 'center', fontSize: '20px', marginTop: '10px' }} >
        <b>Total Cart Price = ${Math.round(totalprice * 100) / 100}</b>
      </div>
      {localcartlist && localcartlist.length > 0 ?
        localcartlist.map((value, index) => {
          if (localcartlist.length > 0) {
            return (
              <div>
                <div key={index} class="cartcard">
                  <div>
                    <img class="cartimagestyles" src={value.image}></img>
                  </div>
                  <div>
                    <span>{value.title}</span><br />
                    <span><b>Price:</b> ${value.price}</span><br />
                    <span><b>Type: </b>{value.category}</span>
                  </div>
                  <button onClick={() => removeitem(value.id)} style={{ margin: '5px' }}>Remove</button>
                </div>
              </div>
            )
          }
        })
        : <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '26px' }} ><b>No Items Added</b></div>
      }
    </div>
  );

  return (
    <div>
      {isAuthenticated() && isAuthenticated().data.user.designation === "SuperAdmin" && (
        <div>
          <div>
            <div style={{ display: 'flex' }}>
              <span class="cartimage" >
                <div onClick={() => cartsetOpen1(true)} className="fa fa-shopping-cart">
                  <sup><span class="w3-badge w3-green">{localcartlist.length}</span></sup>
                </div>
                <Drawer open={cartopen1} anchor={"right"} onClose={() => cartsetOpen1(false)}>
                  {cartlist()}
                </Drawer>
              </span>
              <div>
                <IconButton class="notificationiconstyle" >
                  <Badge badgeContent={length} color="primary">
                    <NotificationsIcon onClick={() => setOpen1(true)} />
                  </Badge>
                  <Drawer open={open1} anchor={"right"} onClose={() => setOpen1(false)}>
                    {list()}
                  </Drawer>
                </IconButton>
              </div>
              <div>
                <CDropdown
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
          </div>
        </div>
      )}
    </div>
  )
}
export default TheHeaderDropdown
const ggg = {
  height: '40px',
  width: '40px',
  borderRadius: '10px'
}

