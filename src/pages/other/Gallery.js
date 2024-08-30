import { Fragment } from "react"; 
import { useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GalleryOne from "../../wrappers/gallery/GalleryOne";

const Gallery = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO titleTemplate="Gallery" description="Gallery page of DrBWC" /> 

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb pages={[ {label: "Home", path: process.env.PUBLIC_URL + "/" }, {label: "Gallery", path: process.env.PUBLIC_URL + pathname } ]} />

        {/* team member */}
        <GalleryOne spaceTopClass="pt-90" spaceBottomClass="pb-90"/>
      </LayoutOne>
    </Fragment>
  );
};

export default Gallery;
