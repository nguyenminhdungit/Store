import React from 'react';
import PropTypes from 'prop-types';
import Cart from './components/Cart';

FeatureCart.propTypes = {};

function FeatureCart(props) {
  return (
    <div className="container">
      <Cart />
    </div>
  );
}

export default FeatureCart;
