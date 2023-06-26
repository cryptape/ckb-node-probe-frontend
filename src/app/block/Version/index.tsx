"use client";
import { Data } from '@/interface/page';
import {useEffect, useRef, useState} from 'react';
import { isMobileDevice } from '@/app/utils';
import { Popover } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import * as echarts from 'echarts';
import styles from './index.module.scss';
import popoverStyles from "@/styles/popover.module.scss";

interface VersionProps {
  data: Data[]
}

interface VersionCount {
  [key: string]: number;
}

const overPopover = {
  arrow: {
    background: '#23262F', // 修改箭头背景色
  },
  content: {
    background: '#23262F', // 修改内容背景色
  },
};

const Version: React.FC<VersionProps> = ({ data }) => {
  const [unknownVersionNodeCount, setUnknownVersionNodeCount] = useState(0)
  const [knownVersionNodeCount, setKnownVersionNodeCount] = useState(0)
  const versionCount: VersionCount = {};
  let unKnowNodes: number = 0
  data.forEach(({ version_short, version }) => {
    if (version == '') {
      unKnowNodes++
      return
    }

    if (version_short in versionCount) versionCount[version_short]++;
    else versionCount[version_short] = 1;
  });

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = 'versionGraph';
    const target = document.getElementById(container);
    const sum = Object.values(versionCount).reduce((total, value) => total + value, 0);
    if (!chartRef.current) return

    let graphData = Object.keys(versionCount).map((key, index) => ({ 
      name: key, 
      value: versionCount[key]
    }))
    .sort((pre, next) => next.value - pre.value);
    setUnknownVersionNodeCount((unKnowNodes))
    setKnownVersionNodeCount((sum))
    const myChart = echarts.init(chartRef.current);
    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeHandler);

    myChart.setOption({
      tooltip: {
        trigger: 'item',
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

    return () => {
      window.removeEventListener('resize', resizeHandler);
      myChart.dispose();
    }
  }, [data])
  
  return (
    <div className={styles.version}>
      <div className="ckb-header-bar">
        Nodes by Version
        <Popover
              overlayClassName={popoverStyles.versionPopover}
                 placement="bottom" content={<>
          <div>
            <div className={popoverStyles.unknownNodesTitle}>unknown version nodes: <span>{ unknownVersionNodeCount }</span></div>
            <div className={popoverStyles.unknownNodesTitle}>known version nodes: <span>{ knownVersionNodeCount }</span></div>
            <div className={popoverStyles.unknownNodesContent}>
              <a target="_blank" href="https://github.com/cryptape/ckb-node-probe-frontend/blob/develop/public/Why%20we%20can%20not%20detect%20some%20node%E2%80%99s%20exact%20version.md">
                Why we can not detect some node’s exact version ?
              </a>
            </div>
          </div>
        </>}>
          <QuestionCircleFilled/>
        </Popover>
      </div>
      <div ref={chartRef} id='versionGraph' className={styles.versionGraph}></div>
      <div className="ckb-footer-label"># of nodes</div>
    </div>
  )
}

export default Version;
