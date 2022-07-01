import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Skeleton from '@material-ui/lab/Skeleton';

SkeletonProduct.propTypes = {
  count: PropTypes.number,
};

function SkeletonProduct({ count = 1 }) {
  return (
    <>
      {[...Array(count)].map((product, index) => (
        <div key={index}>
          <Skeleton variant="rect" height={162} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      ))}
    </>
  );
}

export default SkeletonProduct;
