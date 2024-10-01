import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, signUpUser } from "../../store/slices/signup-slice";
import cogoToast from "cogo-toast";

const RegisterPage = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        cogoToast.success(signedUser.user.message, { position: 'top-right'});
        navigate('/login-user');
        setSignupData({ full_name: '', email: '', password: '' });
      } else {
        cogoToast.error(signedUser.user.message, { position: 'top-right'});
      }

      setIsSignUpAttempted(false);
    }
  }, [signedUser.user, isSignUpAttempted]);
  // Sign Up End

  return (
    <Fragment>
      <SEO titleTemplate="Login" description="Login page of Dr BWC." />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-70 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register"> <h4>Register User</h4> </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={signupSubmit}>
                              <input type="text" name="full_name" placeholder="Full Name" value={signupData.full_name} onChange={signupChange} required />
                              <input  type="email" name="email" placeholder="Email" value={signupData.email} onChange={signupChange} required/>
                              <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={signupChange} required />
                              <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
                            </form>
                            <p className="pt-4">Already have an account? <Link to={process.env.PUBLIC_URL + "/login-user"}>Login</Link></p>
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

export default RegisterPage;
