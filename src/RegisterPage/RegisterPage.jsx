import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Skeleton, Bone } from 'react-loading-skeleton-placeholders';
// import {Row} from 'react-materialize'
import  {Header}  from '../App';
import { userActions, alertActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);


     
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                username: '',
                email:'',
                password: '',
                confirm_password:'',
                phone_number:'',
            },
            submitted: false,
            usernames:[],
            user_list:[],
            email_list:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    // componentDidMount() {
    //     this.props.dispatch(userActions.getAll());
    
        
    
    // }   

    componentDidMount(){
        this.props.dispatch(userActions.getAll());
        const user_arr=[]
        const user_em=[]
        
       
        setTimeout(()=>{
            let {users} = this.props
                this.setState({usernames:users})
                if (typeof(this.state.usernames.items) !== 'undefined'){
                console.log("Usernames",this.state.usernames)
                this.state.usernames.items.map((item)=>{ 
                    user_arr.push(item.username)
                    user_em.push(item.email)
                })
                
            }


             else{
                //  window.location.reload(true)
                // this.props.dispatch(alertActions.error('Due to Network Issue Data Was Unable to Load. Refresh the page.'));
                 return false
             }

            this.setState({user_list:user_arr,email_list:user_em})

        },3000)
    }




    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
            
        });
      
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        // if(this.state.user_list.indexOf(user.username) === -1 && this.state.email_list.indexOf(user.email) === -1 && user.phone_number.length === 11){
        if (user.first_name && user.last_name &&  user.username && user.email && user.phone_number && user.password.length > 7  && user.confirm_password.length > 7) {
            dispatch(userActions.register(user));
            
        // }
    }
    }

    handleAbout() {
        return (<Link to="/about">About Us</Link>)
    }  

   
    render() {
        const { registering  } = this.props;
        const { user,submitted,user_list,email_list} = this.state;
       const about_us = this.handleAbout();
       
       const heads ={about_us}
            console.log("User Liist",email_list)
    
        
        return (


<div>
    <Header props={heads} />


            <div className="col m6 offset-m3">

{registering &&
<div>
<Skeleton amount={1}/>
<Bone height={120}/>
</div>
}
                <h2 style={{textAlign:"center"}}>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                <div className="input-field col m12 col s12">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Username is required </span>
                        }
                            
                      {user_list.indexOf(user.username) > -1 &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Username already exists </span>
                        }
                    </div>

                     <div className="input-field col m6 col s12">
                        <label htmlFor="lastName">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Email is required</span>
                        }
                            {email_list.indexOf(user.email) > -1 &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Email already exists </span>
                        }
                    </div>

                    <div className="input-field col m6 col s12">
                        <label htmlFor="firstName">First Name</label>
                        {/* <i className="material-icons prefix">account_circle</i> */}
                        <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={this.handleChange} />
                        {submitted && !user.first_name &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">First Name is required</span>
                        }
                    </div>
                    <div className="input-field col m6 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={this.handleChange} />
                        {submitted && !user.last_name &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Last Name is required</span>
                        }
                    </div>
                    <div className="input-field col m6 col s12">
                        <label htmlFor="username">Phone Number</label>
                        {/* <i className="material-icons prefix">account_circle</i> */}
                        <input type="text" className="form-control" name="phone_number" value={user.phone_number} onChange={this.handleChange} />
                        {submitted && !user.phone_number || user.phone_number.length > 11 &&
                            <span  style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Phone Number is required and must not be greater than 11 digits</span>
                        }

                    
                    </div>
                    <div className="input-field col m6 col s12">
                        <label htmlFor="password">Password</label>
                        {/* <i className="material-icons prefix">lock</i> */}
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Password is required and passwords must match.</span>
                        }

                         {submitted && !user.password.length < 8 &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Password must have minimum of 8 characters.</span>
                        }
                    </div>

                          <div className="input-field col m6 col s12">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" className="form-control" name="confirm_password" value={user.confirm_password} onChange={this.handleChange} />
                        {submitted && !user.confirm_password || user.confirm_password != user.password &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Password is required and passwords must match.</span>
                        }
                    </div>

                    <div className="col m12 col s12 mobileview">
                        <button   style={{marginTop:5}} className="btn btn-primary col m3 col s12">Register</button>
                      
                        <Link  to="/login" style={{marginTop:5}} className="btn btn-link col m3 offset-m6 col s12">Cancel</Link>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering,users } = state;
    
    return {
        registering,users
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };