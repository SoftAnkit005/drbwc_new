import PropTypes from "prop-types";
import clsx from "clsx";
import ProductgridList from "./ProductgridList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ShopProducts = ({ products, layout }) => {
  const [activeProducts, setactiveProducts] = useState([])
  useEffect(() => {
    const activePrd = products.filter(product => product.status === 'active')
    setactiveProducts(activePrd);
  }, [products])
  
  console.log('products:', products);
  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        {activeProducts?.length !== 0 ?
          <ProductgridList products={activeProducts} spaceBottomClass="mb-25" />
          :
          <div className="container text-center mt-4">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Product Not Found</h4>
              <p>
                Sorry, the product you're looking for does not exist or is currently unavailable.
              </p>
              <hr />
              <p className="mb-0">
                Please check the product ID or <Link to="/">return to the homepage</Link>.
              </p>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;
