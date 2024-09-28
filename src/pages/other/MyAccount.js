import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import cogoToast from "cogo-toast";
import { clearToken } from "../../store/slices/auth-slice";
import { useDispatch } from "react-redux";

const MyAccount = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedUser'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // const handleLogout = (e) => {
  //   e.preventDefault(); // Prevent the default Link navigation
  //   cogoToast.error('Logged out Successfully!', { position: 'top-right' });
  //   dispatch(clearToken());
  // };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of Dr BWC."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className="myaccount-area pb-80 pt-80 text-center">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper justify-content-center">
                  {user ? (
                    <div>
                      <img className="rounded-circle nav-user-icon border border-2 mb-2" src={`${process.env.PUBLIC_URL}/assets/img/users/user-default.jpg`} alt="User Icon" height={200} width={200}/>
                      <h2 className="heading-md">Welcome, {user.full_name}!</h2>
                      <h4 className="desc-md"> Email: <a href={`mailto:${user.email}`}>{user.email}</a> </h4>
                      {/* <button className="btn btn-primary" onClick={handleLogout}>Logout</button> */}
                    </div>
                  ) : (
                    <div>
                      <p>No user data found. Please log in.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
