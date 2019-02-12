import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { giveActions,giverActions,alertActions} from '../_actions';
import  {Header,Footer}  from '../App';
import M  from 'materialize-css/dist/js/materialize.min.js';
import {Row,Button,ProgressBar,Card} from 'react-materialize'
import {Skeleton, Bone } from 'react-loading-skeleton-placeholders';


let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;


class LandingPage extends React.Component {

    
    constructor(props) {


        super(props);
        this.state = {
            gifts:{},
            currentPage: 1,
            giftsPerPage: 12,
        
            }
        this.props.dispatch(giveActions.getCat());
        this.handleChange = this.handleChange.bind(this);
        this.isEmpty = this.isEmpty.bind(this);

    }


    
  


  
       handleClick = (event) => {
         event.preventDefault();
         this.setState({
           currentPage: Number(event.target.id)
         });
       }

       handleLastClick = (event) => {
         event.preventDefault();
         this.setState({
           currentPage:last
         });
       }
       handleFirstClick = (event) => {
         event.preventDefault();
         this.setState({
           currentPage:1
         });
       }
     

      










    componentDidMount() {
      
        this.props.dispatch(giverActions.getGifts());
        var elems = document.querySelectorAll('select');
        var options = document.querySelectorAll('option');
        M.FormSelect.init(elems, options);
       

        // this.props.dispatch(giverActions.getCat());
        setTimeout(() => {
            let {givers} = this.props
         if (this.props.givers.error){
            this.props.dispatch(alertActions.error('Due to Network Issue Data Was Unable to Load. Refresh the page.'));
        }

        this.setState({gifts:givers})
        console.log("Pagination",this.state.gifts)

        },3000)
        
       
        
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


    
        handleChange(e) {
            const {value} = e.target;
            const { dispatch } = this.props;
            dispatch(giveActions.catSearch(value.replace(/ /g, "_")));
            console.log("This is my select",value)
        }


    

    handleSearch(category) {
        return (
            <div className="input-field col m12 col s12">
            {/* <label style={{fontSize:"15px",marginTop:"-20px"}}>Select a Category</label> */}
            
            {category.cat &&
            <select   className="browser-default" style={{marginTop:"10px"}}name="category" s={12} m={12} onChange={this.handleChange}>
                <option style={{color:"white"}}value="1" disabled selected>Search By Category</option>
                 {category.cat.map((category, index) =>
                <option key={index}>{category.cat.replace(/_/g, " ")}</option>
                 )}
                </select>
                 }
                
                </div>


        )
    }

    handleGuide(){
       return <Link to="/guide">How to use buy4free</Link>
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

    handleRegister() {
        return (<Link to="/register">Register</Link>)
    } 
// displayGift(gift){

// }


isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



    render() {
        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('select');
        //     var instance = M.FormSelect.init(elems);
        //     console.log(instance.getSelectedValues)
        //   });

        
        const user = JSON.parse(localStorage.getItem('user'));
        let {currentPage, giftsPerPage} = this.state
        const {givers,category,catsearch,loading,categorizing} = this.props;
       
           
        // Logic for displaying current gifts
        let indexOfLastGift = currentPage * giftsPerPage;
        let indexOfFirstGift = indexOfLastGift - giftsPerPage;
        let currentGifts;
        if(givers.hasOwnProperty('items')&& givers.items.length > 0 ){
            currentGifts = givers.items.slice(indexOfFirstGift, indexOfLastGift);
            last = Math.ceil(givers.items.length/giftsPerPage);
        }
        prev  = currentPage > 0 ? (currentPage -1) :0;
        
        next  = (last === currentPage) ?currentPage: currentPage +1;
        console.log("Am mapping Gifts",currentGifts)
        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <=last; i++) {
            pageNumbers.push(i);
        }
       
      
        console.log("There is my category",category)
     
        let heads;
        const login=this.handleLogin();
        const search=this.handleSearch(this.props.category);
        const logout=this.handleLogout();
        const guide = this.handleGuide();
        const give_aid = this.handleGive();
        const about_us = this.handleAbout();
        const testimony= this.handleTestify();
        const getProfile = this.handleProfile();
        const register = this.handleRegister();

        
        if (user){
        
        const {username} = user
        heads = {username,search,logout,give_aid,testimony,getProfile,about_us,guide};
        }
        else if(!user){
            
            heads = {login,register,guide};
        }
        return (
       <div style={{position:"relative"}}>
            <Header props={heads}/>
  


 <div style={{width:"100%",height:"100%"}}>
                     {!categorizing && givers.items && loading && !navigator.onLine &&
                    <Card>
                    
                 <h5 style={{textAlign:'center'}}> We can detect you are not currently online. Check your data connection and refresh page.</h5>
                
                 </Card>
                        }
                       </div>


{categorizing &&
<div style={{height:"100vh"}}>

   <h4 style={{textAlign:"center"}}>Fetching Your Category</h4> 
<ProgressBar />

    </div>


}

            {!categorizing && loading &&           
            <Row style={{height:"100vh"}}>

            
           
<div className="col s12 col m3" style={styles.childStyle}>
<div style={styles.parentStyle} className="col s12 col m12 card">
                 <div className="card-image waves-effect waves-block waves-light">
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
                 <div className="card-image waves-effect waves-block waves-light">
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
                 <div className="card-image waves-effect waves-block waves-light">
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
                 <div className="card-image waves-effect waves-block waves-light">
                 <Bone height={200}  />
                 </div>
                 <div className="card-content" style={{height:"200px"}}>
                 <Skeleton  amount={1} />
                   <Skeleton amount={1} />
                   <Bone height={40} width={40}  />
                 </div>
                 
               </div>

</div> 

                     

</Row>
     }

 


     

     {givers.items && !categorizing && !catsearch.gcat &&           
            <Row>
{/* <h4>Hello{typeof(catsearch.gcat)}</h4> */}
            {currentGifts.map((giver, index) =>
           
<div key={giver.id} className="col s12 col m3" style={styles.childStyle}>
<div  style={styles.parentStyle} className="col s12 col m12 card">
                 <div className="card-image ">
            <img className="activator" style={{height:"220px"}}src={giver.image || <Bone height={220}  />}/>
                 </div>
                 <div className="card-content" style={{height:"200px"}}>
                   <span className="card-title activator grey-text text-darken-4">{giver.name || <Skeleton height={200} amount={1} />}<i className="material-icons right">more_vert</i></span>
                   <p><a href="#">{giver.comment || <Skeleton height={200} amount={1} />}</a></p>
                   {this.handleGiftId(giver.id) || <Bone height={50}  />}
                 </div>
                 <div className="card-reveal">
                   <span className="card-title grey-text text-darken-4">{giver.category}<i className="material-icons right">close</i></span>
                  {giver.category === 'CLOTH Category' &&
                   <h5>Cloth Size {giver.sub_cat}</h5>}

                   {giver.category === 'UNISEX_SHOES Category' &&
                   <h5>Shoe Size {giver.sub_cat}</h5>}


                   {giver.category === 'PHONES_AND_TABLETS Category' &&
                   <h5>Phone Model {giver.sub_cat}</h5>}

                   <p>{giver.description}</p>
                   
                 </div>
                 
               </div>

</div> 

)}
      {Object.values(givers.items).length < 1 &&

<div style={{height:"100vh"}}>
<h4 style={{textAlign:"center"}}>Sorry No Data Available For. Try Refreshing the Page.</h4>
</div>


     }                        

</Row>
     }

     {!categorizing && catsearch.gcat &&            
            <Row>

            {catsearch.gcat.map((giver, index) =>
             
<div key={giver.id} className="col s12 col m3" style={styles.childStyle}>
<div style={styles.parentStyle} className="col s12 col m12 card">
                 <div className="card-image waves-effect waves-block waves-light">
                   <img className="activator" style={{height:"220px"}}src={giver.image || <Bone height={220}/>}/>
                 </div>
                 <div className="card-content" style={{height:"200px"}}>
                   <span className="card-title activator grey-text text-darken-4">{giver.name || <Skeleton amount={1} />}<i className="material-icons right">more_vert</i></span>
                   <p><a href="#">{giver.comment || <Skeleton height={200} amount={1} />}</a></p>
                   {this.handleGiftId(giver.id || <Skeleton height={200} amount={1} />)}
                 </div>
                 <div className="card-reveal">
                   <span className="card-title grey-text text-darken-4">{giver.category}<i className="material-icons right">close</i></span>
                   <p>{giver.description}</p>
                   
                 </div>
                 
               </div>

</div> 
)}
        {catsearch.gcat.length === 0 &&

<div style={{height:"100vh"}}>
<h4 style={{textAlign:"center"}}>Sorry No Data Available For This Category. Try Another Category.</h4>
</div>


     }                     


 
</Row>
     }





{/* Pagination Area */}

<ul class="pagination" style={{display:"flex",float:"right"}}>

    {currentPage === 1 ? <li class="disabled"><a href="#! disabled" style={{display:'flex'}}> <span>Prev</span> <i class="material-icons">chevron_left </i></a></li> :
    <li><a href="#!" style={{display:'flex'}}><span onClick={this.handleClick} id={prev} href={prev}>Prev</span><i onClick={this.handleClick} id={prev} href={prev} class="material-icons">chevron_left </i></a>
    </li>
    }
  
    {
                  pageNumbers.map((number,i) =>
                  <ul className="pagination" key= {i}>
                  <li   active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                   <a onClick={this.handleClick} href={number} key={number} id={number}>
                   {number}</a></li></ul>
                )}

   
    
    {    currentPage === last? <li class="disabled">  <a href="#! disabled" style={{display:'flex'}}> <i class="material-icons">chevron_left </i><span>Next</span></a> </li>:
   <li> <a href="#!" style={{display:'flex'}}><i onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}class="material-icons">chevron_right </i><span onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</span></a>
     </li>
    }
   
  </ul>


<div style={{position:"relative", marginTop:"15%"}}>
    <Footer/> 
    </div>
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
    const { givers,category,catsearch} = state;
    const{loading} = givers
    const {categorizing} = catsearch
    
    // console.log("state and giver",state)
    return {

        givers,category,catsearch,categorizing,loading
    };
}

const connectedLandPage = connect(mapStateToProps)(LandingPage);
export {connectedLandPage as LandingPage };