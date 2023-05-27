"use client";
import { Data } from '@/interface/page';
import { useEffect } from 'react';
import * as echarts from 'echarts';
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
    const target = document.getElementById(container);
    if (!target) return;

    let graphData = Object.keys(countryCount).sort((a, b) => countryCount[b] - countryCount[a]).map((key, index) => {
      return { 
        name: key, 
        value: countryCount[key],
      };
    }).slice(0, 10);

    const myChart = echarts.init(target);
    myChart.setOption({
      grid: {
        top: 10,
        bottom: 30,
        left: 80,
        right: 50
      },
      xAxis: {
        max: 'dataMax',
        axisLine: {
          show: true
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff',
        }
      },
      dataset: {
        source: graphData
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: graphData.map(item => item.name),
        axisLabel: {
          show: true,
          fontSize: 14,
          align: 'left',
          margin: 60,
          color: '#fff',
          formatter: (value: string) => '{' + value + '| } {value|' + value + '}',
          rich: {
            value: {
              fontSize: 14,
              padding: 5
            },
            ...graphData.reduce((result: any, next: { name: string }) => {
              result[next.name] = {
                width: 20,
                height: 20,
                align: 'left',
                backgroundColor: {
                  image: `/flags/1x1/${next.name.toLowerCase()}.svg`
                }
              }

              return result; 
            }, {} as {[key: string]: string})
          }
        }
      },
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            color: ({ dataIndex }: { dataIndex: number }) => dataIndex < 3 ? '#6CE37C' : '#00AEFC',
          },
          barWidth: 14,
          data: graphData,
          label: {
            color: '#FFF',
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace',
          }
        }
      ],
    });
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
