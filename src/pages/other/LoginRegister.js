import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, signUpUser } from "../../store/slices/signup-slice";
import { login } from "../../store/slices/login-slice";
import cogoToast from "cogo-toast";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  
  // Sign Up Start
  const signedUser = useSelector((state) => state.signup);
  const [signupData, setSignupData] = useState({ full_name: '', email: '', password: '' });
  const [isSignUpAttempted, setIsSignUpAttempted] = useState(false);

  const signupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(signupData));
    setIsSignUpAttempted(true);

    setTimeout(() => {
      dispatch(resetUser());
    }, 3000);
  };

  useEffect(() => {
    if (isSignUpAttempted && signedUser.user?.message) {
      if (signedUser.user.message === "User registered successfully") {
        cogoToast.success(signedUser.user.message);
        setSignupData({ full_name: '', email: '', password: '' });
      } else {
        cogoToast.error(signedUser.user.message);
      }

      setIsSignUpAttempted(false);
    }
  }, [signedUser.user, isSignUpAttempted]);
  // Sign Up End
  
  // Login Start
  
  const [loginEmail, setloginEmail] = useState('');
  const [loginPass, setloginPass] = useState('');
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);

  const loggedUser = useSelector((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ "email": loginEmail, "password": loginPass }));
    setIsLoginAttempted(true);
  };
  console.log(loggedUser.user);

  useEffect(() => {
    if (isLoginAttempted && loggedUser.user?.success) {
      if(loggedUser.user.success === true){
        localStorage.setItem("loggedUser",JSON.stringify(loggedUser.user.user))
        cogoToast.success("Logged In Successfully");
        setloginEmail('');
        setloginPass('');
      }else{
        cogoToast.error(loggedUser.user.message);
      }
    }
    setIsLoginAttempted(false);
  }, [isLoginAttempted,loggedUser.user]);

  // Login End


  return (
    <Fragment>
      <SEO titleTemplate="Login" description="Login page of flone react minimalist eCommerce template." />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb pages={[ {label: "Home", path: process.env.PUBLIC_URL + "/" }, {label: "Login Register", path: process.env.PUBLIC_URL + pathname } ]} />

        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login"> <h4>Login</h4> </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register"> <h4>Register</h4> </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin}>
                              <input type="text" value={loginEmail} onChange={(e) => setloginEmail(e.target.value)} placeholder="Email" required/>
                              <input type="password" value={loginPass} onChange={(e) => setloginPass(e.target.value)} placeholder="Password" required/>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}> Forgot Password? </Link>
                                </div>
                                <button type="submit"> <span>Login</span> </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={signupSubmit}>
                              <input type="text" name="full_name" placeholder="Full Name" value={signupData.full_name} onChange={signupChange} required />
                              <input  type="email" name="email" placeholder="Email" value={signupData.email} onChange={signupChange} required/>
                              <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={signupChange} required />
                              <div className="button-box">
                                <button type="submit" > Sign Up</button>
                                {/* <button type="submit" disabled={loading}> <span>{loading ? 'Signing up...' : 'Sign Up'} </span></button> */}
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
