import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SliderFeature from './components/slider/slider';
import './styles.scss';
import { SLIDER_CONTANT } from 'constants';
import productApi from 'api/productApi';
import SkeletonProduct from 'page/Product/components/skeleton/Skeleton';
import Banner from './components/Banner/Banner';
import SliderCategory from './components/SliderCategory/SliderCategory';

Home.propTypes = {};

function Home(props) {
  // const [productPhones, setProductPhone] = useState([...Array(9)]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const params = {
  //         _page: 1,
  //         _limit: 9,
  //         _sort: 'salePrice:ASC',
  //         category: 1,
  //         // isPromotion: true,
  //       };
  //       const { data } = await productApi.getAll(params);
  //       console.log(data);
  //       setProductPhone(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log('fail call api phone', error);
  //     }
  //   })();
  // }, []);

  return (
    <section className="home">
      <Banner />
      <div className="container">
        <SliderCategory categoryId={6} title=" điện thoại giảm giá sốc" />
        <SliderCategory categoryId={4} title=" laptop giảm siêu sale" />
        <SliderCategory categoryId={1} title=" thơi trang giảm giá sốc" />
      </div>
    </section>
  );
}

export default Home;
