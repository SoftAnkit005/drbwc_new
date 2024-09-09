import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";
import galleryData from "../../data/gallery/galleryData.json";
import GallerySingle from "../../components/gallery/GallerySingle";

const GalleryOne = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("gallery", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        {/* section title */}
        <h3 className="page-heading text-uppercase mb-2">Gallery</h3>
        <h3 className="desc-lg text-muted text-center mb-4">Bhanusali Wellness is a proficient company that provides state-of-the-art massages accessories for its users.</h3>

        <div className="row">
          {galleryData?.map((single, key) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={key}>
              <GallerySingle
                data={single}
                spaceBottomClass="mb-30"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

GalleryOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default GalleryOne;
