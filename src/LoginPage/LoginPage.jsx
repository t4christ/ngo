import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  {Header,Footer}  from '../App';

// import 'materialize-css/dist/css/materialize.min.css';
import {Card} from 'react-materialize';
// import Skeleton from 'react-loading-skeleton';
// import  M from 'materialize-css/dist/js/materialize.min.js';
// import MaterialIcon from 'material-icons-react';


// import {Row,Button,Input,Icon,Col} from 'react-materialize'

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    // validate_field(username,password){
    //     if (username.length === 0){ 
    //     return ( <div>
    //      {toast.error("Username is required")}
         
        
    //      </div>)
    //     }

    //     if(password === 0){ 
    //     return( <div>
    //      {toast.error("Password is required")}

         
    //      </div>)
    // }}

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
     
        if (username && password) {
            dispatch(userActions.login(username, password));
            this.setState({username:'',password:''})
        }

    }

    handleAbout() {
        return (<Link to="/about">About Us</Link>)
    }  


    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        const about_us =this.handleAbout();
        const heads ={about_us}

        
        return (
            <div >
                <Header props={heads} />
                
                      
                <div style={{width:"100%",height:"100%"}}>
                     {loggingIn &&
                    
                    
                    <div className="progress">
                    <div className="indeterminate"></div>
                   { setTimeout(()=>{window.location.reload(true)},5000)}
                </div>
                
                
                        }
                       </div>



 <div style={{width:"100%",height:"100%"}}>
                     {!loggingIn && !navigator.onLine &&
                    <Card>
                    
                 <h5 style={{textAlign:'center'}}> We can detect you are not currently online. Check your data connection and refresh page.</h5>
                
                 </Card>
                        }
                       </div>





                    
                        {!loggingIn &&  navigator.onLine && 
            <div className="col m6 offset-m3">
           
                <h2 style={{textAlign:"center"}}>Login</h2>

                <form name="form" onSubmit={this.handleSubmit}>
                
                    <div  className="input-field col s12">
                        <label htmlFor="username">Username</label>
                        {/* <MaterialIcon icon="dashboard" /> */}
                        {/* <i className="material-icons">face</i> */}
                        
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {/* {submitted && !username &&
                          <div>
                          {toast.error("Username is required")}
                    
                         
                          </div>
                        //    <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Username is required</span>
                        } */}
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {/* {submitted && !password && 
                          <div>
                         {toast.error("Password is required")}
                        
                  
                         </div>
                            // <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Password is required</span>
                        } */}
                    </div>
                    <div className="col m12 col s12 mobileview" style={{display:"flex"}}>
                        <button  style={{marginTop:5}} className="btn btn-primary col m3 col s12">Login</button>
                                               
                        <Link to="/register" style={{marginTop:5}} className="btn btn-link col m3 offset-m6 col s12">Register</Link>
                        
                    </div>
                    <Link to="/reset_password" style={{marginTop:5}} className="col m12 col s12">Forgot Password?</Link>

                </form>

            </div>
            }
            

             <div>
               
            </div>
            <Footer/>
            </div>
           
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 