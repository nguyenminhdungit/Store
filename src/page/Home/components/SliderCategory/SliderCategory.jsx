import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SliderFeature from '../slider/slider';
import queryString from 'query-string';

import './styles.scss';
import productApi from 'api/productApi';
import { useHistory } from 'react-router-dom';

SliderCategory.propTypes = {
  categoryId: PropTypes.number,
  title: PropTypes.string,
};

function SliderCategory({ categoryId = 2, title = '' }) {
  const [productPhones, setProductPhone] = useState([...Array(9)]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const params = {
          _page: 1,
          _limit: 9,
          _sort: 'salePrice:ASC',
          category: categoryId,
          // isPromotion: true,
        };
        const { data } = await productApi.getAll(params);
        // console.log(data);
        setProductPhone(data);
        setLoading(false);
      } catch (error) {
        console.log('fail call api phone', error);
      }
    })();
  }, []);

  const handleClick = () => {
    console.log(history.location.pathname);
    const filter = {
      _page: 1,
      _limit: 12,
      _sort: 'salePrice:ASC',
      category: categoryId,
      // isPromotion: true,
    };
    history.push({
      pathname: '/product',
      search: queryString.stringify(filter),
    });
  };
  return (
    <div className="category">
      <div className="row justify-content-between align-item-center category__title">
        <h2>{title}</h2>
        <p onClick={handleClick}>...xem tất cả</p>
      </div>
      <div className="category__phone">
        <SliderFeature data={productPhones} count={5} />
      </div>
    </div>
  );
}

export default SliderCategory;
