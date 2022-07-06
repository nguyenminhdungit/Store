import Pagination from '@material-ui/lab/Pagination';
import productApi from 'api/productApi';
import FilterByCategorys from 'page/Product/components/Filters/FilterByCategorys/FilterByCategorys';
import FilterByPrice from 'page/Product/components/Filters/FilterByPrice/FilterByPrice';
import ProductSort from 'page/Product/components/Filters/productSort/ProductSort';
import Loading from 'page/Product/components/Loading/Loading';
import Product from 'page/Product/components/Product/Product';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.scss';

ListProduct.propTypes = {};

const TRUTH_TABLE = {
  true: true,
  false: false,
};

function ListProduct(props) {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([...Array(12)]);
  const [pagination, setpagination] = useState({
    _page: 1,
    _limit: 12,
    _total: 1,
  });

  const onClickShowFilter = () => {
    console.log('abc');
    setShowFilter(!showFilter);
  };

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
    // console.log(newPage);
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
    // console.log(newSort);
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

  const handleChangeCategory = (newCategory) => {
    // console.log(newCategory);
    const filter = {
      ...queryParams,
      _page: 1,
      category: newCategory !== 0 ? newCategory : undefined,
      name_contains: undefined,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleChangePrice = (newAboutPrice) => {
    const { salePrice_gte, salePrice_lte } = newAboutPrice;
    const filter = {
      ...queryParams,
      _page: 1,
      salePrice_gte,
      salePrice_lte,
    };
    // console.log(queryString.stringify(filter));
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  return (
    <div className="productlist">
      <div className="container">
        <div className="row productlist__row">
          {/* left */}
          <div className={showFilter ? 'productlist__left active' : 'productlist__left'}>
            <div className="productlist__left--active">
              <span onClick={onClickShowFilter}>
                <i className="fa-solid fa-angle-right"></i>
              </span>
            </div>
            <div className="productlist__category">
              <FilterByCategorys
                onChangeCategory={handleChangeCategory}
                categoryId={+queryParams.category}
              />
            </div>
            <div className="productlist__price">
              <FilterByPrice onChangeAboutPrice={handleChangePrice} queryParams={queryParams} />
            </div>
            <div className="productlist__services"></div>
          </div>
          {/* right */}
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
              {products.length >= 1 ? (
                <>
                  {products.map((product, index) => (
                    <Product product={product} key={index} />
                  ))}
                </>
              ) : (
                <span>
                  <i className="fa-solid fa-triangle-exclamation"></i> không có sản phẩm nào phù hợp
                </span>
              )}
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
