import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Footer.propTypes = {};

function Footer(props) {
  return (
    <section className="footer  " id="footer">
      <div className="container">
        <div className="row  justify-content-between">
          <ul className="footer__item">
            <li>
              <h3>our location</h3>
            </li>
            <li>
              <p>
                10 Street, linh Trung,
                <br />
                thu duc city
              </p>
            </li>
          </ul>
          <ul className="footer__item">
            <li>
              <h3>open housr</h3>
            </li>
            <li>
              <p>
                Monday to sunday
                <br />
                9:00 AM - 10:00 PM
              </p>
            </li>
          </ul>
          <ul className="footer__item">
            <li>
              {' '}
              <h3>contact us</h3>
            </li>
            <li>
              <p>
                +84 339 282 348, <br /> info@gmail.com
              </p>
            </li>
            <li>
              <ul className="row justify-content-between footer__social-link">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter-square" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube-square" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="footer__copyright">
          <div className="copyright">© 2021 - Designed by the WebShala</div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
