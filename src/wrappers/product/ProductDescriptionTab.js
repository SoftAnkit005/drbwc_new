import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc }) => {
  const table = document.querySelector('.productDescription'); // or use the specific selector based on your setup
  if (table) {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          cells.forEach(cell => {
              const div = document.createElement('div');
              div.className = 'grid-item';
              div.innerHTML = cell.innerHTML; // Copy content from the cell
              table.parentNode.insertBefore(div, table); // Insert the div before the table
          });
          row.remove(); // Remove the original row
      });
  }

  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="px-3 px-md-5">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar justify-content-start">
              <Nav.Item>
                <Nav.Link eventKey="productDescription" className="ms-0">Description</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews(2)</Nav.Link>
              </Nav.Item> */}
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="productDescription">
                <div dangerouslySetInnerHTML={{ __html: productFullDesc }} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default ProductDescriptionTab;
