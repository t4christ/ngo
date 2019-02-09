import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions} from '../_actions';
import {Input,ProgressBar} from 'react-materialize';
import  {Header,Footer}  from '../App';
// import {Skeleton } from 'react-loading-skeleton-placeholders';
// import  {ResetPassConfirmPage}  from './HomePage';

// import $ from 'jquery';

class ResetPassConfirmPage extends React.Component {
  
 

    constructor(props) {


        super(props);
// const {username} = JSON.parse(localStorage.getItem('user'));
    
        this.state = {
            confirm: {
                password: '',
                token:'',
                confirm_password:''    
            },
            submitted: false,
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // componentWillMount(){
    //     const {token}= this.state.confirm
    //     const tk = this.props.match.params.token;  
        
    //     // this.setState({token:tk})
    //     console.log("tokenized for real",spk)
    // }








    handleTestify() {
        return (<Link to="/testify">Testify</Link>)
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



    handleChange(event) {
        const { name, value } = event.target;
        
        const { confirm } = this.state;
        
        this.setState({
            confirm: {
                ...confirm,
                [name]: value
            },
            
            
        });
      
    }

    
  

    handleSubmit(event) {
        event.preventDefault();
        // const {first_name,last_name}=JSON.parse(localStorage.getItem('user'))
        const { dispatch} = this.props;
        this.setState({ submitted: true });
        const { confirm} = this.state;
        const tk=this.props.location.search.split("=")[1]

        confirm["token"]=tk
       
        
        
        // alert(giver.category)
        if (confirm.password === confirm.confirm_password) {
            dispatch(userActions.passwordConfirm(confirm));
        }
    }







    render() {
        // const username = localStorage.getItem('user');
        console.log("My Gift Props",this.props)
        console.log("My Gift State",this.state)
        const { confirming,confirm_successful } = this.props;
        const { submitted,confirm} = this.state;
        let heads;
        const login=this.handleLogin();
        const logout=this.handleLogout();
        const give_aid = this.handleGive();
        const testimony=this.handleTestify();
        const about_us = this.handleAbout();
        const getProfile = this.handleProfile();

        const user = JSON.parse(localStorage.getItem('user'));
        if (user){
        
        const {username} = user
        heads = {username,logout,give_aid,testimony,getProfile,about_us};
        }
        else if(!user){
            
            heads = {login};
        }
    
        
        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('select');
        //     var instances = M.FormSelect.init(elems);
        //   });


        return (


<div>




<Header props={heads}/>

            <div className="col s12 col m6 offset-m3">



<div className="col s12 col m12">
{confirm_successful &&

    <div className="col s12 m12">
    <h4 className="header">Password Reset Successful </h4>
    <div className="card horizontal">
     
      <div className="card-stacked">
        <div className="card-content">
          <p>Password reset successful. You can now login <Link to="/login">Here</Link></p>
        </div>
      </div>
    </div>
  </div>    

        
}


{confirming &&

    <ProgressBar />
}


       
       {!confirm_successful &&
       <div>
                <h2 style={{textAlign:"center"}}>Reset Password</h2>
                <form name="form"  onSubmit={this.handleSubmit}>
              

                     <div style={{padding:0}} className="input-field col m12 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label style={{marginBottom:10}} >Enter New Password</label>
                        <input type="password" className="form-control col m12 col s12" name="password" value={confirm.password} onChange={this.handleChange} />
                        {submitted && !confirm.password &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Password is required</span>
                        }

                        
                    </div>
                



                     <div style={{padding:0}} className="input-field col m12 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label style={{marginBottom:10}}>Confirm Password</label>

                         <input type="password" className="form-control col m12 col s12" name="confirm_password" value={confirm.confirm_password} onChange={this.handleChange} />
                        {confirm.password !== confirm.confirm_password && confirm.confirm_password.length > 0 &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Password Does Not Match</span>
                        }

                          {submitted && !confirm.confirm_password &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Password is required. </span>
                        }
                    </div>




                    <div className="col m12 col s12">
                        <button   style={{marginTop:5}} className="btn btn-primary col m3 col s12">Send</button>
                       
                        <Link  to="/" style={{marginTop:5}} className="btn btn-link col m3 offset-m6 col s12">Cancel</Link>
                    </div>
                </form>
                </div>
       }
                </div>
                    
            </div>
            <Footer/>       
            </div>
        );

       
    }
 
    
}

function mapStateToProps(state) {
   
    console.log("Hello State",state)
    const { users,confirm } = state;
    const {confirming,confirm_successful} = confirm;
    
    return {
        confirming,users,confirm_successful
    };
    
}

const connectedPassConfirmPage = connect(mapStateToProps)(ResetPassConfirmPage);
export { connectedPassConfirmPage as ResetPassConfirmPage };