import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { giverActions} from '../_actions';
import  {Header}  from '../App';
import {Row,Button} from 'react-materialize'





class ApplicantPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(giverActions.getGifts());
        // this.props.dispatch(giverActions.getCat());
        
        // this.props.dispatch(userActions.getAll());
    }

    // handleDeleteUser(id) {
    //     return (e) => this.props.dispatch(userActions.delete(id));
    // }


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


    handleTestify() {
        return (<Link to="/testify">Testify</Link>)
    }  


    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const {givers} = this.props; 
        let heads;
        const login=this.handleLogin();
        const logout=this.handleLogout();
        const give_aid = this.handleGive();
        const testimony= this.handleTestify();
        const getProfile = this.handleProfile();

        
        if (user){
        
        const {username} = user
        heads = {username,logout,give_aid,testimony,getProfile};
        }
        else if(!user){
            
            heads = {login};
        }
        return (
       <div >
            <Header {...heads}/>

     {givers.items &&             
            <Row>

            {givers.items.map((giver, index) =>
             
<div className="col s12 col m3" style={styles.childStyle}>
<div key={giver.id} style={styles.parentStyle} className="col s12 col m12 card">
                 <div class="card-image waves-effect waves-block waves-light">
                   <img class="activator" style={{height:"220px"}}src={giver.image}/>
                 </div>
                 <div className="card-content" style={{height:"200px"}}>
                   <span className="card-title activator grey-text text-darken-4">{giver.category}<i className="material-icons right">more_vert</i></span>
                   <p><a href="#">{giver.comment}</a></p>
                   {this.handleGiftId(giver.id)}
                 </div>
                 <div className="card-reveal">
                   <span class="card-title grey-text text-darken-4">{giver.category}<i className="material-icons right">close</i></span>
                   <p>{giver.description}</p>
                   
                 </div>
                 
               </div>

</div> 
)}
                         

</Row>
     }
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
    const { givers } = state;
    console.log("state and giver",givers,state)
    return {

        givers
    };
}

const connectedApplicantPage = connect(mapStateToProps)(ApplicationPage);
export {connectedApplicantPage as ApplicationPage };