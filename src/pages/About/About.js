import React from 'react';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';
import { Page } from '../../components';
import styles from './About.css';
import IconRight from '../../assets/icons/ic_chevron_right_48px.svg';

const About = () => (
  <Page id="about" title="About" description="This is about really cool stuff.">
    <div className={classNames('container-fluid mt-4 mb-5', styles.container)}>
      <div className="row">
        <div className="col-sm-10 offset-sm-1">
          <SVG src={IconRight} />
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
  </Page>
);

export default About;
