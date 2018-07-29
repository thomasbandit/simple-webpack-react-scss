import React from 'react';
import styles from './Preloader.css';

// thx @ http://tobiasahlin.com/spinkit/
const Preloader = () => (
  <div className={styles.preloader}>
    <div className={styles.preloaderCube} />
    <div className={styles.preloaderCube} />
    <div className={styles.preloaderCube} />
    <div className={styles.preloaderCube} />
  </div>
);

export default Preloader;
