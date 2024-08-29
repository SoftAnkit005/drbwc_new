import PropTypes from "prop-types";
import clsx from "clsx"
import whyDrbwcData from "../../data/why-drbwc/whydrbwc.json";


const WhyDrbwc = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div className={clsx("why-drbwc-container", spaceBottomClass, spaceTopClass)}>
      <div className="container row m-auto">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h3 className="text-center text-lg-start page-heading">Why Dr.BWC?</h3>
            <p className="text-center text-lg-start desc-sm">Our goal is to create the highest degree of luxury with the health benefit of our Massage Equipment in your daily life. Set up in India, Dr.BWC has a prominent background and an enriched experience in the massage machine.</p>
          </div>
          <div className="col-lg-6 row m-auto">
          {whyDrbwcData && (
            whyDrbwcData.map((item, key) => (
              <div key={key} className="col-md-6 info">
                <div className="card my-2">
                  <div className="card-body">
                    <p className="card-number">{item.id}</p>
                    <h6 className="card-desc mb-2 text-body-secondary">{item.desc}</h6>
                  </div>
                </div>
              </div>
            ))
          )}
          </div>


      </div>
    </div>
  );
};

WhyDrbwc.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default WhyDrbwc;
