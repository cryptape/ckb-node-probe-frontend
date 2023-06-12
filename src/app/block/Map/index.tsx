"use client";
import { Data } from "@/interface/page";
import { renderMapGraph } from "./util";
import {  useMemo, useEffect, useState, useCallback } from "react";

import quotes from './quotes.json';
import styles from './index.module.scss';
import {Typography} from "antd";
interface MapProps {
  data: Data[]
}

const { Link } = Typography

const Map: React.FC<MapProps> = ({ data }) => {
  const [text, setText] = useState<string>();
  const [avatarImg, setAvatarImg] = useState<string>()

  const memoizedRenderMapGraph = useMemo(() => {
    return renderMapGraph;
  }, []);

// 缓存生成文本和头像图片的函数
  const generateText = useCallback(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setText(quotes[index]);
  }, []);

  const generateAvatarImg = useCallback(() => {
    setAvatarImg(`./${Math.ceil(Math.random() * 4)}.png`);
  }, []);

  useEffect(() => {
    renderMapGraph(data);
    const index = Math.floor(Math.random() * quotes.length);
    setText(quotes[index]);
    setAvatarImg(`./${Math.ceil(Math.random() * 4)}.png`);
  }, [data, renderMapGraph, quotes, setText, setAvatarImg]);

  return (
    <>
      <div id="mapGraph" className={styles.mapGraph}></div>
      {
        text && (
          <p className={styles.tips}>
            <img src={avatarImg} alt="people" />
            <div className={styles.content}>
              { text }
              <span> — <Link href="https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md" target="_blank">CKB Whitepaper, 2018</Link></span>
            </div>
          </p>
        )
      }
    </>
  )
}

export default Map;
