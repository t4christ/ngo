import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, alertActions } from '../_actions';
import  {Header,Footer}  from '../App';
import {Card,CardTitle,Button,ProgressBar} from 'react-materialize'
import  M  from 'materialize-css/dist/js/materialize.min.js';
import {Skeleton, Bone } from 'react-loading-skeleton-placeholders';
// import $ from 'jquery';



class ProfilePage extends React.Component {


constructor(props) {
        super(props);
       
        
      
      this.state = {
            user: {
                first_name: '',
                last_name: '',
                username: '',
                email:'',
                phone_number:'',
                bio:'',
                photo:null
            },
            submitted: false,
            showMButton:false,
            file_large:""
        
        };
        // this.activateModal = this.activateModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

}


componentDidCatch(){
    window.location.reload(true)
}




    componentDidMount() {
      
      
            var elems = document.querySelectorAll('.modal');
             M.Modal.init(elems);
         

        const {username} = JSON.parse(localStorage.getItem("user"))

     
        this.props.dispatch(userActions.getProfile(username));

        let reload_count = {count:0}
        setTimeout(() => {
           
        // const {t} = this.props.profile
        
    
    if (this.props.profile){
        this.setState({
            user:
            {
                first_name: this.props.profile.t.user.first_name,
                last_name: this.props.profile.t.user.last_name,
                username: this.props.profile.t.user.username,
                email:this.props.profile.t.user.email,
                phone_number:this.props.profile.t.user.phone_number,
                bio:this.props.profile.t.user.bio,
               
            }
            
        }) 
    }
    // else{
    //     if(reload_count  < 2){
    //     window.location.reload(true)
    //     reload_count.count ++
    //     alert(reload_count)
    //     }
    // }
        console.log('My whole profile',this.state.user)
        this.setState({showMButton:true})
        }, 3000);
   
        //  document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('.modal');
        //      M.Modal.init(elems);
        //     // var instance = M.Modal.getInstance(elems)
        //   });
    }





    // fileChangedHandler = (e) => {
    //             let size = e.target.files[0].size
    //             if (size > 4000000){
    //                 this.setState({file_large:`File size too large. Maintain a file size of 4mb`})
    //             }
    //           else{
    //             this.setState({photo:e.target.files[0],file_large:""})
    //           }
               

    //            console.log("My file size",size)
           
    
    //    }
 
       fileChangedHandler = (e) => {
           if(typeof(e.target.length) !== 'undefined'){
        let size = e.target.files[0].size
        if (size && size > 4000000){
            this.setState({file_large:`File size too large. Maintain a file size of 4mb`})
        }
    }
        
        let files = e.target.files;
 
           let reader = new FileReader();
 
           reader.readAsDataURL(files[0]);
 
           reader.onload = (e) =>{
               this.setState({photo:e.target.result})
           }
        
        }
     //    return  this.setState({image:event.target.files})
      


    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
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



    handleTestify() {
        return (<Link to="/testify">Testify</Link>)
    }  

