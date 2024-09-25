import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLoginState } from "../../store/slices/login-slice";
import cogoToast from "cogo-toast";
import { addToCart } from "../../store/slices/cart-slice";
import { setToken } from "../../store/slices/auth-slice";

const LoginPage = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user && user.success) {
      cogoToast.success("Logged in successfully!", { position: 'top-right' });
      localStorage.setItem("loggedUser", JSON.stringify(user.user));
      dispatch(setToken(user.token));
      dispatch(resetLoginState());

      // Check if there is a cart in session storage
      const sessionCart = sessionStorage.getItem("cart");
      if (sessionCart) {
        const cartItems = JSON.parse(sessionCart);
        cartItems.forEach(item => {
          const payload = {
            product_id: item.product_id,
            quantity: item.quantity,
            color: item.color
          };
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
        <div className="login-register-area pt-70 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login"> <h4>Login User</h4> </Nav.Link>
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
                            <p className="pt-4">Do not have an account? <Link to={process.env.PUBLIC_URL + "/register-user"}>Register</Link></p>
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

export default LoginPage;
