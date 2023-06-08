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
  const [avatarImg, setAvatarImg] = useState<string>()

  useEffect(() => {
    renderMapGraph(data);
    const index = Math.floor(Math.random() * quotes.length);
    setText(quotes[index]);
    setAvatarImg(`./${Math.ceil(Math.random() * 4)}.png`)
  }, [data]);

  return (
    <>
      <div id="mapGraph" className={styles.mapGraph}></div>
      {
        text && (
          <p className={styles.tips}>
            <img src={avatarImg} alt="people" />
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
