import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import categoryApi from 'api/categoryApi';
import './styles.scss';

FilterByCategorys.propTypes = {
  onChangeCategory: PropTypes.func,
  categoryId: PropTypes.number,
};

function FilterByCategorys({ onChangeCategory = null, categoryId = 0 }) {
  const [categorys, setCategorys] = useState([...Array(6)]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(categoryId);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const category = await categoryApi.getAll();
        // console.log(category);
        setCategorys(category.map((category) => ({ id: category.id, name: category.name })));
        setLoading(false);
      } catch (error) {
        console.log('fail category', error);
      }
    })();
  }, []);
  // console.log(categorys);

  const handleClickCategory = (categoryId) => {
    // console.log(category);
    if (!onChangeCategory) return;
    onChangeCategory(categoryId.id || 0);

    setActive(categoryId.id || 0);
  };
  return (
    <div className="categorys">
      <h3 className="categorys__title">Danh mục</h3>
      <ul className="categorys__list">
        {!loading ? (
          <li
            className={active === 0 ? 'active' : ''}
            onClick={() => {
              handleClickCategory(0);
            }}
          >
            tất cả
          </li>
        ) : (
          <Skeleton variant="text" />
        )}
        {categorys.map((category, index) =>
          category?.name ? (
            <li
              className={active === category.id ? 'active' : ''}
              key={index}
              onClick={() => {
                handleClickCategory(category);
              }}
            >
              {category.name}
            </li>
          ) : (
            <li key={index}>
              <Skeleton variant="text" />
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default FilterByCategorys;
