import React from "react";
import { Link } from 'react-router-dom';
import  {Header,Footer}  from '../App';
const buyForFree = () => {
    return (
        <div className="guide">
    
        <div className="col s12 m12">
        <h4 style={{textAlign:"center"}}>  How to use the website </h4>
        
      
<ul>
<h5>Create an account</h5>
<li>Click on the menu bar at the top left corner of the homepage.  Click on 'register' to create an account on our website and a form will open up with empty fileds requiring certain information. Fill out the fields with your accurate information and click on 'register' to create your account. An email will be sent to your provided email address. Check your email address for the mail and if not found in your inbox, check your spam box. Click on the link provided in the email to verify your email address.</li>

<h5>Log In</h5>
<li>Go back to the Buy4Free homepage, click on the menu bar on the top left corner of the homepage. Click on 'Log in", enter your login details and click 'login'.</li>


<h5>To give</h5>

<li>Click on the menu bar at the top left corner of the homepage and click on 'Give aid'.  The 'Give aid' page will open up and that page, the first field is titled 'Name'. Kindly indicate the name of the item you want to give out. It could be titled 'A blue male jeans trouser' or 'A used Peugeot 406 car'.  </li>

<li>
In the 'phone number' field, kindly indicate your phone number with which you can be contacted to enable us receive whatever items you have advertised for giving. And in the 'contact address' field kindly fill in the address where you desire to meet with is for the purpose of collecting the items advertised for giving. </li>

<li>
The next field is titled 'description' and in there, kindly give enough information of the item, necessary for it's easy identification. If the item is a blue male jeans trouser, kindly indicate the waist size of the trouser, length etc. And if it's a Peugeot 406 car', kindly indicate the year of manufacture, whether it's a manual or automatic car, etc. 
This information is very important as it would help us to give the item to someone who it the items best suits. 
The next field is 'select a category'. Click on the tray to display a list of all the available categories. For the blue male jeans, the correct category is 'Cloth' and for the used Peugeot 406 car, the correct category is 'Automobile'. </li>

<li>The next field is 'Comment'. This situation where you are to not any information you want any interested person to be aware of. Where the item is a blue male jeans and it has a defect somewhere, it's best stated in the comment section and if the item is a used Peugeot 406 car which has  a mileage of 100,000 KM,  this is the best place to state it. </li>

<li>Next, click on 'File' to add pictures of the items. Kindly send us pictures with not more than 5Mb in size and at most two pictures for each item. 
Kindly click 'send' to post your item on the website. </li>


<h5>To buy for free</h5>

<li>To find an item, click on the menu bar on the top left corner of the homepage. Click on 'search by category' and select the category of the item you want. A car will be found in 'Automobile' and a jean trouser will be found in 'cloth'. </li>

<li>When you find the item you want, click 'Get Aid'.  Look carefully at the description of the the item to be sure it is exactly what you want. If it's what you want, use the field below to provide some information about yourself which will help us determine if you should get the item. This is necessary because there might be more than one person interested in a single item so you have to show why you should get it and not another person.  When you are done, click 'send'. If you are selected to receive the item, you will be contacted within two days and be advised on how to receive the item. </li>


<li>For further inquiries kindly call Okechukwu on 07062215537 or leave us an email on ______

We thank you for your decision to be a part of this charitable endeavor and assure you that your kindness and humility will be greatly rewarded.</li>
</ul>
        
        <div className="card horizontal">
         
          <div className="card-stacked">
            <div className="card-content">
              <h5 style={{textAlign:"center"}}>To go back to homepage click <Link to="/">Here</Link></h5>
            </div>
          </div>
        </div>
        
      </div>    
      </div>
    
    )
}

export default buyForFree