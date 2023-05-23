"use client";
import { Data } from '@/interface/page';
import { Chart } from '@antv/g2';
import { useEffect } from 'react';
import styles from './index.module.scss';

interface VersionProps {
  data: Data[]
}

interface VersionCount {
  [key: string]: number;
}

const Version: React.FC<VersionProps> = ({ data }) => {
  const versionCount: VersionCount = {};

  data.forEach(({ version }) => {
    if (version in versionCount) {
      versionCount[version]++;
    } else {
      versionCount[version] = 1;
    }
  });

  useEffect(() => {
    const container = 'versionGraph';
    if (!document.getElementById(container)) return;

    let graphData = Object.keys(versionCount).map((key, index) => ({ 
      version: key.split('(')[0], 
      value: versionCount[key],
      color: '#00AEFC' // #6CE37C
    }))
    .sort((pre, next) => next.value - pre.value);

    const chart = new Chart({
      container,
      theme: 'classic',
      autoFit: true,
      paddingLeft: 100,
    });

    chart.coordinate({ transform: [{ type: 'transpose' }] });
    graphData = graphData.slice(0, 10);

    chart
      .interval()
      .data(graphData)
      .encode('x', 'version')
      .encode('y', 'value')
      .encode('color', 'color')
      .label({
        text: 'value',
        style: {
          fill: '#fff',
        }
      })
      .axis('x', {
        style: {
          titleStroke: '#FFF',
          titleFill: '#FFF',  
          lineStroke: '#FFF',
          lineFill: '#FFF', 
          tickStroke: '#FFF',
          tickFill: '#FFF',
          labelStroke: '#FFF',
          labelFill: '#FFF',
          gridStroke: '#FFF',
          gridFill: '#FFF', 
          gridAreaFill: '#FFF',
        }
      })
      .axis('y', {
        style: {
          titleStroke: '#FFF',
          titleFill: '#FFF',  
          lineStroke: '#FFF',
          lineFill: '#FFF', 
          tickStroke: '#FFF',
          tickFill: '#FFF',
          labelStroke: '#FFF',
          labelFill: '#FFF',
          gridStroke: '#FFF',
        }
      })
      .legend(false);

    chart.render();
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
