import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from 'react-redux'; // Import from react-redux
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { forgotPassword } from "../../store/slices/forgot-password-slice";

const ForgotPassword = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const dispatch = useDispatch(); // Initialize dispatch
  const { loading, success, error } = useSelector((state) => state.auth); // Access state for loading, success, and error

  console.log('loginEmail:', loginEmail);

  const handleForgotPassword = (e) => {
    e.preventDefault();

    // Dispatch the forgotPassword action with the email
    dispatch(forgotPassword(loginEmail));
  };

  return (
    <Fragment>
      <SEO titleTemplate="Forgot Password" description="Forgot Password page of Dr BWC." />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-70 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login"> <h4>Forgot Password</h4> </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleForgotPassword}>
                              <input 
                                type="text" 
                                value={loginEmail} 
                                onChange={(e) => setLoginEmail(e.target.value)} 
                                placeholder="Email" 
                                required
                              />
                              <button type="submit" className="btn btn-primary">
                                {loading ? 'Sending...' : <span>Send Reset Password</span>}
                              </button>
                            </form>

                            {/* Success or Error Messages */}
                            {success && <p>Reset link sent successfully!</p>}
                            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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

export default ForgotPassword;
