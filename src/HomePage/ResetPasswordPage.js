import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, alertActions} from '../_actions';
// import 'materialize-css/dist/css/materialize.min.css';
// import  M  from 'materialize-css/dist/js/materialize.min.js';
import {Input,ProgressBar} from 'react-materialize';
import  {Header,Footer}  from '../App';
// import {Skeleton } from 'react-loading-skeleton-placeholders';
// import  {ResetPassConfirmPage}  from './HomePage';

// import $ from 'jquery';

class ResetPasswordPage extends React.Component {
  
 

    constructor(props) {


        super(props);
// const {username} = JSON.parse(localStorage.getItem('user'));
    
        this.state = {
            reset: {
                email: '',
                
            },
            usernames:[],
            email_list:[],
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentDidCatch(){

        window.location.reload(true)
    }

 


    componentDidMount(){
        this.props.dispatch(userActions.getAll());
        const {users} = this.props
        
        const user_em=[]
        setTimeout(()=>{
           
            if (typeof(users)  !== 'undefined'){
              
            this.setState({usernames:this.props.users})

            if (typeof(this.state.usernames.items) !== 'undefined'){
            this.state.usernames.items.map((item)=>{
                user_em.push(item.email)
            })
        }
            this.setState({email_list:user_em})
            
        }
        
        else { 
            
            this.props.dispatch(alertActions.error('Due to Network Issue Data Was Unable to Load. Refresh the page.'));

           return false
        }
        
        },3000)
    }


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
        
        const { reset } = this.state;
        
        this.setState({
            reset: {
                ...reset,
                [name]: value
            }
            
        });
      
    }

    
  

    handleSubmit(event) {
        event.preventDefault();
        // const {first_name,last_name}=JSON.parse(localStorage.getItem('user'))
        const { dispatch} = this.props;
        this.setState({ submitted: true });
        const { reset} = this.state;
        
        
        
        
        // alert(giver.category)
        if (reset.email) {
            dispatch(userActions.passwordReset(reset));
        }
    }







    render() {
        // const username = localStorage.getItem('user');
        console.log("My Gift Props",this.props)
        console.log("My Gift State",this.state)
        const { resetting,reset_successful } = this.props;
        const { submitted,reset,email_list } = this.state;
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
        heads = {username,logout,give_aid,testimony,getProfile};
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
{reset_successful &&

    <div className="col s12 m12">
    <h4 className="header">Password Reset Request Successful </h4>
    <div className="card horizontal">
     
      <div className="card-stacked">
        <div className="card-content">
          <p>Your password reset details has been sent to your mail.</p>
        </div>
      </div>
    </div>
  </div>    

        
}


{resetting &&
<div>
<h4 style={{textAlign:"center"}}>Sending Reset Token To Your Mail</h4>
    <ProgressBar />
    </div>
}


       
       {!reset_successful && !resetting &&
       <div>
                <h2 style={{textAlign:"center"}}>Reset Password</h2>
                <form name="form"  onSubmit={this.handleSubmit}>
              

                     <div style={{padding:0}} className="input-field col m12 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label style={{marginBottom:0}} htmlFor="email">Enter Your Email Address</label>
                        <input style={{marginTop:20}} s={12} m={12} type="text" className="form-control" name="email" value={reset.email} onChange={this.handleChange} />
                        {submitted && !reset.email &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Your Email is required</span>
                        }

                          {submitted && email_list.indexOf(reset.email) == -1 &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Email does not exists </span>
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
    const { users,pass } = state;
    const {resetting,reset_successful} = pass;
    
    return {
        resetting,users,reset_successful
    };
    
}

const connectedPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
export { connectedPasswordPage as ResetPasswordPage };