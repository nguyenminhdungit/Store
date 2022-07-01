import React from 'react';
import PropTypes from 'prop-types';
import SliderFeature from 'page/Home/components/slider/slider';
import { SLIDER_CONTANT } from 'constants';

import './styles.scss';

Banner.propTypes = {};

function Banner(props) {
  return (
    <div className="banner">
      <div className="banner__thumbnail">
        <img
          className="banner__img"
          src="https://i.pinimg.com/originals/54/46/9a/54469a344f7b63634a38a7d4a5966534.png"
          alt=""
        />
      </div>
      <div className="container banner__slider">
        <SliderFeature slider={SLIDER_CONTANT} count={3} />
      </div>
    </div>
  );
}

export default Banner;
