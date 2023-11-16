import React, {useEffect, useState} from 'react'
import OnlineNode from "@/app/block/OnlineNode";
import Map from "@/app/block/Map";
import { Data } from '@/interface/page';
import styles from "@/app/page.module.scss";
import Country from "@/app/block/Country";
import Version from "@/app/block/Version";
import { useStateContext } from '../stateContext';

const Index: React.FC = () => {
    const { type, setType } = useStateContext();
    const [data, setData] = useState([] as Data[]);

    useEffect(() => {
        async function load() {
            const url = location.hostname === 'localhost' ? 'nodes-dev.ckbapp.dev' : 'nodes.ckb.dev';
            const loadData = await fetch(`//api-${url}/peer?staging=true&unknown_offline_timeout=10080&network=${type}`);
            const result: Data[] = await loadData.json();
            setData(result)
        }
        load();
    }, [type]);

    return (
        <>
            <OnlineNode nodes={data.length} />
            <Map data={data} />
            <div className={styles.group}>
                <div className={styles.chartWrapper}>
                    <Country data={data} />
                </div>
                <div className={styles.chartWrapper}>
                    <Version data={data} />
                </div>
            </div>
        </>
    )
}

export default Index
