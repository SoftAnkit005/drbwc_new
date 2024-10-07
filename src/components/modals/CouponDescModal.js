import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import cogoToast from 'cogo-toast';
import { LiaAngleRightSolid } from "react-icons/lia";

function CouponDescModal({ offer, code, description }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code)
        .then(() => {
          cogoToast.success('Coupon Copied!', { position: 'top-right'});
        })
        .catch((err) => {
          cogoToast.error('Failed to copy code: ', err, { position: 'top-right'});
        });
    } else {
      // Fallback: Select and copy manually
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        cogoToast.success('Coupon Copied!', { position: 'top-right'});
      } catch (err) {
        cogoToast.error('Failed to copy code: ', err, { position: 'top-right'});
      }
      document.body.removeChild(textArea);
    }
  };
  

  return (
    <>
      <span className="more-modal text-cyan desc-xs cursor-pointer" onClick={handleShow}>Coupon Code<LiaAngleRightSolid className='small'/> </span>

      <Modal show={show} size="md" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-theme-red'>{offer}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='py-2'>
          <p>{description}</p>
          <p className='badge-coupon cursor-copy' onClick={copyToClipboard}>
            {code}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CouponDescModal.propTypes = {
  offer: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CouponDescModal;
