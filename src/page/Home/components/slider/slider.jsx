import Product from 'page/Product/components/Product/Product';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './styles.scss';
SliderFeature.propTypes = {
  data: PropTypes.array,
  slider: PropTypes.array,
  count: PropTypes.number,
};

function SliderFeature({ data = [...Array(9)], count = 1, slider = [] }) {
  // console.log(data);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: count,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          arrows: false,

          centerPadding: '40px',
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {slider.length !== 0 ? (
        <Slider {...settings}>
          {slider.map((item) => (
            <div key={item.id}>
              <div className="slider">
                <img className="slider__img" src={item.download_url} alt="" width="100%" />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...settings}>
          {data.map((item, index) => (
            <Product product={item} key={index} />
          ))}
        </Slider>
      )}
    </>
  );
}

export default SliderFeature;
