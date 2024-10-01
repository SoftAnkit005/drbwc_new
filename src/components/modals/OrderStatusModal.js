import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OrderStatusModal({ordersData}) {
  console.log('ordersData:', ordersData);
  const currentStatus = ordersData?.status || 'pending';
  const statusOptions = [
    { 
      value: 'pending', 
      label: 'Pending', 
      description: currentStatus === 'pending' ? ordersData?.comments || 'Order is pending.' : 'Order is pending.'
    },
    { 
      value: 'awaiting-pickup', 
      label: 'Awaiting pickup', 
      description: currentStatus === 'awaitingpickup' ? ordersData?.comments || 'Waiting for pickup.' : 'Waiting for pickup.'
    },
    { 
      value: 'pick-up', 
      label: 'Pick Up', 
      description: currentStatus === 'pickup' ? ordersData?.comments || 'Shipment picked up by courier.' : 'Shipment picked up by courier.'
    },
    { 
      value: 'shipped', 
      label: 'Shipped', 
      description: currentStatus === 'shipped' ? ordersData?.comments || 'Shipment is in transit.' : 'Shipment is in transit.'
    },
    { 
      value: 'delivered', 
      label: 'Delivered', 
      description: currentStatus === 'delivered' ? ordersData?.comments || 'Shipment delivered to the destination.' : 'Shipment delivered to the destination.'
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      description: currentStatus === 'completed' ? ordersData?.comments || 'Order process completed.' : 'Order process completed.'
    }
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Button variant="primary" size='sm' onClick={handleShow}>
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
                {statusOptions.map((status) => (
                  <div key={status.value} className={`content ${currentStatus === status.value ? 'active' : ''}`}>
                    <h6 className='desc-md fw-semibold'>{status.label}</h6>
                    <p className='text-muted desc-xxs'>{status.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderStatusModal;