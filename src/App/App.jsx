import React from 'react';
import { Router, Route,Switch,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row} from 'react-materialize'
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import NotFound from '../HomePage/NotFound';
import{ HomePage,LandingPage,ReceiverPage,TestifyPage,ProfilePage,AboutPage,ResetPasswordPage,ResetPassConfirmPage} from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { GiverPage } from '../Uploads';
import { ToastContainer, toast } from 'react-toastify';
import  buyForFree  from './buyForFree';
import 'react-toastify/dist/ReactToastify.css';



// import Notifications, {notify} from 'react-notify-toast';
// import 'materialize-css/dist/css/materialize.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={removeAlert:false}


       



        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

    
    }


    // componentWillReceiveProps(){
    //     setTimeout(() => {
    //         if(this.props.alert.message){
    //             this.setState({removeAlert:true})

    //         }
    //     },3000);
    //     console.log("Alerts",alert)
    //     }

    render() {
        const { alert,dispatch } = this.props;
        const {removeAlert} = this.state
      
        return (
      

          <Row className="root-wrapper" style={{marginBottom:"0"}}>
               
              
                        <Router history={history}>
                            <div>
                                
                        <Switch>
                              
                                <Route exact path="/" component={LandingPage} />
                                <Route exact path="/about" component={AboutPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/guide" component={buyForFree} />
                                <Route exact path="/reset_password/" component={ResetPasswordPage} />
                                
                                <Route exact path={`/confirm/api/password_reset/:token?`}   component={ResetPassConfirmPage} />
                                <Route path="/register" component={RegisterPage} />
                                <PrivateRoute exact path="/dashboard" component={HomePage} />
                                <PrivateRoute exact path="/give_aid" component={GiverPage} />
                                <PrivateRoute exact path="/aid_detail/:id" component={ReceiverPage} />
                                <PrivateRoute exact path="/profile" component={ProfilePage} />
                                <PrivateRoute exact path="/testify/" component={TestifyPage} />
                                <Route component={NotFound} />
                                </Switch>
                            </div>
                        </Router>
                 

             
             {alert.type === "alert-danger" && alert.message && !removeAlert &&
                <div>
                    {toast.error(alert.message)}
                    <ToastContainer autoClose={12000}/>
                        </div>

                        //  <h5 style={{color:"red",textAlign:"center"}} className="helper-text" data-error="wrong">{alert.message}</h5>
                    
                        }



             {alert.type === "alert-success" && alert.message && !removeAlert &&
                <div>
                    {toast.success(alert.message)}
                    <ToastContainer autoClose={12000}/>
                        </div>

                        //  <h5 style={{color:"red",textAlign:"center"}} className="helper-text" data-error="wrong">{alert.message}</h5>
                    
                        }

                    
                    </Row>
        );
    }
}


// const styles={
//     animateStyle:{
        
//     }
// }


function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 