import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { IoIosCopy } from 'react-icons/io';
import { Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';

function CouponDescModal({ offer, code, description }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        cogoToast.success('Copied to clipboard!');
    })
    .catch((err) => {
        cogoToast.success('Failed to copy code: ', err);
    });
  };

  return (
    <>
      <span className="more-modal text-danger desc-sm" onClick={handleShow}>more</span>

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
