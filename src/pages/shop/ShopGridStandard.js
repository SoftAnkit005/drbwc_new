import { Fragment, useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getSortedProducts } from '../../helpers/product';
import SEO from "../../components/seo";
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';

const ShopGridStandard = () => {
    const [layout, setLayout] = useState('grid two-column');
    const [sortType, setSortType] = useState('all');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const { products } = useSelector((state) => state.product);
    const [categoryId, setcategoryId] = useState();
    const location = useLocation();



    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryId = queryParams.get('id');
        setcategoryId(categoryId);
    }, [location.search]);

    const pageLimit = 15;

    let { pathname } = useLocation();

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    };

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        if(sortType !== 'all') {
            let categorizedData = sortedProducts.filter(product => product.subcategory_id === sortValue);
            setCurrentData(categorizedData.slice(offset, offset + pageLimit));
        } else {
            // let sortedProducts = getSortedProducts(products.products, sortType, sortValue);
            let sortedProducts = products.products?.filter(product => product.category_id === Number(categoryId));
            const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
            sortedProducts = filterSortedProducts;
            setSortedProducts(sortedProducts);
            setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
        }
    }, [offset, products, filterSortType, filterSortValue, categoryId, sortType]);

    return (
        <Fragment>
            <SEO titleTemplate="Shop Page" description="Shop page of DrBWC." />

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Shop", path: process.env.PUBLIC_URL + pathname }
                    ]}
                />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-1 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar products={[]} getSortParams={getSortParams} sideSpaceClass="mr-30" />
                            </div>
                            <div className="col-lg-9 order-2 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}


export default ShopGridStandard;