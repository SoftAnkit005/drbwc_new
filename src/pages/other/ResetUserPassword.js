import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from 'react-redux'; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { forgotPassword } from "../../store/slices/forgot-password-slice"; 
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ResetUserPassword = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [passwordToken, setPasswordToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false); // State for confirm password visibility
  const [errors, setErrors] = useState({}); 
  const dispatch = useDispatch(); 
  const { loading, success, error } = useSelector((state) => state.auth); 

  const handleResetPassword = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form fields
    if (!loginEmail) newErrors.loginEmail = "Email is required.";
    if (!passwordToken) newErrors.passwordToken = "Password token is required.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords did not matched.";
    }

    // If there are errors, set the errors state and prevent dispatch
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if everything is fine
    setErrors({});

    // Dispatch the action with all necessary data
    dispatch(forgotPassword({ email: loginEmail, token: passwordToken, newPassword }));
  };

  return (
    <Fragment>
      <SEO titleTemplate="Reset Password" description="Reset Password page of Dr BWC." />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-70 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="reset">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="reset"> <h4>Reset Password</h4> </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="reset">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleResetPassword}>
                              <input 
                                type="email" 
                                value={loginEmail} 
                                onChange={(e) => setLoginEmail(e.target.value)} 
                                placeholder="Email" 
                                required 
                              />
                              {errors.loginEmail && <p className="text-danger desc-xxs">{errors.loginEmail}</p>}
                              
                              <input 
                                type="text" 
                                value={passwordToken} 
                                onChange={(e) => setPasswordToken(e.target.value)} 
                                placeholder="Password Token" 
                                required 
                              />
                              {errors.passwordToken && <p className="text-danger desc-xxs">{errors.passwordToken}</p>}

                              <div className="password-field position-relative d-flex align-items-center">
                                <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
                                <span className="position-absolute end-0 cursor-pointer translate-middle-y mb-2 me-3">
                                  {showNewPassword ?
                                    <IoEyeOffOutline  onClick={() => setShowNewPassword(!showNewPassword)}/>
                                    :
                                    <IoEyeOutline  onClick={() => setShowNewPassword(!showNewPassword)}/>
                                  }
                                </span>
                                {errors.newPassword && <p className="text-danger desc-xxs">{errors.newPassword}</p>}
                              </div>

                              <div className="password-field position-relative d-flex align-items-center">
                                <input 
                                  className="mb-1"
                                  type={showConfirmNewPassword ? "text" : "password"} // Toggle between text and password
                                  value={confirmNewPassword} 
                                  onChange={(e) => setConfirmNewPassword(e.target.value)} 
                                  placeholder="Confirm New Password" 
                                  required 
                                />
                                <span className="position-absolute end-0 cursor-pointer translate-middle-y me-3 mt-3">
                                  {showConfirmNewPassword ?
                                    <IoEyeOffOutline  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}/>
                                    :
                                    <IoEyeOutline  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}/>
                                  }
                                </span>
                              </div>
                              {errors.confirmNewPassword && <p className="text-danger desc-xxs">{errors.confirmNewPassword}</p>}

                              <button type="submit" className="btn btn-primary mt-4">
                                {loading ? 'Sending...' : <span>Reset Password</span>}
                              </button>
                            </form>

                            {/* Success Message */}
                            {success && 
                              <>
                                <p>Password changed successfully!</p>
                                <p className="pt-4">
                                  <Link to={process.env.PUBLIC_URL + "/login-user"}>Go to Login.</Link>
                                </p>
                              </>
                            }
                            {error && <p className="text-danger desc-xxs">Error: {error}</p>}
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

export default ResetUserPassword;
