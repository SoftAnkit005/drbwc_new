import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLoginState } from "../../store/slices/login-slice";
import { resetUser, signUpUser } from "../../store/slices/signup-slice";
import cogoToast from "cogo-toast";
import { addToCart } from "../../store/slices/cart-slice";
import { setToken } from "../../store/slices/auth-slice";

const LoginRegister = () => {
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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { user, error } = useSelector((state) => state.login);

  // Prefill the login form if credentials are stored in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    
    if (savedEmail && savedPassword) {
      setLoginEmail(savedEmail);
      setLoginPass(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (rememberMe) {
      // Store the email and password in localStorage
      localStorage.setItem("rememberedEmail", loginEmail);
      localStorage.setItem("rememberedPassword", loginPass);
    } else {
      // Clear the saved credentials if "Remember me" is unchecked
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    dispatch(loginUser({ email: loginEmail, password: loginPass }));
  };

  // console.log(user);
  useEffect(() => {
    if (user && user.success) {
      cogoToast.success("Logged in successfully!");
      localStorage.setItem("loggedUser", JSON.stringify(user.user));
      // localStorage.setItem("authToken", user.token);
      dispatch(setToken(user.token));
      dispatch(resetLoginState());

      // Check if there is a cart in session storage
      const sessionCart = sessionStorage.getItem("cart");
      if (sessionCart) {
        const cartItems = JSON.parse(sessionCart);
        console.log(cartItems);
        cartItems.forEach(item => {
          const payload = {
            product_id: item.product_id,
            quantity: item.quantity,
            color: item.color
          };
          console.log('payload.cartItem', payload);
          dispatch(addToCart(payload)); // Dispatch addToCart for each item
        });
        navigate("/cart");
      } else {
        navigate("/");
      }
    } else if (user && !user.success) {
      cogoToast.error(user.message || "Login failed");
      dispatch(resetLoginState());
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(resetLoginState());
    }
  }, [error, dispatch]);

  // Login End

  return (
    <Fragment>
      <SEO titleTemplate="Login" description="Login page of Dr BWC." />
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
                              <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" required/>
                              <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="Password" required/>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input id="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                                  <label htmlFor="remember-me" className="ml-10">Remember me</label>
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
