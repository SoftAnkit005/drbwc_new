import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from 'react-redux';
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { forgotPassword, resetForgotPasswordState } from "../../store/slices/forgot-password-slice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.forgotPassword);
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  const [loginEmail, setLoginEmail] = useState(rememberedEmail || '');

  // Handle forgot password form submission
  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(loginEmail));
  };

  // Handle navigation after successful submission
  useEffect(() => {
    if (success) {
      navigate('/reset-password', { state: { email: loginEmail, success: 'Reset link sent successfully!' } });
    }
  }, [success, navigate, loginEmail]);

  // Reset error and success states when the component mounts (or page refreshes)
  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordState()); // Reset the state on component unmount
    };
  }, [dispatch]);

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
                        <Nav.Link eventKey="login">
                          <h4>Forgot Password</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleForgotPassword}>
                              <input 
                                type="email" 
                                value={loginEmail} 
                                onChange={(e) => setLoginEmail(e.target.value)} 
                                placeholder="Email" 
                                required
                              />
                              <button type="submit" className="btn btn-primary mt-4">
                                {loading ? 'Sending...' : 'Send Reset Password'}
                              </button>
                            </form>

                            {/* Show error message if there's an error */}
                            {error && (
                              <p className="desc-xxs text-danger mt-3">
                                Error: {typeof error === 'object' ? error.message || error.error : error}
                              </p>
                            )}
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
