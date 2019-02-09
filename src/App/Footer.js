import React from "react";
import { Link } from 'react-router-dom';
// import 'materialize-css/dist/css/materialize.min.css';
// import  M  from 'materialize-css/dist/js/materialize.min.js';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import 'materialize-css/dist/css/materialize.min.css';
// import MaterialIcon, {colorPalette} from 'material-icons-react';

// import {Navbar,NavItem,Icon} from 'react-materialize';




export const Footer = () =>{
return(
    
    <footer style={{background:"#26a69a",height:"100px",width:"100%",position:"absolute",bottom:"0",paddingTop:"0"}} className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          {/* <h5 className="white-text"></h5> */}
          {/* <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p> */}
        </div>
        <div className="col l4 offset-l2 s12">
          {/* <h5 className="white-text">Links</h5> */}
          <ul>
            <li><Link className="grey-text text-lighten-4 right" to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      © 2018 Copyright 
      <a className="grey-text text-lighten-4 right" href="/">BuyforFree</a>
      </div>
    </div>
  </footer>
)
}