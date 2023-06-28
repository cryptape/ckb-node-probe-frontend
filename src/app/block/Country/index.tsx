"use client";
import { Data } from '@/interface/page';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.scss';
import {isMobileDevice} from "@/app/utils";

interface CountryProps {
  data: Data[]
}

interface CountryCount {
  [key: string]: number;
}

const Country: React.FC<CountryProps> = ({ data }) => {
  const countryCount: CountryCount = {};

  data.forEach(({ country, version }) => {

    if (version == '') {
      return;
    }

    if (country in countryCount) {
      countryCount[country]++;
    } else {
      countryCount[country] = 1;
    }
  });

  const total: number = Object.values(countryCount).reduce((sum, value) => sum + value, 0);

  const filteredData: CountryCount = Object.entries(countryCount)
      .filter(([key, value]) => (value / total) >= 0.01)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as CountryCount);

  const othersValue: number = Object.values(countryCount)
      .filter(value => (value / total) < 0.01)
      .reduce((sum, value) => sum + value, 0);

  if (othersValue > 0) {
    filteredData['others'] = othersValue;
  }
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    let graphData = Object.keys(filteredData).sort((a, b) => filteredData[b] - filteredData[a]).map((key, index) => {
      return {
        name: key,
        value: filteredData[key],
      };
    });

    const myChart = echarts.init(chartRef.current);
    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeHandler);
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Country/Region',
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
    return () => {
      window.removeEventListener('resize', resizeHandler);
      myChart.dispose();
    }

  }, [data]);

  return (
    <div className={styles.country}>
      <div className="ckb-header-bar">Nodes by Country/Region</div>
      <div ref={chartRef} id='countryGraph' className={styles.countryGraph}></div>
      <div className="ckb-footer-label"># of nodes</div>
    </div>
  )
}

export default Country;
