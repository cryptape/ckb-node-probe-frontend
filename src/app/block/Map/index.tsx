"use client";
import { Data } from "@/interface/page";
import { renderMapGraph } from "./util";
import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import Quote from "@/app/components/Quote/Quote";
import Link from 'next/link'
import { useRouter } from 'next/router';
import {Skeleton} from "antd";
import Image from "next/image";
interface MapProps {
  data: Data[]
}

declare global {
    interface Window {
        _map: any;
    }
}

const Map: React.FC<MapProps> = ({ data }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [inputValue, setInputValue] = useState<string>('');
    const [isNodeRunning, setIsNodeRunning] = useState<boolean>(false);
    const [nodeId, setNodeId] = useState<string>('');
    const [errorType, setErrorType] = useState<number>(-1)
    const [checkStatus, setCheckStatus] = useState<boolean>(false)
    const [pendingStatus, setPendingStatus] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const copyNodeIdToClipboard = () => {
        navigator.clipboard.writeText(nodeId)
            .catch(err => {
                // 处理复制失败的情况
                console.error('Failed to copy NodeId:', err);
            });
    };

    const handleButtonClick = () => {
        setPendingStatus(true)
        if(checkStatus) {
            getInMap()
        } else {
            fetch("http://127.0.0.1:8114", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: '{"id":0,"jsonrpc":"2.0","method":"local_node_info","params":[]}'
            })
                .then(response => response.json())
                .then(response => {
                    if (response && response.result && response.result.node_id) {
                        setNodeId(response.result.node_id);
                        setIsNodeRunning(true);
                        setCheckStatus(true)
                        setErrorType(2)
                        setInputValue(response.result.node_id)
                        setPendingStatus(false)
                    } else {
                        setErrorType(3)
                    }
                })
                .catch(error => {
                    setPendingStatus(false)
                    console.error('Error fetching node info:', error);
                    setErrorType(3)
                });
        }
    };

    const getInMap = async() => {
        const hostname = window.location.hostname;
        const url = hostname === 'localhost' ? 'nodes-dev.ckbapp.dev' : hostname;
        const response = await fetch(`//api-${url}/peer_status?peer_id=${inputValue}`);
        const nodeInMap = await response.json()
        setPendingStatus(false)
        if(nodeInMap && nodeInMap['in_map']) {
            setErrorType(0)
        } else {
            setErrorType(1)
        }
    }

    const renderPopup = () => {
        switch (errorType) {
            case 0:
                return (
                    <div className={styles.popup}>
                        <Image width={20} height={26} src={'/lightOpen.svg'} alt={'light-open'} />
                        <span>Your node is connected and visible on the network！</span>
                        <Image width={18} height={18} src={'/close.svg'} alt={'light-open'} onClick={() => setErrorType(-1)}/>
                    </div>
                );
            case 1:
                return (
                    <div className={styles.popup}>
                        <Image width={20} height={26} src={'/lightClose.svg'} alt={'light-close'} />
                        <span>Your node isn`&apos;t currently visible,<Link href="/getConnectedInstruction">let`&apos;s connect!</Link></span>
                        <Image width={18} height={18} src={'/close.svg'} alt={'light-open'} onClick={() => setErrorType(-1)}/>
                    </div>
                );
            case 2:
                return (
                    <div className={styles.popup}>
                        <div className={styles.nodeIdInfo}>
                            <span>Node ID: <span>{nodeId}</span></span>
                            <Image width={20} height={26} src={'/copy.svg'} alt={'light-open'} onClick={() => copyNodeIdToClipboard()} />
                        </div>
                        <Image width={18} height={18} src={'/close.svg'} alt={'light-open'} onClick={() => setErrorType(-1)}/>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.popup}>
                        <div className={styles.noNodeIdErrorInfo}>
                            <div>
                                Make sure your node is running and try again.
                            </div>
                            <div className={styles.Mt10}>
                                If the issue persists, <Link href="/findNode"> Check out other ways to find your Node ID.</Link>
                            </div>
                        </div>
                        <Image width={18} height={18} src={'/close.svg'} alt={'light-open'} onClick={() => setErrorType(-1)}/>
                    </div>
                );
            default:
                return null;
        }
    };

    useEffect(() => {

    }, []);

    useEffect(() => {
        renderMapGraph(data);
        setLoading(false);
        return () => {
            if (window._map) {
                window._map.remove();
                window._map = null;
            }
        }
    }, [data, router, router.asPath]);


  return (
    <>
      <div id="mapGraph" className={styles.mapGraph}>
          {renderPopup()}
          <div className={styles.searchNodeContainer}>
              <div
                  className={styles.inputSearchNodeID}
              >
                  <div>
                    <Image src={'/search.svg'} alt={'search'} width={16} height={16} />
                  </div>
                  <input
                      placeholder={'enter Node ID to check visibility'}
                      value={inputValue}
                      onChange={handleInputChange}/>
              </div>
              <button
                  onClick={handleButtonClick}
                  className={styles.searchButton}
                  style={{background: pendingStatus ? 'grey' : 'linear-gradient(270deg, #0FF082 9.68%, #00AEFC 97.16%), #FFF'}}
              >
                  {checkStatus ? 'Check': 'Get'} Node ID
              </button>
          </div>
      </div>
      <Quote />
    </>
  )
}

export default Map;
