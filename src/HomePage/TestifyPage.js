import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { giveActions} from '../_actions';
// import 'materialize-css/dist/css/materialize.min.css';
// import  M  from 'materialize-css/dist/js/materialize.min.js';
// import {Skeleton, Bone } from 'react-loading-skeleton-placeholders';
import {Input,ProgressBar} from 'react-materialize';
import  {Header,Footer}  from '../App';

// import $ from 'jquery';

class TestifyPage extends React.Component {
  
    
componentDidMount() {
            const id = this.props.match.params.id;         
            this.props.dispatch(giveActions.getGiftId(id));
        }
    constructor(props) {


        super(props);
// const {username} = JSON.parse(localStorage.getItem('user'));
    
        this.state = {
            testifier: {
                write_up: '',
                image: null,
                first_name:'',
                last_name:''
            
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler=this.fileChangedHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }




    handleAbout() {
        return (<Link to="/about">About Us</Link>)
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

fileChangedHandler = (e) => {
       let files = e.target.files;

          let reader = new FileReader();

          reader.readAsDataURL(files[0]);

          reader.onload = (e) =>{
              this.setState({image:e.target.result})
          }
    //    return  this.setState({image:event.target.files})
      }



    handleChange(event) {
        const { name, value } = event.target;
        
        const { testifier } = this.state;
        
        this.setState({
            testifier: {
                ...testifier,
                [name]: value
            }
            
        });
      
    }

    
  

    handleSubmit(event) {
        event.preventDefault();
        // const {first_name,last_name}=JSON.parse(localStorage.getItem('user'))
        const { dispatch} = this.props;
        this.setState({ submitted: true });
        const { testifier,image} = this.state;
        testifier["image"] = image;
        
        
        
        
        // alert(giver.category)
        if (testifier.write_up) {
            dispatch(giveActions.Testimonial(testifier));
        }
    }







    render() {
        // const username = localStorage.getItem('user');
    
        
    
        // const logout=this.handleLogout();
        // const props = {username,logout};
        console.log("My Gift Props",this.props)
        console.log("My Gift State",this.state)
        const { testifying,testify } = this.props;
        const { submitted,testifier } = this.state;
        let heads;
        const about_us=this.handleAbout();
        const login=this.handleLogin();
        const logout=this.handleLogout();
        const give_aid = this.handleGive();
        const testimony=this.handleTestify();
        const getProfile = this.handleProfile();

        const user = JSON.parse(localStorage.getItem('user'));
        if (user){
        
        const {username} = user
        heads = {username,logout,give_aid,testimony,getProfile,about_us};
        }
        else if(!user){
            
            heads = {login};
        }
        // const getMap=category.items
    
         
        
         
   
        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('select');
        //     var instances = M.FormSelect.init(elems);
        //   });


        return (


<div>




<Header props={heads}/>

            <div className="col s12 col m6 offset-m3">


{testifying &&
    <div>
        <h4 style={{textAlign:"center"}}>Testifying</h4>
    <ProgressBar />
    </div>
    }

{!testifying &&
<div className="col s12 col m12">
                <h2 style={{textAlign:"center"}}>Testify To Services</h2>
                <form name="form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
              

                     <div style={{padding:0}} className="input-field col m12 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label style={{marginBottom:10}} htmlFor="description">How Do You Feel About Our Services?</label>
                        <Input s={12} m={12} type="textarea" className="form-control" name="write_up" value={testifier.write_up} onChange={this.handleChange} />
                        {submitted && !testifier.write_up &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Your view is required</span>
                        }
                    </div>

            

                     <div style={{padding:0}} className="input-field col m12 col s12">
                    
                        <Input s={12} m={12}  type="file" label="File" onChange={(e)=>this.fileChangedHandler(e)} />
                        {submitted && !testifier.image &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">People have to see an image.</span>
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
            <Footer/>
            </div>
        );

       
    }
 
    
}

function mapStateToProps(state) {
   
    console.log("Hello State",state)
    const { testify } = state;
    const {testifying} =testify
    
    return {
        testify,testifying
    };
    
}

const connectedTestifyPage = connect(mapStateToProps)(TestifyPage);
export { connectedTestifyPage as TestifyPage };