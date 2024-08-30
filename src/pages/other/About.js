import { Fragment } from "react"; 
import { useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import CustomersSlider from "../../wrappers/customers-slider/CustomersSlider";

const About = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="About us"
        description="About page of DrBWC"
      /> 
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "About us", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* section title with text */}
        {/* <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" /> */}

        {/* text grid */}
        <TextGridOne spaceTopClass="pt-90"/>

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-90"/>

        {/* Customer Slider */}
        <CustomersSlider spaceTopClass="pt-90" spaceBottomClass="pb-90" />

      </LayoutOne>
    </Fragment>
  );
};

export default About;
