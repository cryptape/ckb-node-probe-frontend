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
                          Network Probing for Connectable Full Nodes
                      </div>
                      <div className={popoverStyles.markdownText}>
                          <div className={popoverStyles.textItem}>
                            Our network thrives on connectivity and decentralization!
                          </div>
                          <div className={popoverStyles.textItem}>
                              <span>Probing & Connecting: </span>
                                <p> - We probe nodes for connectivity through <Link href="https://github.com/code-monad/ckb-discovery" target="_blank"> message discovery protocol</Link>.</p>
                                <p> - Nodes that successfully connect and are active earn their place on the map.</p>

                          </div>
                          <div className={popoverStyles.textItem}>
                              <span>Criteria for Counting: </span>
                                  <p> - Full Nodes supporting <Link href="https://github.com/nervosnetwork/ckb/blob/develop/network/src/protocols/support_protocols.rs#L18" target="_blank"> discovery, identify, relay, and sync protocols</Link>.</p>
                                  <p> - Full Nodes reported as reachable by at least four other nodes.</p>
                                  <p> - Well-synced and activly validating transactions and blocks.</p>
                          </div>
                          <div className={popoverStyles.textItem}>
                            Nodes meeting these criteria are visible on the map for at least <span>4 epochs</span>.
                          </div>
                      </div>
                  </div>
              </div>
              <Link href="https://docs.nervos.org/docs/basics/guides/mainnet/" target="_blank">Run CKB</Link>
          </>}>
              <QuestionCircleFilled/>
          </Popover>
      </div>
    </div>
  )
}

export default OnlineNode;
