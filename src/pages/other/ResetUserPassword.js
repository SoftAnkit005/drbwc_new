import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from 'react-redux'; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import cogoToast from 'cogo-toast'; // Import cogoToast
import { resetForgotPassword, resetForgotPasswordState } from "../../store/slices/reset-password-slice";

const ResetUserPassword = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const forgotPassUser = location.state || {};
  const [loginEmail, setLoginEmail] = useState(forgotPassUser.email || "");
  const [passwordToken, setPasswordToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false); // State for confirm password visibility
  const [errors, setErrors] = useState({}); 
  const dispatch = useDispatch(); 
  const { loading, success, error } = useSelector((state) => state.resetForgotPassword); 

  useEffect(() => {
    // Clear success and error messages when the component mounts
    if (success || error) {
      dispatch(resetForgotPasswordState());
    }
  }, [dispatch, success, error]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form fields
    if (!loginEmail) newErrors.loginEmail = "Email is required.";
    if (!passwordToken) newErrors.passwordToken = "Password token is required.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }

    // If there are errors, set the errors state and prevent dispatch
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if everything is fine
    setErrors({});

    dispatch(resetForgotPassword({ email: loginEmail, token: passwordToken, password: newPassword }))
    .then(response => {
      cogoToast.success('Password Reset Successfully!'); // Show warning toast
      navigate("/login-user"); // Navigate to login page
    })
    .catch(err => {
      cogoToast.warn('Token Expired!'); // Show warning toast
      navigate("/login-user"); // Navigate to login page
    });
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    // Clear corresponding error if user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: undefined }));
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
                                className="mt-0" 
                                type="email" 
                                name="loginEmail" 
                                value={loginEmail} 
                                onChange={handleInputChange(setLoginEmail)} 
                                placeholder="Email" 
                                required 
                              />
                              {errors.loginEmail && <p className="text-danger desc-xxs">{errors.loginEmail}</p>}
                              
                              <input 
                                type="text" 
                                name="passwordToken"
                                value={passwordToken} 
                                onChange={handleInputChange(setPasswordToken)} 
                                placeholder="Password Token" 
                                required 
                              />
                              {forgotPassUser?.success && <p className="desc-xxs text-success">Token sent to your email successfully!</p>}
                              {errors.passwordToken && <p className="text-danger desc-xxs">{errors.passwordToken}</p>}

                              <div className="password-field position-relative d-flex align-items-center">
                                <input 
                                  className="mt-0" 
                                  type={showNewPassword ? "text" : "password"} 
                                  name="newPassword"
                                  value={newPassword} 
                                  onChange={handleInputChange(setNewPassword)} 
                                  placeholder="New Password" 
                                  required 
                                />
                                <span className="position-absolute end-0 cursor-pointer translate-middle-y mt-3 me-3" onClick={() => setShowNewPassword(!showNewPassword)}>
                                  {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                </span>
                                {errors.newPassword && <p className="text-danger desc-xxs">{errors.newPassword}</p>}
                              </div>

                              <div className="password-field position-relative d-flex align-items-center">
                                <input 
                                  className="mb-1 mt-0"
                                  type={showConfirmNewPassword ? "text" : "password"} // Toggle between text and password
                                  name="confirmNewPassword"
                                  value={confirmNewPassword} 
                                  onChange={handleInputChange(setConfirmNewPassword)} 
                                  placeholder="Confirm New Password" 
                                  required 
                                />
                                <span className="position-absolute end-0 cursor-pointer translate-middle-y me-3 mt-3" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                                  {showConfirmNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
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
