"use client";
import { Data } from "@/interface/page";
import { useEffect, useState } from "react";
import { renderMapGraph } from "./util";
import quotes from './quotes.json';
import styles from './index.module.scss';
interface MapProps {
  data: Data[]
}

interface Quote {
  text: string;
  medium: string;
  date: string;
}


const Map: React.FC<MapProps> = ({ data }) => {
  const [tips, setTips] = useState<Quote>();
  const result = quotes.filter(item => item.text.indexOf('Bitcoin') === -1);

  useEffect(() => {
    renderMapGraph(data);
    const index = Math.floor(Math.random() * result.length);
    setTips(result[index]);
  }, [data]);

  return (
    <>
      <div id="mapGraph" className={styles.mapGraph}></div>
      {
        tips && (
          <p className={styles.tips}>
            <img src="/people.svg" alt="people" />
            <div className={styles.content}>
              { tips.text }
              <span> —— Satoshi Nakamoto, { tips.medium }, { tips.date }</span>
            </div>
          </p>
        )
      }
    </>
  )
}

export default Map;
