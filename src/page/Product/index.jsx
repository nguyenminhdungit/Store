import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListProduct from './page/ListProduct';
import DetailProduct from './page/DetailProduct';

ProductPage.propTypes = {};

function ProductPage(props) {
  const { url } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${url}`} component={ListProduct} exact />
        <Route path={`${url}/:productId`} component={DetailProduct} exact />
      </Switch>
    </div>
  );
}

export default ProductPage;
