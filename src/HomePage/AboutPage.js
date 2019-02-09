import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { aboutActions } from '../_actions';
import  {Header,Footer}  from '../App';
import {Row,Button} from 'react-materialize'
import {Skeleton, Bone } from 'react-loading-skeleton-placeholders';




class AboutPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(aboutActions.about());
    }



    handleLogout() {
        return (<Link to="/login">Logout</Link>)
    }


    handleGiftId(id) {
        return (<Link to={"/aid_detail/"+id}><Button style={{margin:"auto"}} waves='light'>Get Aid</Button></Link>)
    }



    handleProfile() {
        return (<Link to="/profile">Profile</Link>)
    }

    handleGive() {
        return (<Link to="/give_aid">Give Aid</Link>)
    }

    handleLogin() {
        return (<Link to="/login">Login</Link>)
    }

    handleLogout() {
        return (<Link to="/login">Logout</Link>)
    }


    handleAbout() {
        return (<Link to="/about">About Us</Link>)
    }  

    handleTestify() {
        return (<Link to="/testify">Testify</Link>)
    }  

    render() {
        const { about,about_request } = this.props;   
        const user = JSON.parse(localStorage.getItem('user')); 
        // console.log("There is my category",category)
        let heads;
        const login=this.handleLogin();
        const about_us=this.handleAbout();
        // const search=this.handleSearch(this.props.category);
        const logout=this.handleLogout();
        const give_aid = this.handleGive();
        const testimony= this.handleTestify();
        const getProfile = this.handleProfile();

        
        if (user){
        
        const {username} = user
        heads = {username,logout,give_aid,testimony,getProfile,about_us};
        }
        else if(!user){
            
            heads = {login};
        }

        return (
            
            <div className="col-md-6 col-md-offset-3">

        <Header props={heads}/>
                <h1 style={{textAlign:"center"}}>About Us</h1>
                {about.about &&             
            <Row>

            {about_request &&           
                <Row>
    
                
               
    <div className="col s12 col m3" style={styles.childStyle}>
    <div style={styles.parentStyle} className="col s12 col m12 card">
                     <div class="card-image waves-effect waves-block waves-light">
                     <Bone height={200}  />
                     </div>
                     <div className="card-content" style={{height:"200px"}}>
                     <Skeleton  amount={1} />
                       <Skeleton amount={1} />
                       <Bone height={40} width={40}  />
                     </div>
                     
                   </div>
    
    </div> 
    
    <div className="col s12 col m3" style={styles.childStyle}>
    <div style={styles.parentStyle} className="col s12 col m12 card">
                     <div class="card-image waves-effect waves-block waves-light">
                     <Bone height={200}  />
                     </div>
                     <div className="card-content" style={{height:"200px"}}>
                     <Skeleton  amount={1} />
                       <Skeleton amount={1} />
                       <Bone height={40} width={40}  />
                     </div>
                     
                   </div>
    
    </div> 
    
    
    
    <div className="col s12 col m3" style={styles.childStyle}>
    <div style={styles.parentStyle} className="col s12 col m12 card">
                     <div class="card-image waves-effect waves-block waves-light">
                     <Bone height={200}  />
                     </div>
                     <div className="card-content" style={{height:"200px"}}>
                     <Skeleton  amount={1} />
                       <Skeleton amount={1} />
                       <Bone height={40} width={40}  />
                     </div>
                     
                   </div>
    
    </div> 
    
    
    
    <div className="col s12 col m3" style={styles.childStyle}>
    <div style={styles.parentStyle} className="col s12 col m12 card">
                     <div class="card-image waves-effect waves-block waves-light">
                     <Bone height={200}  />
                     </div>
                     <div className="card-content" style={{height:"200px"}}>
                     <Skeleton  amount={1} />
                       <Skeleton amount={1} />
                       <Bone height={40} width={40}  />
                     </div>
                     
                   </div>
    
    </div> 
    
    )}
                             
    
    </Row>
         }
    
    




            {about.about.map((giver, index) =>
             
<div className="col s12 col m3" style={styles.childStyle}>
<div key={giver.id} style={styles.parentStyle} className="col s12 col m12 card">
                 <div class="card-image waves-effect waves-block waves-light">
                   <img class="activator" style={{height:"220px"}}src={giver.image}/>
                 </div>
                 <div className="card-content" style={{height:"200px"}}>
                   <span className="card-title activator grey-text text-darken-4">Name: {giver.name}<i className="material-icons right">more_vert</i></span>
                   <p><a href="#">Click Icon to View About {giver.name} </a></p>
                   
                 </div>
                 <div className="card-reveal">
                   <span class="card-title grey-text text-darken-4">{giver.name}<i className="material-icons right">close</i></span>
                   <p>{giver.biography}</p>
                   
                 </div>
                 
               </div>

</div> 
)}
                         

</Row>
     }
            <Footer/>    
            </div>
            
        );
    }
}



const styles={
    parentStyle:{
       padding:0,
       height:"375px"
    },

    childStyle:{
        padding:10
    }
}



function mapStateToProps(state) {
    const { about } = state;
    const { about_request } = about;
    return {
        about,about_request
    };
}

const connectedAboutPage = connect(mapStateToProps)(AboutPage);
export { connectedAboutPage as AboutPage };