import React from "react";
import { Link } from 'react-router-dom';
// import 'materialize-css/dist/css/materialize.min.css';
import  M  from 'materialize-css/dist/js/materialize.min.js';

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import 'materialize-css/dist/css/materialize.min.css';
// import MaterialIcon, {colorPalette} from 'material-icons-react';

// import {Navbar,NavItem,Icon} from 'react-materialize';


export class Header extends React.Component {

  constructor(props){
super(props)
  }
  componentDidMount(){
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems)
 
  }

  componentWillMount(){
   
    // document.getElementsByClassName("sidenav-overlay").style.opacity = "1";
  
  }
     
  render(){
const {props} = this.props
    return (
      <div>
      


  <nav style={{background:"#26a69a"}} role="navigation">
    <div className="nav-wrapper container"><Link id="logo-container" to="/" className="brand-logo"><img style={{height:'60px',width:'100px'}} src='img/logo.png'/></Link>
      <ul className="right hide-on-med-and-down">

    <li> {
              props.username && <div> 
                Welcome {props.username}
              
              </div>
              
              }</li> 
      <li>{
              props.getProfile}
              
              </li>



              <li>{
              props.username && 
              <div>{props.give_aid}</div>
              }</li>
             
             <li> {
                props.username && 
                <div>{props.search}</div>
                }
</li>


              <li>{props.testimony}</li>
              <li>{props.about_us}</li>


              <li> 
              {props.logout}
               

               {props.login}
              </li>
              <li> {props.register}</li>
              <li> {props.guide}</li>
      </ul>

      <ul id="nav-mobile" className="sidenav">
      <li> {
              props.username && <div> 
                Welcome {props.username}
              
              </div>
              
              }</li> 
      <li>{
              props.getProfile}
              
              </li>



              <li>{
              props.username && 
              <div>{props.give_aid}</div>
              }</li>
             
             <li> {
                props.username && 
                <div>{props.search}</div>
                }
</li>


              <li>{props.username && <div>{props.testimony}</div>}</li>
              <li><div>{props.about_us}</div></li>
              
              <li> {props.guide}</li>

  <li> 
              {!props.username && props.register}
             </li>






              <li> 
              {props.logout}
               

               {props.login}
              </li>
            


      </ul>
      <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
    </div>
  </nav>







    {/* <Navbar brand='logo' right>
     <NavItem>{
              props.username && <div> 
                Welcome {props.username}
              
              </div>
              
              }</NavItem>
  <NavItem  style={{color:"#555"}}>{
              props.getProfile && <div>{props.getProfile}</div>
              
              }</NavItem>
  <NavItem >{
              props.username && 
              <div>{props.give_aid}</div>
              }</NavItem>

<NavItem >{
              props.username && 
              <div>{props.search}</div>
              }</NavItem>
<NavItem >{
              props.username && 
              <div>{props.testimony}</div>
              }</NavItem>
  <NavItem ><div>{props.about_us}</div></NavItem>
  <NavItem >{props.logout}
               

               {props.login}</NavItem>
            </Navbar> */}









         {/* <nav style={{backgroundColor:"#26a69a"}}>
    <div classNameNameNameNameNameName="nav-wrapper">
    <a href="#" data-target="mobile-demo" classNameNameNameName="sidenav-trigger"><i classNameNameNameName="material-icons">menu</i></a>
      <a href="/" classNameNameNameNameName="brand-logo">BuyforFree</a>
      <ul classNameNameNameNameName="right hide-on-med-and-down">
        <li><a href="/">{
              props.username && <div> 
                Welcome {props.username}
              
              </div>
              
              }</a></li>
        <li><a href="">{
              props.getProfile && <div>{props.getProfile}</div>
              
              }</a></li>
        <li><a href="">{
              props.username && 
              <div>{props.give_aid}</div>
              }</a></li>


              <li><a href=""> 
              <div>{props.about_us}</div>
              </a></li>



          <li><a href="">{
              props.username && 
              <div>{props.search}</div>
              }</a></li>

          <li><a href="">{
              props.username && 
              <div>{props.testimony}</div>
              }</a></li>


        <li><a href="">{props.logout}
               

               {props.login}</a></li>
      </ul>
    </div>
  </nav>
  <ul classNameNameNameNameName="sidenav" id="mobile-demo">
        <li><a href="/">{
              props.username && <div> 
                Welcome {props.username}
              
              </div>
              
              }</a></li>
        <li><a href="/profile">{
              props.getProfile && <div>{props.getProfile}</div>
              
              }</a></li>
        <li><a href="">{
              props.username && 
              <div>{props.give_aid}</div>
              }</a></li>


              <li><a href=""> 
              <div>{props.about_us}</div>
              </a></li>



          <li><a href="">{
              props.username && 
              <div>{props.search}</div>
              }</a></li>

          <li><a href="">{
              props.username && 
              <div>{props.testimony}</div>
              }</a></li>


        <li><a href="">{props.logout}
               

               {props.login}</a></li>
      </ul> */}
      
        </div>


    
    )

  }
}



