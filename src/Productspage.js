import React, { useEffect, useState } from 'react';
import './productpage.css';
import { useDispatch, useSelector } from "react-redux";
import { productsaddedtocart } from './pages/Leaves/redux/actions/productActions';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
toast.configure()
const Productspage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state);
  const [proditem, setProditem] = useState([])
  const notify = () => {
    toast.success(<h3>Item Added Successfully</h3>, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };
  var productslista = [];
  productslista = products;
  const selecteditem = (id) => {
    productslista.allproducts.products.map((value) => {
      if (id === value.id) {
        dispatch(productsaddedtocart(value));
        var new_data = value;
        var array = JSON.parse(localStorage.getItem('Data') || '[]');
        array.push(new_data);
        localStorage.setItem('Data', JSON.stringify(array));
      }
    });
    notify();
  }
  useEffect(() => {

  }, []);
  var viewitem = [];
  const openForm = (itemid) => {
    document.getElementById("myForm").style.display = "block";
    for (let i = 0; i < productslista.allproducts.products.length; i++) {
      var pp = productslista.allproducts.products;
      if (pp[i].id === itemid) {
        viewitem = Object.assign([], pp[i]);
      }
      else { }
    }
    setProditem(viewitem);
  }
  console.log("item outside=", viewitem, "proditem==", proditem)
  console.log("proditem=", proditem)
  const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
  }
  return (
    <div>
      <h2 class="headertag">Products List</h2>
      <div class="row">
        {productslista.allproducts.products.map((value, index) => {
          return (
            <div class="column">
              <div key={index} class="card">
                <div>
                  <img class="imagestyles" src={value.image}></img>
                </div>
                <div>
                  <div>
                    <button style={{ borderRadius: '5px', backgroundColor: 'red', color: 'black' }} class="open-button" onClick={() => openForm(value.id)} >View</button>
                    <button onClick={() => selecteditem(value.id)} class="addtocartbutton">Add to Cart</button>
                  </div>
                  <span>{value.title}</span><br />
                  <span><b>Price:</b> ${value.price}</span><br />
                  <span><b>Type: </b>{value.category}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div class="form-popup" id="myForm">
        <div class="popupheader" >
          <span style={{ textAlign: 'center', width: '95%' }}><h1>Product Detail Page</h1><hr/></span>
          <i onClick={() => closeForm()} class="fa fa-close" style={{ fontSize: "36px", color: "red", cursor: 'pointer' }}></i>
        </div>
        <div>
          <div class="modal-left">
            <span class="image-style-left">
              <img class="modal-left-image" src={proditem.image}></img>
            </span>
            <span style={{ width: '65%' }}>
              <div style={{margin:'10px',fontSize: '20px', fontWeight: 'bolder'}}>
                <span>{proditem.title}</span>
                <p> Price : ${proditem.price}</p>
              </div>
              <div style={{margin:'10px',}}>
              <span style={{fontSize:'16px'}} ><b>Category</b> : {proditem.category}</span>
              <p>Description : {proditem.description}</p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Productspage