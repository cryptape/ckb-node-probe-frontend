"use client";
import { Data } from "@/interface/page";
import { renderMapGraph } from "./util";
import { useEffect } from "react";
import styles from './index.module.scss';
import Quote from "@/app/components/Quote/Quote";
interface MapProps {
  data: Data[]
}
const Map: React.FC<MapProps> = ({ data }) => {

  useEffect(() => {
    renderMapGraph(data);
  }, [data]);

  return (
    <>
      <div id="mapGraph" className={styles.mapGraph}></div>
      <Quote />
    </>
  )
}

export default Map;
