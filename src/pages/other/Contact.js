import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";
import { TbTruckDelivery } from "react-icons/tb";
import emailjs from "emailjs-com"; // Import EmailJS

const Contact = () => {
  let { pathname } = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    // Simple validation
    if (!name || !email || !phone || !subject || !message) {
      setError("All fields are required.");
      return;
    }

    setLoading(true); // Show loading while submitting

    // Send email using EmailJS
    emailjs
      .send(
        "service_bgxir6f", // Replace with your EmailJS service ID
        "template_dufcl98", // Replace with your EmailJS template ID
        formData,
        "3tHf_9ngsWrvBvLGK", // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted(true);
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
          setError("");
        },
        (error) => {
          console.error(error.text);
          setError("Failed to send the message. Please try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      <SEO titleTemplate="Contact" description="Contact page of Dr BWC." />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Contact", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="contact-area pt-20 pb-100">
          <div className="container">
            <div className="custom-row-2 mb-10">
              <div className="col-12 col-lg-6">
                <div className="contact-info-wrap">
                  <h3>about bhanusali wellness care</h3>
                  <p className="desc-sm">
                    DR.BWC is established in 2000 and has continued to grow and expand into
                    India’s leading massage brands. Dr. BWC, The Brand represents value for money
                    and strives for customers around the pan India. Network with the best massage
                    experience at affordable prices.
                  </p>
                  <hr />
                  <div className="single-contact-info">
                    <div className="contact-icon"> <i className="fa fa-phone" /> </div>
                    <div className="contact-info-dec">
                      <p>Phone</p>
                      <p><a href="callto:18004195973">+91 9825735973</a></p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon"> <i className="fa fa-globe" /> </div>
                    <div className="contact-info-dec">
                      <p>Email</p>
                      <p><a href="mailto:info@DrBWC.com">info@DrBWC.com</a></p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon"> <i className="fa fa-map-marker" /> </div>
                    <div className="contact-info-dec">
                      <p>Address</p>
                      <p>VIP road, Vesu Surat, Gujarat - 395007, India</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <TbTruckDelivery className="p-2" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Free Delivery</p>
                    </div>
                  </div>
                  <hr />
                  <p className="desc-sm">
                    Do you have questions about how we can help your company?{" "}
                    <span className="fw-bold">Send us an email and we’ll get in touch shortly.</span>
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Name*" type="text" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" type="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="col-lg-6">
                        <input name="phone" placeholder="Phone*" type="tel" value={formData.phone} onChange={handleChange} required />
                      </div>
                      <div className="col-lg-6">
                        <input name="subject" placeholder="Subject*" type="text" value={formData.subject} onChange={handleChange} required />
                      </div>
                      <div className="col-lg-12">
                        <textarea name="message" placeholder="Your Message*" value={formData.message} onChange={handleChange} required />
                        <button className="submit btn-primary" type="submit" disabled={loading}>
                          {loading ? "Submitting..." : "ASK A QUESTION"}
                        </button>
                      </div>
                    </div>
                  </form>
                  {submitted && <><p className="form-message mt-2 mb-0 text-success">Thank You..</p><p className="form-message text-success">Your inquiry has been submitted, we'll contact you shortly!</p></>}
                  {error && <p className="form-message" style={{ color: "red" }}>{error}</p>}
                </div>
              </div>
            </div>
            <div className="contact-map">
              <GoogleMap lat={21.139730} lng={72.771550} />
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
