import React from 'react';
import styles from './About.scss';
import IconRight from '../assets/icons/ic_chevron_right_48px.svg';

const About = () => (
  <div className="about__container container-fluid mt-4 mb-5">
    <div className="row">
      <div className="col-sm-10 offset-sm-1">
        <IconRight />
        <h3
          className="mb-3"
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
          }}
        >About
        </h3>

        <p>I am Thomas Mills, a web developer based in Amsterdam, the Netherlands.</p>
        <p>
          <a
            href="http://imthomas.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info"
            style={{ marginRight: 10 }}
          >
            Visit my website
          </a>
          <a
            href="http://imthomas.com/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info"
          >
            Visit my portfolio
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default About;
