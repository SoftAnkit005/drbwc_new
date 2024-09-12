import PropTypes from "prop-types";
import clsx from "clsx";

const FooterCopyright = ({ spaceBottomClass, colorClass }) => {
  return (
    <div className={clsx("copyright py-2", colorClass)}>
      <p className="text-center">Copyright @ 2024 Dr.BWC | Designed By <a className="" target="_blank" href="https://softieons.com/" alt="softieons team">Softieons</a></p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
