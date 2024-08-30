import PropTypes from "prop-types";
import clsx from "clsx";

const PrivacyPolicyText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("terms-and-condition", spaceTopClass, spaceBottomClass)}>
      <div className="container px-5">
          <h3 className="page-heading mb-5 text-uppercase">privacy policy</h3>

          <h3 className="heading-xs">Privacy Policy for Bhanusali Wellness Care</h3>
          <p className="desc-sm text-muted">
            At Bhanusali Wellness, accessible from https://drbwc.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Bhanusali Wellness and how we use it.<br/>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.<br/>
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Bhanusali Wellness. This policy is not applicable to any information collected offline or via channels other than this website.
          </p>
          <hr/>

          <h3 className="heading-xs">Consent</h3>
          <p className="desc-sm text-muted">
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
          <hr/>

          <h3 className="heading-xs">Information we collect</h3>
          <p className="desc-sm text-muted">
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.<br/>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.<br/>
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.<br/>    
          </p>
          <hr/>

          <h3 className="heading-xs">How we use your information</h3>
          <p className="desc-sm text-muted">
            We use the information we collect in various ways, including to:
            <ul className="ms-3">
              <li>- Provide, operate, and maintain our website</li>
              <li>- Improve, personalize, and expand our website</li>
              <li>- Understand and analyze how you use our website</li>
              <li>- Develop new products, services, features, and functionality</li>
              <li>- Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes </li>
              <li>- Send you emails</li>
              <li>- Find and prevent fraud</li>
            </ul>
          </p>

          <hr/>
          <h3 className="heading-xs">Log Files</h3>
          <p className="desc-sm text-muted"> Bhanusali Wellness follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information. </p>
          
          <hr/>
          <h3 className="heading-xs">Advertising Partners Privacy Policies</h3>
          <p className="desc-sm text-muted">
            You may consult this list to find the Privacy Policy for each of the advertising partners of Bhanusali Wellness.<br/>
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Bhanusali Wellness, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.<br/>
            Note that Bhanusali Wellness has no access to or control over these cookies that are used by third-party advertisers.<br/>
          </p>

          <hr/>
          <h3 className="heading-xs">Third Party Privacy Policies</h3>
          <p className="desc-sm text-muted">
            Bhanusali Wellness’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.<br/>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.
          </p>
          
          <hr/>
          <h3 className="heading-xs">CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
          <p className="desc-sm text-muted">
            Under the CCPA, among other rights, California consumers have the right to:<br/>
            Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.<br/>
            Request that a business delete any personal data about the consumer that a business has collected.<br/>
            Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.<br/>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.<br/>
          </p>

          <hr/>
          <h3 className="heading-xs">GDPR Data Protection Rights</h3>
          <p className="desc-sm text-muted">
            CCPA Privacy Rights (Do Not Sell My Personal Information)<br/>
            The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.<br/>
            The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete<br/>
            The information you believe is incomplete.<br/>
            The right to erasure – You have the right to request that we erase your personal data, under certain conditions.<br/>
            The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.<br/>
            The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.<br/>
            The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.<br/>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.<br/>
          </p>

          <hr/>
          <h3 className="heading-xs">Children’s Information</h3>
          <p className="desc-sm text-muted">
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.<br/>
            Bhanusali Wellness does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.<br/>
          </p>
      </div>
    </div>
  );
};

PrivacyPolicyText.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default PrivacyPolicyText;
