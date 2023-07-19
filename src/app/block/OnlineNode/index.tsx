import {Popover, Typography} from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
// import CountUp from 'react-countup';
import styles from './index.module.scss';
import popoverStyles from "@/styles/popover.module.scss";
interface OnlineNodeProps {
  nodes: number;
}

const { Link } = Typography

const OnlineNode: React.FC<OnlineNodeProps> = ({ nodes }) => {
  return (
    <div className={styles.onlineNode}>
      <h1>{ nodes }</h1>
      <div>
        CKB Nodes Online
          <Popover placement="bottom" content={<>
              <div className={`${popoverStyles.markdownWrapper} ${popoverStyles.tips}`}>
                  <div className={popoverStyles.markdownHLine}></div>
                  <div className={popoverStyles.markdownContentContainer}>
                      <div className={popoverStyles.tipsHeader}>
                          <img src="./explain.png" alt="explain-icon"/>
                          Network Probing for Full Node Statistics
                      </div>
                      <div className={popoverStyles.markdownText}>
                          <div className={popoverStyles.textItem}>
                              Full Nodes are configured to support <Link href="https://github.com/nervosnetwork/ckb/blob/develop/network/src/protocols/support_protocols.rs#L18" target="_blank"> discovery, identify, relay, and sync protocols</Link> by default, allowing them to be discovered and visible to other nodes in the network.
                          </div>
                          <div className={popoverStyles.textItem}>
                              <span>Peer Discovery: </span> A bootnode with high uptime and strong connectivity discovers Full Nodes as peer nodes through message discovery protocol.
                          </div>
                          <div className={popoverStyles.textItem}>
                              <span>Counting Online Nodes: </span> When a node is observed in multiple discovery messages from different nodes, it is considered a single online node. This ensures accurate counting of active nodes in the network.
                          </div>
                      </div>
                  </div>
              </div>
              <Link href="https://blog.cryptape.com/peer-discovery-in-nervos-network" target="_blank">Learn more</Link>
          </>}>
              <QuestionCircleFilled/>
          </Popover>
      </div>
    </div>
  )
}

export default OnlineNode;
