import React from 'react';
import styles from './UpgradeBanner.module.scss';

const UpgradeBanner: React.FC = () => {
  return (
    <div className={styles.upgradeBanner}>
      <div className={styles.bannerContent}>
        <p className={styles.bannerText}>
          For those who haven&apos;t upgraded to CKB v0.200.0+, please do so now.
        </p>
        <p className={styles.bannerText}>
          Outdated nodes will fall out of consensus after the Meepo hardfork. <a href="https://github.com/nervosnetwork/ckb/releases" target="_blank" rel="noopener noreferrer">Get the latest version →</a>
        </p>
      </div>
    </div>
  );
};

export default UpgradeBanner;