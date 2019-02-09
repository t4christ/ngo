import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="col s12 m12">
        <h4 className="header" style={{textAlign:"center"}}>OOps! Seems Someone Missed The Right Direction</h4>
        <div className="card horizontal">
         
          <div className="card-stacked">
            <div className="card-content">
              <h5 style={{textAlign:"center"}}>Page Not Found You can find your way back  <Link to="/">Here</Link></h5>
            </div>
          </div>
        </div>
        
      </div>    
    
    )
}

export default NotFound
