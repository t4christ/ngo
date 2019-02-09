import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { giveActions} from '../_actions';
import 'materialize-css/dist/css/materialize.min.css';
// import  M  from 'materialize-css/dist/js/materialize.min.js';
import {Card,Input,CardTitle, ProgressBar} from 'react-materialize';
import  {Header,Footer}  from '../App';
import {Skeleton, Bone } from 'react-loading-skeleton-placeholders';
// import $ from 'jquery';

class ReceiverPage extends React.Component {
  
    
componentDidMount() {
            const id = this.props.match.params.id;         
            this.props.dispatch(giveActions.getGiftId(id));
        }
    constructor(props) {


        super(props);
// const {username} = JSON.parse(localStorage.getItem('user'));
    
        this.state = {
            receiver: {
                volunteer: '',
                comment: '',
                image: '',
            
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }







    handleChange(event) {
        const { name, value } = event.target;
        
        const { receiver } = this.state;
        
        this.setState({
            receiver: {
                ...receiver,
                [name]: value
            }
            
        });
      
    }

    
  

    handleSubmit(event) {
        event.preventDefault();
        const { dispatch,giveid } = this.props;
        this.setState({ submitted: true });
        const { receiver,image} = this.state;
        receiver["image"]=giveid.aid.image
        receiver["volunteer"]=giveid.aid.giver
        
        
        
        // alert(giver.category)
        if (receiver.comment) {
            dispatch(giveActions.receiveGifts(receiver));
        }
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


    render() {
        // const {username} = localStorage.getItem('user');
    
        
    
        // const logout=this.handleLogout();
        // const props = {username,logout};
        console.log("My Gift Props",this.props)
        console.log("My Gift State",this.state)
        const { receiving,giveid,giving } = this.props;
        const { submitted,receiver } = this.state;
        const {aid} = giveid
        let heads;
        const login=this.handleLogin();
        const logout=this.handleLogout();
        const give_aid = this.handleGive();
        const about_us = this.handleAbout();
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
    
         
        console.log("Givers Part",aid)
         
   
        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('select');
        //     var instances = M.FormSelect.init(elems);
        //   });


        return (


<div>




<Header props={heads}/>

{receiving &&
<div style={{height:"100vh"}}>
<h4 style={{textAlign:"center"}}>Retrieving Your Aid Details</h4>
<ProgressBar />

    </div>


}

{!receiving &&
            <div className="col m12">

{ aid &&  
    <Card key={aid.id}  className="col s12 col m6" header={<CardTitle style={{height:"400px"}} reveal image={aid.image || <Bone height={220}/>} waves='light'/>}
    title={aid.category}
    reveal={<p>{aid.description || <Skeleton amount={1}/>}</p>}>
    <p><a href="#">{aid.comment || <Skeleton amount={1}/>}</a>
    </p>
</Card>
}

<div className="col s12 col m6">
                <h2 style={{textAlign:"center"}}>Receive Aid</h2>
                <form name="form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
              

                     <div style={{padding:0}} className="input-field col m12 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label style={{marginBottom:10}} htmlFor="description">Why Should You Be Given This Aid</label>
                        <Input s={12} m={12} type="textarea" className="form-control" name="comment" value={receiver.comment} onChange={this.handleChange} />
                        {submitted && !receiver.comment &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Comment is required</span>
                        }
                    </div>

            

                    {/* <div style={{padding:0}} className="input-field col m12 col s12">
                    
                        <Input s={12} m={12}  type="file" label="File"  name="image" value={receiver.image}  onChange={(e)=>this.fileChangedHandler(e)} />
                        {submitted && !receiver.image &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right"> have to see an image.</span>
                        }
                    </div> */}
                

                    <div className="col m12 col s12">
                        <button   style={{marginTop:5}} className="btn btn-primary col m3 col s12">Send</button>
                        {receiving && 
                            <img className="col m1 offset-m3" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link  to="/" style={{marginTop:5}} className="btn btn-link col m3 offset-m6 col s12">Cancel</Link>
                    </div>
                </form>
                </div>
                
            </div>
            }
            <Footer/>
            </div>
        );

       
    }
 
    
}

function mapStateToProps(state) {
   
    console.log("Hello State",state)
    const { giveid,receiver } = state;
    const {receiving} = giveid
    console.log("Hello Givers State",giveid["aid"])
    return {
        giveid,receiving
    };
    
}

const connectedReceiverPage = connect(mapStateToProps)(ReceiverPage);
export { connectedReceiverPage as ReceiverPage };