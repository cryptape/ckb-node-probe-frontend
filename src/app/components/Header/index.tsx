"use client";
import { useState } from 'react';
import {Drawer, Dropdown, Popover, Space, Typography} from 'antd';
import { CloseOutlined, DownOutlined, MenuOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Icon from './icon.png';
import styles from './index.module.scss';
import popoverStyles from '../../../styles/popover.module.scss'

interface HeaderProps {
  type: string;
  setType: (type: string) => void;
}

const { Link } = Typography

const Header: React.FC<HeaderProps> = ({ type, setType }) => {
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: 'Mirana (CKB Mainnet)',
      key: 'mirana',
      onClick: () => setType('mirana')
    },
    {
      label: 'Pudge (CKB Testnet)',
      key: 'pudge',
      onClick: () => setType('pudge')
    }
  ]

  return (
    <header className={styles.header}>
      <div className={`ckb-container ${styles.container}`}>
        <div className={styles.logo}>
          <Image src={Icon} alt='LOGO' />
          <span className={styles.title}>CKB Full Nodes</span>
          <Popover placement="bottomLeft" content={<>
            <div className={popoverStyles.strongTitle}>A Full Node stores and validates the entire blockchain.</div>
            <br />
            <div className={`${popoverStyles.markdownWrapper} ${popoverStyles.tips}`}>
              <div className={popoverStyles.markdownHLine}></div>
              <div className={popoverStyles.markdownContentContainer}>
                <div className={popoverStyles.tipsHeader}>
                  <Image alt="explain-icon" src="./explain.png"/>
                  Types of CKB Nodes
                </div>
                <div className={popoverStyles.markdownText}>
                  <div className={popoverStyles.textItem}>
                    <span>Full nodes</span> download and verify every block and transaction, checking them against CKB&apos;s consensus rules while hosting an entire copy of the blockchain.
                  </div>
                  <div className={popoverStyles.textItem}>
                    <span>Light nodes</span> download only the blockchain headers, utilizing fewer resources and relying on other nodes for transaction data when needed.
                  </div>
                  <div className={popoverStyles.textItem}>
                    <span>Mining nodes</span> create and propose new blocks to the network, actively contributing to the network&apos;s security and consensus.
                  </div>
                </div>
              </div>
            </div>
            <Link href="https://docs.nervos.org/docs/basics/glossary/#full-node" target="_blank">[Learn more](link to glossary)</Link>
          </>}>
            <QuestionCircleOutlined />
          </Popover>
        </div>
        <div className={styles.right}>
          <div className={styles.menu}>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>{items.filter(item => item.key === type)[0].label}<DownOutlined /></Space>
              </a>
            </Dropdown>
          </div>
          <div className={styles.mobile}>
            <MenuOutlined onClick={() => setOpen(true)} />
          </div>
          <Drawer
            title={null}
            placement={'left'}
            closable={false}
            width={'60vw'}
            rootStyle={{ zIndex: 10001 }}
            onClose={() => setOpen(false)}
            open={open}
            className={styles.mobileDrawer}
          >
            <CloseOutlined className={styles.close} onClick={() => setOpen(false)} />
            <ul>
              { items.map((item) => <li key={item.key} onClick={item.onClick}>{item.label}</li>) }
            </ul>
          </Drawer>
        </div>
      </div>
    </header>
  )
}

export default Header;
