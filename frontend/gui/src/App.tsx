import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "./containers/Pages/signin";
import SignUp from "./containers/Pages/signup";
import CustomLayout from "./containers/Layout";
import StudentList from "./containers/Students/list";
import CourseList from "./containers/Courses/list";
import DetailStudent from "./containers/Students/detail";
import DetailCourse from "./containers/Courses/detail";
import AddNewStudent from "./components/Course/add";
import AddNewCourse from "./components/Student/add";
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
                        // return loggedIn ? <Redirect to="/list"/> : <Redirect to="/signin"/>;
                        return <Redirect to="/list"/>;
                    }}/>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/create_student" render={(props) => {
                      if(!loggedIn) {
                         openNotificationWithIcon('warning', 'Warning', 'Please log in');
                      }
                      //@ts-ignore
                      // return loggedIn ? <AddNewStudent {...props}/> : <Redirect to="/signin"/>
                      return <AddNewStudent {...props}/>
                    }}/>
                      <Route path="/create_course" render={(props) => {
                          if(!loggedIn) {
                              openNotificationWithIcon('warning', 'Warning', 'Please log in');
                          }
                          //@ts-ignore
                          // return loggedIn ? <AddNewStudent {...props}/> : <Redirect to="/signin"/>
                          return <AddNewCourse {...props}/>
                      }}/>
                    <Route path="/list_of_students/:id" render={(props) => {
                        if(!loggedIn) {
                          openNotificationWithIcon('warning', 'Warning', 'Please log in');
                        }
                                                //@ts-ignore
                        // return loggedIn ? <Detail {...props}/> : <Redirect to="/signin"/>
                        return <DetailStudent {...props}/>
                    }}/>
                      <Route path="/list_of_courses/:id" render={(props) => {
                          if(!loggedIn) {
                              openNotificationWithIcon('warning', 'Warning', 'Please log in');
                          }
                          //@ts-ignore
                          // return loggedIn ? <Detail {...props}/> : <Redirect to="/signin"/>
                          return <DetailCourse {...props}/>
                      }}/>
                    <Route path="/list_of_students/" render={(props) => {
                        if(!loggedIn) {
                          openNotificationWithIcon('warning', 'Warning', 'Please log in');
                        }
                        //@ts-ignore
                        // return loggedIn ? <StudentList {...props}/> : <Redirect to="/signin"/>
                        return <StudentList {...props}/>;
                    }}/>
                      <Route path="/list_of_courses/" render={(props) => {
                          if(!loggedIn) {
                              openNotificationWithIcon('warning', 'Warning', 'Please log in');
                          }
                          //@ts-ignore
                          // return loggedIn ? <StudentList {...props}/> : <Redirect to="/signin"/>
                          return <CourseList {...props}/>;
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
