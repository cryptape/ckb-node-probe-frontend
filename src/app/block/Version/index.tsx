"use client";
import { Data } from '@/interface/page';
import { useEffect } from 'react';
import { isMobileDevice } from '@/app/utils';

import * as echarts from 'echarts';
import styles from './index.module.scss';

interface VersionProps {
  data: Data[]
}

interface VersionCount {
  [key: string]: number;
}

const Version: React.FC<VersionProps> = ({ data }) => {
  const versionCount: VersionCount = {};

  data.forEach(({ version_short }) => {
    if (version_short.toLocaleLowerCase() === 'unknown') return;

    if (version_short in versionCount) versionCount[version_short]++;
    else versionCount[version_short] = 1;
  });

  useEffect(() => {
    const container = 'versionGraph';
    const target = document.getElementById(container);
    if (!target) return;

    let graphData = Object.keys(versionCount).map((key, index) => ({ 
      name: key, 
      value: versionCount[key]
    }))
    .sort((pre, next) => next.value - pre.value);

    const myChart = echarts.init(target);
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Version',
          type: 'pie',
          radius: isMobileDevice() ? '50%' : '70%',
          data: graphData,
          label: {
            color: '#FFF'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }, [data])
  
  return (
    <div className={styles.version}>
      <div className="ckb-header-bar">Count by version</div>
      <div id='versionGraph' className={styles.versionGraph}></div>
      <div className="ckb-footer-label"># of nodes</div>
    </div>
  )
}

export default Version;
