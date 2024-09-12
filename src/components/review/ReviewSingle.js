import PropTypes from "prop-types";

const ReviewSingle = ({ data, spaceBottomClass }) => {
  return (
    <>
      <div className="card mx-2">
        <div className="card-body">
          <p className="desc-sm">{data.review}</p>
          <h6 className="desc-sm fw-normal mb-2 text-body-secondary">{data.name}</h6>
        </div>
      </div>
    </>
  );
};

ReviewSingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default ReviewSingle;
