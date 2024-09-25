import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const MyAccount = () => {
  let { pathname } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedUser'));
    if (userData) {
      setUser(userData);
    }
  }, []);

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

        <div className="myaccount-area pb-80 pt-100 text-center">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper justify-content-center">
                  {user ? (
                    <div>
                      <h2>Welcome, {user.full_name}</h2>
                      <h4>Email: {user.email}</h4>
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
