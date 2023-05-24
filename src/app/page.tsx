"use client";
import { useEffect, useState } from 'react';
import Map from './block/Map';
import Header from './components/Header';
import Version from './block/Version';
import Country from './block/Country';
import className from 'classnames';
import OnlineNode from './block/OnlineNode';
import styles from './page.module.scss';

export default function Home() {
  const [type, setType] = useState('pudge');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const loadData = await fetch(`//api-${location.hostname || 'nodes-dev.ckbapp.dev'}/peer?network=${type}`);
      const result = await loadData.json();
      setData(result);
    }

    load();
  }, [type]);

  return <>
    <Header type={type} setType={setType} />
    <main className={className('ckb-container', styles.main)}>
      <OnlineNode nodes={data.length} />
      <Map data={data} />
      <div className={styles.group}>
        <Country data={data} />
        <Version data={data} />
      </div>
    </main>
  </>
}
