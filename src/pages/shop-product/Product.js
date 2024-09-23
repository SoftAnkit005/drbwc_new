import React, { Fragment, useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const [productsData, setProductsData] = useState([]);
  const [relatedProducts, setrelatedProducts] = useState([])

  console.log('products:', products.products);

  useEffect(() => {
    if (products?.success) {
      setProductsData(products.products);
      console.log('productsData:', products.products);
    } else {
      console.log("No products found or products fetching failed.");  // Debugging
    }
  }, [products]);

  // Convert id to string for comparison
  const product = productsData.find(product => product.id.toString() === id.toString());
  // Ensure useEffect runs unconditionally, but only filters related products if product is valid
  useEffect(() => {
    if (product) {
      let relProducts = products.products?.filter(item => item.category_id === product.category_id && item.id !== product.id);
      setrelatedProducts(relProducts);
    }
  }, [product, products]);

  if (!product) {
    return <div>Video not found</div>;
  }
  
  // useEffect(() => {
  //   let relatedProducts = products?.filter(item => item.category_id === product.category_id)
  //   console.log(relatedProducts);
  // }, [product])
  
  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of Dr BWC."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-50"
          spaceBottomClass="pb-50"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product?.product_description}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceTopClass="pt-50"
          spaceBottomClass="pb-50"
          products={relatedProducts}
          category={product?.category_id.toString()}  // Convert category_id to string
        />
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
