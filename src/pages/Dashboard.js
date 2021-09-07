import React from "react";
import "./dashboard.css"
const Dashboard = () => {
    return (
<div class="container">
  <div id="sidebar">
    <a href="#"> Link1 </a>
  </div>
  <div class="inner-container">
    <div id="header">
      <h2 class="title">Title</h2>
      <h3>Header content</h3>
    </div>
    <div id="content">
      <center>
        <p>Hello</p>
      </center>
    </div>
  </div>
</div>
    );
};
export default Dashboard;