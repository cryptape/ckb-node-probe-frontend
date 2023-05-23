"use client";
import { useEffect } from "react";
import { renderMapGraph } from "./util";
import styles from './index.module.scss';
import { Data } from "@/interface/page";

interface MapProps {
  data: Data[]
}

const Map: React.FC<MapProps> = ({ data }) => {
  useEffect(() => {
    renderMapGraph(data);
  }, [data]);

  return (
    <div id="mapGraph" className={styles.mapGraph}></div>
  )
}

export default Map;
