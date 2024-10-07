import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OrderStatusModal({ ordersData }) {
  const currentStatus = ordersData?.status || 'pending';
  
  const statusOptions = [
    { value: 'pending', label: 'Pending', defaultDescription: 'Order is pending.' },
    { value: 'confirmed', label: 'Confirmed', defaultDescription: 'Order is confirmed.' },
    { value: 'awaiting-pickup', label: 'Awaiting pickup', defaultDescription: 'Waiting for pickup.' },
    { value: 'shipped', label: 'Shipped', defaultDescription: 'Shipment is in transit.' },
    { value: 'delivered', label: 'Delivered', defaultDescription: 'Shipment delivered to the destination.' },
    // { value: 'completed', label: 'Completed', defaultDescription: 'Order process completed.' }
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='mb-2' variant="primary" size='sm' onClick={handleShow}>
        Track Package
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delivery Status: {ordersData?.status}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-2'>
          <div className="timeline">
            <div className="line">
              <div className="line-content">
                {statusOptions.map((status) => {
                  // Dynamically check comments for the current status, or use default if none
                  const description = currentStatus === status.value 
                    ? ordersData?.comments || status.defaultDescription 
                    : status.defaultDescription;

                  return (
                    <div key={status.value} className={`content ${currentStatus === status.value ? 'active' : ''}`}>
                      <h6 className='desc-md fw-semibold'>{status.label}</h6>
                      <p className='text-muted desc-xxs'>{description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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

export default OrderStatusModal;
