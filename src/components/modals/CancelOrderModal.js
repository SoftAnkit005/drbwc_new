import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import cogoToast from 'cogo-toast';
import { updateOrderStatus } from '../../store/slices/user-order-slice';

function CancelOrderModal({ ordersData }) {
  const dispatch = useDispatch();

  // Cancelation reasons dropdown options
  const cancelationReasons = [
    { value: 'wrong-item', label: 'Merchant shipped the wrong item' },
    { value: 'not-required', label: 'Product is not required anymore' },
    { value: 'damaged-product', label: 'Damaged or defective product' },
    { value: 'different-size-color', label: 'Need different size or color' },
  ];

  // Modal state
  const [show, setShow] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [validationError, setValidationError] = useState(false); // Track validation

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSelectedReason(''); // Reset selected reason when modal is shown
    setValidationError(false); // Clear validation error when modal is opened
    setShow(true);
  };

  console.log('selectedReason:', selectedReason);

  // Handle cancel order form submission
  const handleCancelOrder = () => {
    if (selectedReason) {
      const orderId = ordersData.id;
      const status = 'canceled';
      const comments = selectedReason;

      dispatch(updateOrderStatus({ orderId, status, comments }))
      .then((result) => {
        cogoToast.success('Order canceled successfully!', { position: 'top-right' });
      }).catch((err) => {
        cogoToast.error('Failed to cancel order. Please try again.', { position: 'top-right' });
      });

      handleClose();
    } else {
      setValidationError(true); // Trigger validation error if no reason is selected
    }
  };

  return (
    <>
      <Button className='ms-2' variant="danger" onClick={handleShow}>
        Cancel Order
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cancelReason">
              <Form.Label>Select Cancelation Reason</Form.Label>
              <Form.Control 
                as="select" 
                value={selectedReason} 
                onChange={(e) => {
                  setSelectedReason(e.target.value); 
                  setValidationError(false); // Clear validation error on selection
                }} 
                isInvalid={validationError} // Set invalid state if validation fails
              >
                <option value="">-- Select a reason --</option>
                {cancelationReasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </Form.Control>
              {validationError && (
                <Form.Text className="text-danger">
                  Please select a cancellation reason.
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancelOrder}>
            Confirm Cancelation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CancelOrderModal;