    handleAbout() {
        return (<Link to="/about">About Us</Link>)
    }  


   
    handleChange(event) {
        const { name, value } = event.target;
        const{user} = this.state;
        // console.log(name,value)
        const { t } = this.props.profile;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
            open:false
            
        });
      
    }






     toDataUrl(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        this.setState({ submitted: true });
        const { user,photo } = this.state;
        const { dispatch } = this.props;
        
        // alert(Object.values(user))
        if(photo){
            user["photo"] = photo
        }

       else if (user.photo){
        delete user["photo"] 
        }
      

        if (user.first_name && user.last_name && user.phone_number) {
           
            dispatch(userActions.updateProfile(user));
        
        }

        else{
            this.props.dispatch(alertActions.error('Ensure all fields are entered correctly.'));
            setTimeout(()=>{
                window.location.reload(true)
            },4000)
          
        }
     
        
    }

    
 
 
    render() {
 

 
       
        

        const {profile,update_success,updating,profiling,updated} = this.props;
        const {user,submitted,showMButton} = this.state;
        const {t} = profile
        console.log("Rendered USer",user)
        // console.log("Count",count)
        let heads;
        const login=this.handleLogin();
        const logout=this.handleLogout();
        const give_aid = this.handleGive();
        const about_us =this.handleAbout();
        const getProfile = this.handleProfile();
        const testimony=this.handleTestify();

        const users = JSON.parse(localStorage.getItem('user'));

     



        if (users){
        
        const {username} = users
        heads = {username,logout,give_aid,testimony,getProfile,about_us};
        }
        else if(!users){
            
            heads = {login};
        }


        console.log("My profile",this.state)


        
        return (
            
<div className="col m12 col s12" style={{padding:0,position:"relative"}}>

 {/* <!-- Modal Trigger --> */}
  {/* <!-- Modal Structure --> */}
  
  
        <Header props={heads}/>



{updating &&
<div style={{height:"80vh"}}>
<h4 style={{textAlign:"center"}}>Updating Profile Details</h4>
<ProgressBar />

    </div>
}


{updated &&
    <div style={{height:"80vh"}}>
    <h4 style={{textAlign:"center",color:"red"}}>Your Profile Details is not Yet Updated. It might be due to Newtwork Issues Try Again.</h4>
    <ProgressBar />
   { setTimeout(()=>{
            window.location.reload(true);
        },3000)}
        </div>
    }


    {update_success &&
    <div style={{height:"80vh"}}>
    <h6 style={{textAlign:"center",color:"green"}}>Your Profile Details Has Been Updated.</h6>
    <ProgressBar />
   { setTimeout(()=>{
            window.location.reload(true);
        },3000)}
        </div>
    }

        {profiling && 
<div style={{height:"80vh"}}>
    <h4 style={{textAlign:"center"}}>Retrieving Your Profile Details</h4>
<ProgressBar />

    </div>

}




{!submitted && !updating && !updated  &&
<div id="modal1" className="modal">
    <div className="modal-content">
    <div className="col m12">
                <h4 style={{textAlign:"center"}}>Update Profile</h4>
                {t &&
                <img  src={t.photo} style={styles.imageProfileStyle} alt="view.jpg"/>}

                {t &&
                
                <form style={{marginTop:"182px"}} name="form" onSubmit={this.handleSubmit}>
                       
                <div className="file-field input-field col m12 col s12">
                <div className="btn">
                 <span>Update Picture</span>
                    <input type="file" name="photo"   onChange={(e)=>this.fileChangedHandler(e)} />
                    {this.state.file_large &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">{this.state.file_large}</span>
                        }
                     </div>
                 <div className="file-path-wrapper">
                 <input className="file-path validate" type="text"/>
                     </div>
                     </div>

                {/* <div className="input-field col m12 col s12">
                
                        <label style={styles.modalFormSytle} htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Username is required</span>
                        }
                    </div> */}


                    <div className="input-field col m12 col s12">
                        <label style={styles.modalFormSytle} htmlFor="username">Bio</label>
                        <input type="text" className="form-control" name="bio" value={user.bio} onChange={this.handleChange} />
                        {!user.bio  &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Kindly write something about yourself.</span>
                        }
                    </div>

                     {/* <div className="input-field col m6 col s12"> */}
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        {/* <label style={styles.modalFormSytle} htmlFor="lastName">Email</label> */}
                        {/* <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} /> */}
                        {/* {submitted && !user.email && */}
                            {/* // <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Email is required</span> */}
                        {/* // } */}
                    {/* </div> */}

                    <div className="input-field col m6 col s12">
                        <label style={styles.modalFormSytle} htmlFor="firstName">First Name</label>
                        {/* <i className="material-icons prefix">account_circle</i> */}
                        <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={this.handleChange} />
                        {!user.first_name &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">First Name is required</span>
                        }
                    </div>
                    <div className="input-field col m6 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label style={styles.modalFormSytle} htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={this.handleChange} />
                        {!user.last_name &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Last Name is required</span>
                        }
                    </div>
                    <div className="input-field col m12 col s12">
                        <label style={styles.modalFormSytle} htmlFor="tname">Phone Number</label>
                        {/* <i className="material-icons prefix">account_circle</i> */}
                        <input type="text" className="form-control" name="phone_number" value={user.phone_number} onChange={this.handleChange} />
                        {!user.phone_number < 1 && user.phone_number.length > 11 &&
                            <span  style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Phone Number is required and must not be greater than 11 digits</span>
                        }
                    </div>

                    <div className="col m12 col s12">
                        <button   style={{marginTop:5}} className="btn btn-primary col m3 col s12">Update</button>
                        {updating && 
                            <ProgressBar/>
                        }
                        {/* <Link  to="/login" style={{marginTop:5}} className="btn btn-link col m3 offset-m6 col s12">Cancel</Link> */}
                    </div>
                </form>
                }
            </div>
    </div>
    <div className="modal-footer">
      <a href="javascript:void(0)" className="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
}





{!profiling && !updating && !updated &&
        <div className="col m4 offset-m4 col s12">
               {t && <h5 style={{textAlign:"center"}}>Hi  {t.user.first_name}! We Glad to Have You Here</h5>}
                <h5 style={{textAlign:"center"}} >Here is Your Profile Details</h5>
                {/* {profile && <ProgressBar/>} */}
                {/* {profile.error && <span className="text-danger">ERROR: {profile.error}</span>} */}
              {t && 
              <Card header={<CardTitle style={{height:"300px"}} reveal image={t.photo || <Bone height={220}/>} waves='light'/>}
                    title="Personal Information"
                reveal={<p>Biography <br/>{t.bio}</p>}>
                
              {/* <p>username: {t.username || <Skeleton amount={1}/>}</p> */}
              <p>First Name: {t.user.first_name || <Skeleton amount={1}/>}</p>
              <p>Last Name: {t.user.last_name|| <Skeleton amount={1}/>}</p>
              <p>Phone Number: {t.user.phone_number|| <Skeleton amount={1}/>}</p>
              {/* <p>{profile.}</p> */}
              {/* <p>{profile.t.bio}</p> */}
              <p>Biography: <br/>{t.bio}</p> 
             {showMButton &&
            <p><button data-target="modal1" className="btn modal-trigger">Edit Profile</button></p>
             }
            </Card>
         
              }
          
                </div>

}


<Footer/>

            </div>
        );
    
    }
}

function mapStateToProps(state) {
    const {profile,updateProfile} = state;
    const{profiling}=profile
    const { updating,updated,update_success } = updateProfile;
    console.log("Profiler",profile)
    return {
        updating,profile,profiling,updated,update_success
    };
}


const styles={
    modalFormSytle:{
        marginTop:"-4.6%",
        fontSize:"1rem"
    },
    imageProfileStyle:{
        padding:"0",
        borderRadius:"50%",
        height:"150px",
        width:"150px",
        position:"absolute",
        top:"25%",
        left:"50%",
        marginLeft:"-75px",
        marginTop:"-41px"
    }
}


const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };

  /* {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                } */