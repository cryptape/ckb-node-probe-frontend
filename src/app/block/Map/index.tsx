"use client";
import { Data } from "@/interface/page";
import { renderMapGraph } from "./util";
import { useEffect, useState } from "react";

import quotes from './quotes.json';
import styles from './index.module.scss';
interface MapProps {
  data: Data[]
}

const Map: React.FC<MapProps> = ({ data }) => {
  const [text, setText] = useState<string>();

  useEffect(() => {
    renderMapGraph(data);
    const index = Math.floor(Math.random() * quotes.length);
    setText(quotes[index]);
  }, [data]);

  return (
    <>
      <div id="mapGraph" className={styles.mapGraph}></div>
      {
        text && (
          <p className={styles.tips}>
            <img src="/people.svg" alt="people" />
            <div className={styles.content}>
              { text }
              <span> — CKB Whitepaper, 2018</span>
            </div>
          </p>
        )
      }
    </>
  )
}

export default Map;
