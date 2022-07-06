import PropTypes from 'prop-types';
import { useState } from 'react';
import './styles.scss';
FilterByPrice.propTypes = {
  onChangeAboutPrice: PropTypes.func,
  queryParams: PropTypes.object,
};

function FilterByPrice({ onChangeAboutPrice = null, queryParams = {} }) {
  const [values, setValues] = useState({
    salePrice_gte: queryParams?.salePrice_gte || '',
    salePrice_lte: queryParams?.salePrice_lte || '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValue) => ({ ...prevValue, [name]: +value < 0 ? 0 : +value }));
  };
  const handleClickBtn = () => {
    if (!onChangeAboutPrice) return;
    if (values.salePrice_gte > values.salePrice_lte) return;
    onChangeAboutPrice(values);
  };
  return (
    <div className="price">
      <h3 className="price__title">Khoảng giá</h3>
      <div className="price__input">
        <input
          type="Number"
          name="salePrice_gte"
          placeholder="giá từ"
          value={values.salePrice_gte}
          onChange={handleOnChange}
        />
        <span>-</span>
        <input
          type="Number"
          name="salePrice_lte"
          placeholder="đến"
          value={values.salePrice_lte}
          onChange={handleOnChange}
        />
      </div>
      <button className="price__btn" onClick={handleClickBtn}>
        áp dụng
      </button>
    </div>
  );
}

export default FilterByPrice;
