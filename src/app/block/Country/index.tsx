"use client";
import { Data } from '@/interface/page';
import { Chart } from '@antv/g2';
import { useEffect } from 'react';
import { isMobileDevice } from '@/app/utils/index';
import { Renderer as GRenderer } from '@antv/g-svg';
import styles from './index.module.scss';

interface CountryProps {
  data: Data[]
}

interface CountryCount {
  [key: string]: number;
}

const Country: React.FC<CountryProps> = ({ data }) => {
  const countryCount: CountryCount = {};

  data.forEach(({ country }) => {
    if (country in countryCount) {
      countryCount[country]++;
    } else {
      countryCount[country] = 1;
    }
  });

  useEffect(() => {
    const container = 'countryGraph';
    if (!document.getElementById(container)) return;

    let graphData = Object.keys(countryCount).sort((a, b) => countryCount[b] - countryCount[a]).map((key, index) => {
      return { 
        version: key.split('(')[0], 
        value: countryCount[key],
      };
    });

    const chart = new Chart({
      container,
      theme: 'classic',
      autoFit: true,
      paddingLeft: 80,
      renderer: new GRenderer()
    });

    chart.coordinate({ transform: [{ type: 'transpose' }] });
    graphData = graphData.slice(0, 10);

    chart
      .interval()
      .data(graphData)
      .encode('x', 'version')
      .encode('y', 'value')
      .encode('color', 'value')
      .style('fill', (target: { color: string }, index: number) => index < 3 ? '#6CE37C' : '#00AEFC')
      .label({
        text: 'value',
        style: {
          fill: '#fff',
          transform: 'translate(-5, 0)',
        }
      })
      .encode('size', isMobileDevice() ? 14 : 24)
      .axis('x', {
        title: false,
        labelFormatter: (datum: string) => {
          const { document } = chart.getContext().canvas!;

          const group = document.createElement('g', {});
          const icon = document.createElement('image', {
            style: {
              src: `/flags/1x1/${datum.toLowerCase()}.svg`,
              x: -25,
              y: 0,
              width: 20,
              height: 20,
              anchor: '0.5 0.5',
            },
          });

          const label = document.createElement('text', {
            style: {
              x: 0,
              y: -15,
              text: datum,
              fill: '#fff', 
              fontSize: 12,
              textAlign: 'center',
              transform: `translate(0, 25)`,
            },
          });

          group.appendChild(icon);
          group.appendChild(label);
          
          return group;
        },
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
        title: false,
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
  }, [data]);

  return (
    <div className={styles.country}>
      <div className="ckb-header-bar">Count by country</div>
      <div id='countryGraph' className={styles.countryGraph}></div>
      <div className="ckb-footer-label"># of nodes</div>
    </div>
  )
}

export default Country;
