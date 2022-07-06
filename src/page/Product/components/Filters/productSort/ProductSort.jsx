import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import './styles.scss';

ProductSort.propTypes = {
  currentSort: PropTypes.string,
  handleChange: PropTypes.func,
};

function ProductSort({ currentSort = 'salePrice:ASC', handleChange = null }) {
  //   console.log(currentSort);
  const handleChangeSort = (e, newFilter) => {
    // console.log(newFilter);
    if (!handleChange) return;
    handleChange(newFilter);
  };
  return (
    <div className="prouductSort">
      <Tabs
        value={currentSort}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeSort}
        aria-label="disabled tabs example"
      >
        <Tab label="Giá thấp tới cao" value="salePrice:ASC" />
        <Tab label="Giá cao tới thấp" value="salePrice:DESC" />
        <Tab label="Giảm giá %" value="promotionPercent:DESC" />
        {/* <Tab label="hàng mới" value="updated_at:ASC" /> */}
      </Tabs>
    </div>
  );
}

export default ProductSort;
