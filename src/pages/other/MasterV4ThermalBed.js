import { Fragment } from "react"; 
import { useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const MasterV4ThermalBed = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO titleTemplate="Advance Master V4 Thermal Heating Bed" description="Advance Master V4 Thermal Heating Bed page of DrBWC" /> 
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb pages={[ {label: "Home", path: process.env.PUBLIC_URL + "/" }, {label: "Advance Master V4 Thermal Heating Bed", path: process.env.PUBLIC_URL + pathname } ]} />
        
        <section className="automatic-thermal-massage-bed-page">
            <div className="product-banner">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="products-img">
                        <img className="member-img" src="assets/img/product/drbwc_images/massage_bed.png" alt="massage_bed" />
                    </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="products-info">
                        <h2 className="products-feature"> Advanced Master V4 Gold By Dr.BWC </h2>
                        <h3 className="products-title">AUTOMATIC THERMAL MASSAGE BED</h3>
                        <p className="product-desc"> Automatic Jade Stone Thermal Heating Bed. </p>
                        <div className="mt-3">
                            <button type="button" className="btn btn-primary"> Buy Now </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="container py-5">
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="products-info">
                        <h3 className="heading-lg text-uppercase lh-sm"> How is Dr.BWC's Advanced Master V4 Bed?​ </h3>
                        <p className="desc-md mb-3"> Spine is the central organ of the human body that protects the spinal cord, which connects our nerves. Dr. BWC Master V4 is a thermal device that provides intensive heat and pressure stimulation to the spine and gives a personalised thermal massage experience. </p>
                    </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="products-img">
                        <video autoPlay loop muted className="w-100 h-100 object-fit-cover rounded-1" >
                            <source src="assets/videos/thermal_massage_bed.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    </div>
                </div>
            </div>
            <div className="product-experience">
                <div className="container">
                <div className="products-info">
                    <h3 className="page-heading text-uppercase text-white text-center lh-sm"> Let’s experience Dr. BWC Master V4 Spine Thermal Device </h3>
                    <hr className="hr-line bg-white text-white" />
                    <p className="heading-xs text-center text-white"> For 40 minutes a day. It works like a charm for: </p>
                </div>
                <div className="row my-5">
                    <div className="col-md-6 col-lg-3 position-relative">
                        <div className="overflow-hidden my-3 rounded-1">
                            <img className="member-img" src="assets/img/product/drbwc_images/office_employee.jpg" alt="office employee" />
                            <h5 className="position-absolute desc-md text-white text-center w-100 py-4 bottom-0"> Office Employee </h5>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 position-relative">
                        <div className="overflow-hidden my-3 rounded-1">
                            <img className="member-img" src="assets/img/product/drbwc_images/home_maker.jpg" alt="home maker" />
                            <h5 className="position-absolute desc-md text-white text-center w-100 py-4 bottom-0"> Home Makers </h5>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 position-relative">
                        <div className="overflow-hidden my-3 rounded-1">
                            <img className="member-img" src="assets/img/product/drbwc_images/student.jpg" alt="student" />
                            <h5 className="position-absolute desc-md text-white text-center w-100 py-4 bottom-0"> Students </h5>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 position-relative">
                        <div className="overflow-hidden my-3 rounded-1">
                            <img className="member-img" src="assets/img/product/drbwc_images/parents.jpg" alt="parents" />
                            <h5 className="position-absolute desc-md text-white text-center w-100 py-4 bottom-0"> Parents </h5>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="product-benefits">
                <div className="container">
                    <div className="products-info">
                        <h3 className="page-heading lh-sm text-center m-auto"> 5 Benefits of Dr. BWC Master V4​ </h3>
                        <hr className="hr-line bg-black" />
                    </div>
                    <div className="row align-items-center my-2">
                        <div className="col-12 col-sm-12 col-lg-6 my-3">
                            <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="d-flex align-items-center">
                                    <img height="130px" width="130px" className="member-img" src="assets/img/product/drbwc_images/master_V4_benefits_1.png" alt="master V4 benefits 1" />
                                    <p className="fs-4 my-4 px-5 fw-medium"> User's Body Type Customized Function </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="d-flex align-items-center">
                                    <img height="130px" width="130px" className="member-img" src="assets/img/product/drbwc_images/master_V4_benefits_2.png" alt="master V4 benefits 1" />
                                    <p className="fs-4 my-4 px-5 fw-medium"> 6 - Levels of Intensity Control </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="d-flex align-items-center">
                                    <img height="130px" width="130px" className="member-img" src="assets/img/product/drbwc_images/master_V4_benefits_3.png" alt="master V4 benefits 1" />
                                    <p className="fs-4 my-4 px-5 fw-medium"> 18 + 02 Massage Programs </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="d-flex align-items-center">
                                    <img height="130px" width="130px" className="member-img" src="assets/img/product/drbwc_images/master_V4_benefits_4.png" alt="master V4 benefits 1" />
                                    <p className="fs-4 my-4 px-5 fw-medium">Mediattion Music</p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="d-flex align-items-center">
                                    <img height="130px" width="130px" className="member-img" src="assets/img/product/drbwc_images/master_V4_benefits_5.png" alt="master V4 benefits 1" />
                                    <p className="fs-4 my-4 px-5 fw-medium">Smart Sliding Design</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-6 my-3">
                            <video autoPlay loop muted className="w-100 h-100 object-fit-cover rounded-1" >
                                <source src="assets/videos/thermal_massage_bed.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            <div className="spine-scanning">
                <div className="container">
                    <div className="products-info">
                        <h2 className="products-feature text-center"> Automatic Setting of Spinal Pressure Stimulation Section </h2>
                        <h3 className="products-title text-uppercase text-center m-auto position-relative"> Customised Spine Scanning </h3>
                        <hr className="hr-line bg-white text-white" />
                        <p className="product-desc text-white text-center my-4"> As every individual has distinctive height, the length of their spine likewise varies. When you lie down on the Dr. BWC Master V4, it analyses the user’s body type automatically and provides you with an effective spine thermal massage with a customized spine scanning function for each body type. </p>
                        <img className="spine-scanning-img m-auto rounded-1" src="assets/img/product/drbwc_images/spine_scanning.png" alt="office employee" />
                    </div>
                </div>
            </div>
            <div className="intensity-control">
                <div className="container">
                    <div className="products-info">
                        <h2 className="products-feature text-dark text-center"> The choice is yours! </h2>
                        <h3 className="products-title text-uppercase text-center text-dark"> Intensity Control and Massage Programs </h3>
                        <hr className="hr-line bg-black" />
                        <p className="product-desc text-dark text-center my-4"> Automatic Thermal Massage Bed have 6 Levels &amp; 20 Automatic Programs Options </p>
                        
                        <div className="row">
                            <div className="col-12 col-sm-12 col-lg-6 my-3">
                                <h3 className="products-title text-uppercase lh-sm text-dark"> 20 Specialised Massage Programs </h3>
                                <hr className="hr-line bg-black ms-0" />
                                <p className="product-desc text-dark my-4"> It presses the spinal region [cervical vertebrae], [back of head vertebrae], [waist vertebrae] and pelvis, etc. </p>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 my-3">
                                <img className="spine-scanning-img m-auto rounded-1" src="assets/img/product/drbwc_images/massage_program.png" alt="massage_program" />
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 my-3 mt-5">
                                <video autoPlay loop muted className="w-100 h-100 object-fit-cover rounded-1" >
                                    <source src="assets/videos/thermal_massage_bed.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 my-3 mt-5">
                                <h3 className="products-title text-uppercase lh-sm text-dark"> 6 Levels of Intensity Control </h3>
                                <hr className="hr-line bg-black ms-0" />
                                <p className="product-desc text-dark my-4"> It presses the spinal region [cervical vertebrae], [back of head vertebrae], [waist vertebrae] and pelvis, etc. </p>
                            </div>
                            <div className="products-info">
                                <h3 className="products-title text-uppercase lh-sm text-dark mt-5"> Meditation Music </h3>
                                <hr className="hr-line w-50 bg-black ms-0" />
                                <p className="heading-md lh-sm text-muted my-1">Relax and Let Your Mind Rest</p>
                                <p className="product-desc text-dark"> A music therapy that combines a selection of 10 natural sounds like classic, functional, and natural that keeps our mind at rest. In addition, the user can add up to 100 sounds. </p>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 my-3 mt-5">
                                <img className="spine-scanning-img m-auto rounded-1" src="assets/img/product/drbwc_images/hardware_configuration.gif" alt="massage_program" />
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 my-3 mt-5 d-flex flex-column align-items-start justify-content-center">
                                <h3 className="products-heading text-dark text-uppercase pb-3"> 6 Levels of Intensity Control </h3>
                                <hr className="hr-line bg-black ms-0 my-4" />
                                <p className="heading-md text-muted my-1 lh-sm"> 2-Way Speaker, An Earphone Jack, MP3 Remote Control (multipurpose), and SD Card (8GB) </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="smart-sliding">
                <div className="container">
                    <div className="products-info">
                        <h2 className="products-feature text-dark text-center"> Ensure a Healthy Space for Your Family </h2>
                        <h3 className="products-title text-dark text-uppercase text-center m-auto"> Efficient Space Usage, Smart Sliding Design </h3>
                        <hr className="hr-line bg-black" />
                        <p className="heading-sm lh-sm text-center my-4"> Dr. BWC Master V4 gives a new resting place for family, with the sliding feature on its underbelly that turns into a sofa when slid in. It provides excellent space utilisation, creating a sophisticated and refined sense of modern design that matches any interior such as living room, or bedroom. </p>
                        
                        <div className="row my-5">
                            <video autoPlay loop muted className="w-100 h-100 object-fit-cover rounded-1" >
                                <source src="assets/videos/thermal_massage_bed.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="col-12 col-sm-12 col-lg-6 my-3 mt-5">
                                <h3 className="products-title text-dark w-100 text-uppercase pb-3"> 3 ball / 9 ball External Projector </h3>
                                <hr className="hr-line bg-black ms-0" />
                                <p className="font-16 my-4"> These two external projectors can be used conveniently at the problematic part in the body. It efficiently utilises time to ensure the other family members waiting-in-line can use the thermal projector for their needs. </p>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 my-3 mt-5">
                                <video autoPlay loop muted className="w-100 h-100 object-fit-cover rounded-1" >
                                    <source src="assets/videos/thermal_massage_bed.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

      </LayoutOne>
    </Fragment>
  );
};

export default MasterV4ThermalBed;
