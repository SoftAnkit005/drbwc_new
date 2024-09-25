import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart } from "../../store/slices/cart-slice";
import { updateWishlist } from "../../store/slices/wishlist-slice";
import cogoToast from "cogo-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const [allWishlist, setAllWishlist] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (wishlistItems) {
      setAllWishlist(wishlistItems);
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (products?.success && Array.isArray(products.products)) {
      setProductsData(products.products);
    } else {
      console.log("No products found or products fetching failed.", products);
    }
  }, [products]);

  const [sortedWishlists, setSortedWishlists] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredProducts = productsData.filter(product => 
        allWishlist.some(wishlistItem => wishlistItem.product_id === product.id)
      );
      setSortedWishlists(filteredProducts);
    }
  }, [productsData, allWishlist]);

  const handleRemoveWishlist = (product_id, user_id) => {
    // Dispatch the action to update the wishlist
    dispatch(updateWishlist({ product_id, user_id }))
    .then(() => {
      // Remove the product from allWishlist state
      const updatedWishlist = allWishlist.filter(wishlistItem => wishlistItem.product_id !== product_id);
      setAllWishlist(updatedWishlist);

      // Update sortedWishlists
      const updatedSortedWishlists = sortedWishlists.filter(wishlistItem => wishlistItem.id !== product_id);
      setSortedWishlists(updatedSortedWishlists);
    });
  };

  const handleCart = (product_id, product_name) => {
    dispatch(addToCart({ product_id, quantity: 1, color: 'Default', }))
    cogoToast.success(
      <div>
        <div><span className='fw-semibold'>{product_name}</span> added to <span className='fw-semibold'>cart.</span></div>
      </div>,
      {
        position: 'top-right'
      }
    );
  }

  return (
    <Fragment>
      <SEO titleTemplate="Wishlist" description="Wishlist page of Dr BWC." />
      <LayoutOne headerTop="visible">
        <Breadcrumb 
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Wishlist", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="cart-main-area pt-50 pb-50">
          <div className="container">
            {allWishlist && allWishlist.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Add To Cart</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedWishlists.map((wishlistItem, key) => {
                            const cartItem = cartItems.find(item => item.id === wishlistItem.id);
                            const productImages = JSON.parse(wishlistItem.image_urls);

                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + wishlistItem.id}>
                                    <img className="img-fluid" src={apiUrl + '/' + productImages[0]} alt={wishlistItem.name} />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + wishlistItem.id}> {wishlistItem.product_name} </Link>
                                </td>

                                <td className="product-price-cart">
                                  <span className="amount">₹{wishlistItem.price}</span>
                                </td>

                                {console.log('wishlistItem', wishlistItem)}
                                <td className="product-wishlist-cart">
                                  {wishlistItem.qty && wishlistItem.qty > 0 ? (
                                    <button onClick={() => handleCart(wishlistItem.id, wishlistItem.product_name)} className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""} disabled={cartItem !== undefined && cartItem.quantity > 0} title={wishlistItem !== undefined ? "Added to cart" : "Add to cart"}>
                                      {cartItem !== undefined && cartItem.quantity > 0 ? "Added" : "Add to cart"}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      Out of stock
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => handleRemoveWishlist(wishlistItem.id, user.id)}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/"}> Continue Shopping </Link>
                      </div>
                      {/* <div className="cart-clear">
                        <button> Clear Wishlist </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Add Items
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Wishlist;
