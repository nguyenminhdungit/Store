import React from 'react';
import PropTypes from 'prop-types';
import Cart from './components/Cart';
import { useEffect } from 'react';

FeatureCart.propTypes = {};

function FeatureCart(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <Cart />
    </div>
  );
}

export default FeatureCart;
