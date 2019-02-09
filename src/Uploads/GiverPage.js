import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { giveActions} from '../_actions';
import {Skeleton, Bone } from 'react-loading-skeleton-placeholders';
// import M  from 'materialize-css/dist/js/materialize.min.js';
import {Input,ProgressBar} from 'react-materialize';
import  {Header,Footer}  from '../App';

// import $ from 'jquery';

class GiverPage extends React.Component {
  
    
    constructor(props) {
        super(props);
   
          
        
       
       
        
// const {username} = JSON.parse(localStorage.getItem('user'));
    
        this.state = {
            giver: {
                description: '',
                comment: '',
                category:'',
                name:'',
                image: null,
            
            },
            sub_cat:'',
            cat_pick:'',
            submitted: false,
            file_large:''
        };

        // this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler=this.fileChangedHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


// componentDidMount() {  
  

        // }


        fileChangedHandler = (e) => {
            let size = e.target.files[0].size
            if (size > 4000000){
                this.setState({file_large:`File size too large. Maintain a file size of 4mb`})
            }
    
            else{
            let files = e.target.files;
     
               let reader = new FileReader();
     
               reader.readAsDataURL(files[0]);
     
               reader.onload = (e) =>{
                   this.setState({image:e.target.result})
               }
            }
         //    return  this.setState({image:event.target.files})
           }
// fileChangedHandler = (e) => {
//        let files = e.target.files;

//           let reader = new FileReader();

//           reader.readAsDataURL(files[0]);

//           reader.onload = (e) =>{
//               this.setState({image:e.target.result})
//           }
//     //    return  this.setState({image:event.target.files})
//       }


handleSubChange = (event) => {
    const { name, value } = event.target;
   

    this.setState({
        
            sub_cat:value
        
        
    });

  
}

    handleChange = (event) => {
        const { name, value } = event.target;
       
        if ( value === 'shoes'){
            this.setState({cat_pick:'shoe',sub_select:true})
        }
    
    
        else if ( value === 'clothes'){
            this.setState({cat_pick:'cloth',sub_select:true})
        }
    
        // else{
        //     this.setState({cat_pick:''})
        // }
     
        const { giver } = this.state;
        
        this.setState({
            giver: {
                ...giver,
                [name]: value
            }
            
        });
    
      
    }

    
      onChange = (e) => {
          let files = e.target.files;

          let reader = new FileReader();

          reader.readAsDataURL(files[0]);

          reader.onload = (e) =>{
              this.setState({image:e.target.result})
          }


      }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { giver,image,sub_cat} = this.state;
        giver["image"]=image
        giver['sub_cat']=sub_cat
        
        
        const { dispatch } = this.props;
        // alert(giver.category)
        if (giver.description && giver.comment && giver.category && giver.image) {
            dispatch(giveActions.giveGifts(giver));
        }
    }

componentDidMount(){
    this.props.dispatch(giveActions.getCat());

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

    get_cat = (cat)=>{
        if ( cat === 'phone'){
            // this.setState({cat_pick:'phone'})
        console.log ("My real Category",cat)
        }
    }

  
    render() {
     
        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('select');
        //     var instance = M.FormSelect.init(elems);
        //     console.log(instance.getSelectedValues)
        //   });
        // const username = localStorage.getItem('user');
    
        // const logout=this.handleLogout();
        // const props = {username,logout};
        console.log("My Gift Props",this.props)
        console.log("My Gift State",this.state)
        const { giving,category  } = this.props;
        const { submitted,giver,cat_pick ,sub_cat} = this.state;
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
         
        console.log("Givers Part",category)

   
        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('select');
        //     var instances = M.FormSelect.init(elems);
        //   });


        return (


<div >




<Header props={heads}/>

            <div className="col m6 offset-m3">
            
{giving &&
    <div style={{height:"100vh"}}>
<h2 style={{textAlign:"center"}}>Giving Aid</h2>
                <ProgressBar />
              
                {/* <div style={{padding:0}} className="input-field col m6 col s12">
                        <Bone height={40} />
                    </div>
                     <div style={{padding:0}} className="input-field col m6 col s12">
                     <Bone height={40} />
                    </div>

               
                    

                <div className="input-field col m12 col s12">
                <Bone height={40} />
                    </div>

                                 <div style={{padding:0}} className="input-field col m6 col s12">
                                 <Bone height={40} />
                    </div>


                    <div style={{padding:0}} className="input-field col m6 col s12">
                    
                    <Bone height={40} />
                    </div>
                

                    <div className="col m12 col s12">
                        <button   style={{marginTop:5,color:"lightgray"}} className="btn btn-primary col m3 col s12">Send</button>
                      
                        <Link  to="/" style={{marginTop:5,color:"lightgray"}} className="btn btn-link col m3 offset-m6 col s12">Cancel</Link>
                    </div> */}
                
            </div>
    }


    {!giving &&
<div>
                <h2 style={{textAlign:"center"}}>Give Aid</h2>
                <form name="form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
              
                <div style={{padding:0}} className="input-field col m6 col s12">
                        <label style={{marginBottom:10}} htmlFor="name">Name</label>
                        {/* <i className="material-icons prefix">account_circle</i> */}
                        <Input type="textarea" s={12} m={12} className="form-control" name="name" value={giver.name} onChange={this.handleChange} />
                        {submitted && !giver.name &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Name is required</span>
                        }
                    </div>
                     <div style={{padding:0}} className="input-field col m6 col s12">
                    {/* <i className="material-icons prefix">account_circle</i> */}
                        <label style={{marginBottom:10}} htmlFor="description">Description</label>
                        <Input s={12} m={12} type="textarea" className="form-control" name="description" value={giver.description} onChange={this.handleChange} />
                        {submitted && !giver.comment &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">Description is required</span>
                        }
                    </div>

               
                    

                <div className="input-field col m12 col s12">
                <label style={{fontSize:"15px",marginTop:"-20px"}}>Select a Category</label>
                
                {this.props.category.cat &&
                <div>
                <select    className="browser-default" name="category" s={12} m={12}  onChange={this.handleChange}>
                    <option value="1" disabled selected>Pick Category</option>
                     {this.props.category.cat.map((category, index) =>
                      !category.cat.includes('phn') && !category.cat.includes('clt') && !category.cat.includes('ssh') &&
                    <option key={index}>{category.cat}</option>
                     )}
                    </select>

{cat_pick === 'phone' &&
<select    className="browser-default" name="sub_cat" s={12} m={12}  onChange={this.handleSubChange}>
{/* <input value={this.get_cat('phone')} type="hidden"/> */}
<option value="1" disabled selected>Pick Phone Model</option>
 {this.props.category.cat.map((category, index) =>
    category.cat.includes('phn') &&
  
<option key={index}>{ category.cat.replace('phn_','')}</option>

 )}

</select>
}

{cat_pick === 'cloth' &&
<select    className="browser-default" name="sub_cat" s={12} m={12}  onChange={this.handleSubChange}>
{/* <input value={this.get_cat('cloth')} type="hidden"/> */}
<option value="1" disabled selected>Pick Cloth Size</option>
{this.props.category.cat.map((category, index) =>
    category.cat.includes('clt') &&

<option key={index}>{ category.cat.replace('clt_','')}</option>
    
 )}
  
</select>
}


{cat_pick === 'shoe'  &&
<select    className="browser-default" name="sub_cat" s={12} m={12}  onChange={this.handleSubChange}>
<option value="1" disabled selected>Pick Shoe Size</option>
{this.props.category.cat.map((category, index) =>
    category.cat.includes('sh') &&
<option key={index}>{ category.cat.replace('sh_','')}</option>
    
 )}
</select>
}
</div>

                     }
                        {this.props.submitted && !giver.category &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">You must select a category</span>
                        }
                        {/* <label>Select Category</label> */}
                    </div>

                                 <div style={{padding:0}} className="input-field col m6 col s12">
                        <label style={{marginBottom:10}} htmlFor="comment">Comment</label>
                        {/* <i className="material-icons prefix">account_circle</i> */}
                        <Input type="textarea" s={12} m={12} className="form-control" name="comment" value={giver.comment} onChange={this.handleChange} />
                        {submitted && !giver.comment &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">A little comment is required. Kindly drop one.</span>
                        }
                    </div>


                    <div style={{padding:0}} className="input-field col m6 col s12">
                    
                        <Input s={12} m={12}  type="file" label="File"  name="image"   onChange={(e)=>this.fileChangedHandler(e)} />
                        {submitted && !giver.image &&
                            <span style={{color:"#E57373"}} className="helper-text" data-error="wrong" data-success="right">People have to see an image.</span>
                        }
                    </div>
                

                    <div className="col m12 col s12">
                        <button   style={{marginTop:5}} className="btn btn-primary col m5 col s12">Send</button>
                       
                        <Link  to="/" style={{marginTop:5}} className="btn btn-link col m5 offset-m2 col s12">Cancel</Link>
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
    const { category,giver } = state;
    const {giving} = giver
    console.log("Hello Givers State",category)
    return {
        category,giving
    };
    
}

const connectedGiverPage = connect(mapStateToProps)(GiverPage);
export { connectedGiverPage as GiverPage };