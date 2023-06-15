"use client";
import { Data } from '@/interface/page';
import { useEffect, useRef } from 'react';
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

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    let graphData = Object.keys(countryCount).sort((a, b) => countryCount[b] - countryCount[a]).map((key, index) => {
      return { 
        name: key, 
        value: countryCount[key],
      };
    }).slice(0, 10);

    const myChart = echarts.init(chartRef.current);
    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeHandler);
    // myChart.setOption({
    //   grid: {
    //     top: 10,
    //     bottom: 30,
    //     left: 80,
    //     right: 50
    //   },
    //   xAxis: {
    //     max: 'dataMax',
    //     axisLine: {
    //       show: true
    //     },
    //     splitLine: {
    //       show: false
    //     },
    //     axisLabel: {
    //       color: '#fff',
    //     }
    //   },
    //   dataset: {
    //     source: graphData
    //   },
    //   yAxis: {
    //     type: 'category',
    //     inverse: true,
    //     data: graphData.map(item => item.name),
    //     axisLabel: {
    //       show: true,
    //       fontSize: 14,
    //       align: 'left',
    //       margin: 60,
    //       color: '#fff',
    //       formatter: (value: string) => '{' + value + '| } {value|' + value + '}',
    //       rich: {
    //         value: {
    //           fontSize: 14,
    //           padding: 5
    //         },
    //         ...graphData.reduce((result: any, next: { name: string }) => {
    //           result[next.name] = {
    //             width: 20,
    //             height: 20,
    //             align: 'left',
    //             backgroundColor: {
    //               image: `/flags/1x1/${next.name.toLowerCase()}.svg`
    //             }
    //           }
    //
    //           return result;
    //         }, {} as {[key: string]: string})
    //       }
    //     }
    //   },
    //   series: [
    //     {
    //       realtimeSort: true,
    //       seriesLayoutBy: 'column',
    //       type: 'bar',
    //       itemStyle: {
    //         color: ({ dataIndex }: { dataIndex: number }) => dataIndex < 3 ? '#6CE37C' : '#00AEFC',
    //       },
    //       barWidth: 14,
    //       data: graphData,
    //       label: {
    //         color: '#FFF',
    //         show: true,
    //         precision: 1,
    //         position: 'right',
    //         valueAnimation: true,
    //         fontFamily: 'monospace',
    //       }
    //     }
    //   ],
    // });
    myChart.setOption({
      grid: {
        top: 10,
        bottom: 30,
        left: 80,
        right: 50
      },
      series: [
        {
          type: 'pie', // 修改为饼图类型
          radius: '50%', // 设置饼图半径大小
          center: ['50%', '50%'], // 设置饼图中心位置
          itemStyle: {},
          label: {
            color: '#FFF',
            show: true,
            precision: 1,
            formatter: '{b}:\n{d}%', // 设置标签显示的内容
            fontFamily: 'monospace',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          data: graphData,
        },
      ],
    });
    return () => {
      window.removeEventListener('resize', resizeHandler);
      myChart.dispose();
    }

  }, [data]);

  return (
    <div className={styles.country}>
      <div className="ckb-header-bar">Count by Country/Region</div>
      <div ref={chartRef} id='countryGraph' className={styles.countryGraph}></div>
      <div className="ckb-footer-label"># of nodes</div>
    </div>
  )
}

export default Country;
