import PropTypes from "prop-types";
import clsx from "clsx";

const TextGridOne = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("about-drbwc", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
              <img className="w-100 px-5 d-none d-lg-block" src="assets/img/product/drbwc_images/about_img.png" alt="About" />
              <img className="w-100 p-5" src="assets/img/product/drbwc_images/about.png" alt="About" />
          </div>
          <div className="col-lg-6">
              <h3 className="page-heading text-uppercase text-start">about Dr.BWC</h3>
              <p className="desc-sm">Dr. BWC: Revolutionizing Relaxation with Automated Innovation</p>
              <p className="desc-sm">In the realm of relaxation and wellness, one name stands out as a beacon of innovation and quality—Dr. BWC. Pioneering the manufacturing of customized fully automatic robotic zero gravity massage chairs, Dr. BWC has carved a niche for itself by blending cutting-edge technology with the age-old need for relaxation and comfort. Spanning across the vast expanse of India, our mission is to provide the best products and services, ensuring that every individual can experience unparalleled relaxation through automation.</p>
              <p className="desc-sm">Our journey began with a simple yet profound vision: to transform the way people experience relaxation. In a world where stress and fatigue have become commonplace, Dr. BWC recognized the need for advanced solutions that not only alleviate physical strain but also promote overall well-being. Thus, we embarked on a path of relentless innovation, setting new standards in the wellness industry with our state-of-the-art massage chairs.</p>
              <p className="desc-sm">What sets Dr. BWC apart is our unwavering commitment to customization. We understand that every individual has unique needs and preferences when it comes to relaxation. Our fully automatic robotic zero gravity massage chairs are designed with this in mind, offering a personalized experience that caters to your specific requirements. Whether you seek relief from chronic pain, a moment of tranquility after a long day, or simply a luxurious indulgence, our massage chairs are tailored to meet your needs.</p>
              <p className="desc-sm">At the heart of our product line is the zero gravity feature, inspired by NASA’s space exploration technology. This innovative design elevates your legs above your heart, mimicking the posture astronauts adopt during space missions. This position not only reduces the strain on your spine and joints but also enhances blood circulation, allowing you to experience the ultimate in relaxation and comfort. Combined with our advanced robotic technology, our massage chairs deliver precise and effective massages that rejuvenate your body and mind.</p>
              <p className="desc-sm">Dr. BWC’s commitment to excellence extends beyond our products. We pride ourselves on delivering exceptional customer service, ensuring that your experience with us is seamless and satisfying. Our team of experts is dedicated to guiding you through every step of your journey, from selecting the perfect massage chair to providing after-sales support. We believe that true relaxation comes from not only a superior product but also from knowing that you are in good hands.</p>
              <p className="desc-sm">Our range of massage products is designed to cater to a diverse clientele, offering something for everyone. From compact models for those with limited space to luxurious chairs with an array of features, Dr. BWC ensures that you find the perfect match for your needs. Our products are crafted with the finest materials and incorporate the latest technological advancements, making us a trusted name in the wellness industry.</p>
              <p className="desc-sm">As we continue to grow and innovate, our core mission remains the same: to provide relaxation with automation to everyone. We envision a future where every household in India can experience the benefits of our massage chairs, enhancing their quality of life and well-being. Dr. BWC is more than a brand; it is a promise of comfort, innovation, and excellence.</p>
              <p className="desc-sm">Join us on this journey and discover the unparalleled joy of relaxation with Dr. BWC. Because when it comes to your well-being, you deserve nothing but the best.</p>
              <p className="desc-sm"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

TextGridOne.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default TextGridOne;
