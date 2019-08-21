import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "./containers/Pages/signin";
import SignUp from "./containers/Pages/signup";
import CustomLayout from "./containers/Layout";
import FriendList from "./containers/Friends/list";
import Detail from "./containers/Friends/detail";
import AddNewFriend from "./components/Friend/addNewFriend";
import openNotificationWithIcon from "./helpers/openNotificationWithIcon";
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';
import axios from "axios";

const App: React.FC = (props) => {
    //@ts-ignore
    const loggedIn = !!localStorage.getItem('token');
    useEffect(() => {
        //@ts-ignore
        props.onTryAutoSignup();
    });

  return (
    <div className="App">
        <Router>
            <CustomLayout>
                  <div>
                    <Route exact path="/" render={() => {
                        if(!loggedIn) {
                            openNotificationWithIcon('warning', 'Warning', 'Please log in');
                        }
                        return loggedIn ? <Redirect to="/list"/> : <Redirect to="/signin"/>;
                    }}/>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/create" render={(props) => {
                      if(!loggedIn) {
                         openNotificationWithIcon('warning', 'Warning', 'Please log in');
                      }
                      //@ts-ignore
                      return loggedIn ? <AddNewFriend {...props}/> : <Redirect to="/signin"/>
                    }}/>
                    <Route path="/list/:id" render={(props) => {
                        if(!loggedIn) {
                          openNotificationWithIcon('warning', 'Warning', 'Please log in');
                        }
                                                //@ts-ignore
                        return loggedIn ? <Detail {...props}/> : <Redirect to="/signin"/>
                    }}/>
                    <Route path="/list/" render={(props) => {
                        if(!loggedIn) {
                          openNotificationWithIcon('warning', 'Warning', 'Please log in');
                        }
                        //@ts-ignore
                        return loggedIn ? <FriendList {...props}/> : <Redirect to="/signin"/>
                    }}/>
                  </div>
            </CustomLayout>
        </Router>
    </div>
  );
};

const mapStateToProps = (state:any) => {
    return {
        isAuthenticated: !!state.token,
        token: state.token
    }
};

const mapDispatchToProps = (dispatch:any) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
