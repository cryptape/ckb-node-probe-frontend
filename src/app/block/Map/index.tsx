"use client";
import { Data } from "@/interface/page";
import { useEffect } from "react";
import { renderMapGraph } from "./util";
import quotes from './quotes.json';
import styles from './index.module.scss';
interface MapProps {
  data: Data[]
}

const Map: React.FC<MapProps> = ({ data }) => {
  const result = quotes.filter(item => item.text.indexOf('Bitcoin') === -1);
  const tips = result[Math.floor(Math.random() * result.length)];
  useEffect(() => {
    renderMapGraph(data);
  }, [data]);

  return (
    <>
      <div id="mapGraph" className={styles.mapGraph}></div>
      <p className={styles.tips}>
        <img src="/people.svg" alt="people" />
        <div className={styles.content}>
          { tips.text }
          <span> —— &quot;Satoshi Nakamoto&quot;, { tips.medium }, { tips.date }</span>
        </div>
      </p>
    </>
  )
}

export default Map;
