import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Product from 'page/Product/components/Product/Product';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import productApi from 'api/productApi';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from 'page/Product/components/skeleton/Skeleton';
import SkeletonProduct from 'page/Product/components/skeleton/Skeleton';
import ProductSort from 'page/Product/components/Filters/productSort/ProductSort';
import Loading from 'page/Product/components/Loading/Loading';

ListProduct.propTypes = {};

const TRUTH_TABLE = {
  true: true,
  false: false,
};

function ListProduct(props) {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([...Array(12)]);
  const [pagination, setpagination] = useState({
    _page: 1,
    _limit: 12,
    _total: 1,
  });

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isFreeShip: TRUTH_TABLE[params.isFreeShip] || undefined,
      isPromotion: TRUTH_TABLE[params.isPromotion] || undefined,
      category: Number.parseInt(params.category) || undefined,
      salePrice_gte: Number.parseInt(params.salePrice_gte) || undefined,
      salePrice_lte: Number.parseInt(params.salePrice_lte) || undefined,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, pagination } = await productApi.getAll(queryParams);
        setProducts(data);
        setpagination(pagination);
        setLoading(false);
      } catch (error) {
        console.log('fail call api products', error);
      }
    })();
  }, [queryParams]);

  const handlePagination = (e, newPage) => {
    console.log(newPage);
    const filter = {
      ...queryParams,
      _page: newPage,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };
  const handleChangeSort = (newSort) => {
    console.log(newSort);
    const filter = {
      ...queryParams,
      // _page: 1,
      _sort: newSort,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  return (
    <div className="productlist">
      <div className="container">
        <div className="row productlist__row">
          <div className="productlist__left">
            <div className="productlist__category">
              <h3 className="productlist__title">danh mục</h3>
            </div>
          </div>
          <div className="productlist__right">
            {loading && (
              <div className="productlist__loading">
                <Loading />
              </div>
            )}
            <div>
              <ProductSort currentSort={`${queryParams._sort}`} handleChange={handleChangeSort} />
            </div>
            <div className="row  productlist__row">
              {products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
            <div className="productlist__pagination">
              <Pagination
                onChange={handlePagination}
                // className={classes.pagination}
                count={Math.ceil(pagination._total / pagination._limit)}
                variant="outlined"
                page={pagination._page}
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
