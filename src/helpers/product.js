// get products
export const getProducts = (data, category, type, limit) => {
  // Check if data is an object with a products property
  const products = Array.isArray(data) ? data : (data && Array.isArray(data.products) ? data.products : []);

  if (!Array.isArray(products)) {
    console.error('Expected products to be an array, but received:', products);
    return [];
  }

  const finalProducts = category
    ? products.filter(
        product => product.category && product.category.includes(category)
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter(single => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => b.saleCount - a.saleCount)
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(single => single.discount && single.discount > 0);
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};


// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItemsObject, product, color, size) => {
  // Fallback to an empty array if cartItemsObject is not an array or not initialized
  const cartItems = Array.isArray(cartItemsObject?.cartItems) ? cartItemsObject.cartItems : [];

  let productInCart = cartItems.find(
    single =>
      single.id === product.id &&
      (single.selectedProductColor ? single.selectedProductColor === color : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  );

  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.find(
        single =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )?.quantity || 0; // Add safe navigation and fallback
    } else {
      return cartItems.find(single => product.id === single.id)?.quantity || 0; // Add safe navigation and fallback
    }
  } else {
    return 0;
  }
};



export const cartItemStock = (cartItem, color) => {
  if (!cartItem || !cartItem.Product || !cartItem.Product.variants) {
    return 0;
  }

  // Filter the variants array to find the stock for the given color
  const variant = cartItem.Product.variants.find(
    (v) => v.color === color
  );

  // If the variant exists, return its stock, otherwise return 0
  return variant ? variant.stock : 0;
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (!Array.isArray(products)) {
    console.error('Expected products to be an array, but received:', products);
    return [];
  }
  
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        product => product.category.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        product => product.tag.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(single => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(
            single => single.size.filter(single => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = array => {
  let individualItemArray = array.filter(function(v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = products => {
  let productCategories = [];
  products &&
    products.map(product => {
      return (
        product.category &&
        product.category.map(single => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = products => {
  let productTags = [];
  products &&
    products.map(product => {
      return (
        product.tag &&
        product.tag.map(single => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = products => {
  let productColors = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = products => {
  let productSizes = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return single.size.map(single => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = product => {
  let productSizes = [];
  product.variation &&
    product.variation.map(singleVariation => {
      return (
        singleVariation.size &&
        singleVariation.size.map(singleSize => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  if (!e || !e.target) return;  // Ensure e and e.target are defined

  const buttons = document.querySelectorAll(".sidebar-widget button");

  buttons.forEach((button) => {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
  });

  // Ensure e.target is valid before using classList
  if (e.target && e.target.classList) {
    e.target.classList.add("active");
  }
};


export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};


// Function to validate token (for example, a JWT token)
export const isTokenValid = (token) => {
  if (!token) return false;

  // For JWT tokens, check if it's expired
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiration = payload.exp * 1000; // Convert to milliseconds
  return Date.now() < expiration;
};

export const filterTagsByProductId = (tags, productId) => {
  // Filter tags by product_id
  const filteredTags = tags.filter(tag => {
    const productIds = tag.product_id.split(',').map(id => id.trim());
    return productIds.includes(productId.toString());
  });

  // Group tags by id and get the latest updated_at entry
  const latestTagsMap = filteredTags.reduce((acc, tag) => {
    if (!acc[tag.id] || new Date(tag.updated_at) > new Date(acc[tag.id].updated_at)) {
      acc[tag.id] = tag; // Keep the tag with the latest updated_at
    }
    return acc;
  }, {});

  // Return an array of the latest tags
  return Object.values(latestTagsMap);
};
